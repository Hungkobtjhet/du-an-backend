import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../models/db.js';
import { MailService } from '../services/mail.service.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export class WebhookController {
    static async handleStripe(req: Request, res: Response) {
        const sig = req.headers['stripe-signature'] as string;
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent((req as any).rawBody || req.body, sig, endpointSecret || '');
        } catch (err: any) {
            console.error(`Webhook Error: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            try {
                const order = await prisma.orders.findFirst({
                    where: { session_id: session.id },
                    include: { customers: true }
                });

                if (order && order.status_online_pay === 'unpaid') {
                    await prisma.orders.update({
                        where: { id: order.id },
                        data: { status_online_pay: 'paid' }
                    });

                    // Send Email
                    if (order.customers?.email) {
                        await MailService.sendOrderEmail(order.customers.email, {
                            customerName: order.customers.name,
                            orderNo: order.order_no,
                            totalPrice: order.total_price.toString(),
                            address: order.customers.address
                        });
                    }
                }
            } catch (error) {
                console.error('Webhook Processing Error:', error);
            }
        }

        res.json({ received: true });
    }
}
