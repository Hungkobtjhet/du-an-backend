import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../models/db.js';
import { DistanceHelper } from '../utils/distance.helper.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export class CheckoutController {
    /**
     * Process customer details and calculate delivery
     */
    static async processCheckout(req: Request, res: Response) {
        const { address, city, state, postcode, additional_info, name, email, phone_number } = req.body;
        const cartKey = 'customer'; // Default cart key for public
        const cart = (req.session as any)[cartKey] || {};

        if (Object.keys(cart).length === 0) {
            return res.status(400).json({ message: 'Your cart is empty.' });
        }

        try {
            // Get Order Settings
            const settings = await prisma.order_settings.findFirst();
            if (!settings) {
                return res.status(500).json({ message: 'Order settings not found.' });
            }

            // Calculate distance (simulated or real)
            const restaurantAddress = process.env.RESTAURANT_ADDRESS || 'London, UK';
            const deliveryAddress = `${address} ${city} ${state} ${postcode}`;

            const distanceData = await DistanceHelper.getDistance(restaurantAddress, deliveryAddress);

            if (distanceData.error) {
                return res.status(400).json({ message: distanceData.error });
            }

            if (distanceData.value_in_miles > settings.distance_limit_in_miles) {
                return res.status(400).json({
                    message: `Delivery distance limit exceeded. Max: ${settings.distance_limit_in_miles} miles.`
                });
            }

            const deliveryFee = Math.ceil(Number(settings.price_per_mile) * distanceData.value_in_miles * 100) / 100;

            // Store in session
            (req.session as any).delivery_details = {
                delivery_fee: deliveryFee,
                distance_in_miles: distanceData.value_in_miles,
                price_per_mile: Number(settings.price_per_mile)
            };
            (req.session as any).customer_details = {
                name,
                email,
                phone_number,
                address,
                city,
                state,
                postcode,
                additional_info
            };

            // Generate Order No
            let orderNo: string;
            let exists = true;
            do {
                orderNo = Math.floor(1000000 + Math.random() * 9000000).toString();
                const existingOrder = await prisma.orders.findFirst({ where: { order_no: orderNo } });
                exists = !!existingOrder;
            } while (exists);

            (req.session as any).order_no = orderNo;

            res.json({ message: 'Checkout processed. Proceed to payment.', order_no: orderNo, delivery_fee: deliveryFee });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Create Stripe Checkout Session
     */
    static async createPaymentSession(req: Request, res: Response) {
        const sessionData = req.session as any;
        const cart = sessionData.customer || {};
        const customerDetails = sessionData.customer_details;
        const deliveryDetails = sessionData.delivery_details;
        const orderNo = sessionData.order_no;

        if (!customerDetails || !orderNo) {
            return res.status(400).json({ message: 'Session expired. Please restart checkout.' });
        }

        try {
            const siteSettings = await prisma.site_settings.findFirst();
            const currency = siteSettings?.currency_code?.toLowerCase() || 'gbp';

            const lineItems: any[] = Object.values(cart).map((item: any) => ({
                price_data: {
                    currency,
                    product_data: { name: item.name },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            }));

            if (deliveryDetails?.delivery_fee) {
                lineItems.push({
                    price_data: {
                        currency,
                        product_data: { name: 'Delivery Fee' },
                        unit_amount: Math.round(deliveryDetails.delivery_fee * 100),
                    },
                    quantity: 1,
                });
            }

            const stripeSession = await stripe.checkout.sessions.create({
                line_items: lineItems,
                mode: 'payment',
                customer_email: customerDetails.email,
                metadata: {
                    order_no: orderNo,
                    customer_name: customerDetails.name,
                },
                success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            });

            // Create Order in "pending" status (Pre-payment)
            const totalPrice = Object.values(cart).reduce((total: number, item: any) => total + (item.price * item.quantity), 0);

            const customer = await prisma.customers.create({
                data: {
                    name: customerDetails.name,
                    email: customerDetails.email,
                    phone_number: customerDetails.phone_number,
                    address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state}, ${customerDetails.postcode}`,
                }
            });

            const order = await prisma.orders.create({
                data: {
                    customer_id: customer.id,
                    order_no: orderNo,
                    order_type: 'online',
                    total_price: totalPrice,
                    status: 'pending',
                    status_online_pay: 'unpaid',
                    session_id: stripeSession.id,
                    payment_method: 'STRIPE',
                    additional_info: customerDetails.additional_info,
                    delivery_fee: deliveryDetails.delivery_fee,
                    delivery_distance: deliveryDetails.distance_in_miles.toString(),
                    price_per_mile: deliveryDetails.price_per_mile,
                    order_items: {
                        create: Object.values(cart).map((item: any) => ({
                            menu_name: item.name,
                            quantity: item.quantity,
                            subtotal: item.price * item.quantity
                        }))
                    }
                }
            });

            res.json({ url: stripeSession.url });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
