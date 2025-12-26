import { Request, Response } from 'express';
import prisma from '../../models/db.js';
// Import backup service
import { backupService } from '../../utils/backup.service.js';

export class AdminOrderController {
    static async index(req: Request, res: Response) {
        try {
            const orders = await prisma.orders.findMany({               
                include: {
                    customers: true,
                    order_items: true
                },
                orderBy: { created_at: 'desc' }
            });

            res.json(orders);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await prisma.orders.findUnique({
                where: { id: Number(id) },
                include: {
                    customers: true,
                    order_items: true
                }
            });
            if (!order) return res.status(404).json({ message: 'Order not found.' });

            res.json(order);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body; // 'pending', 'completed', 'cancelled'
        try {
            const order = await prisma.orders.update({
                where: { id: Number(id) },
                data: { status }
            });

            // Send update to backup service (pass numeric id)
            backupService.update(id, order, 'orders');

            res.json(order);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}