import { Request, Response } from 'express';
import prisma from '../../models/db.js';
// 1. Thêm dòng này để import service
import { backupService } from '../../utils/backup.service.js';

// Hàm phụ để xử lý lỗi BigInt khi gửi JSON (Vì ID của bạn là BigInt)
const serializeBigInt = (data: any) => {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

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
            // Convert BigInt trước khi trả về client để tránh lỗi
            res.json(serializeBigInt(orders));
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await prisma.orders.findUnique({
                where: { id: BigInt(id) },
                include: {
                    customers: true,
                    order_items: true
                }
            });
            if (!order) return res.status(404).json({ message: 'Order not found.' });

            res.json(serializeBigInt(order));
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body; // 'pending', 'completed', 'cancelled'
        try {
            const order = await prisma.orders.update({
                where: { id: BigInt(id) },
                data: { status }
            });

            // 2. GỌI BACKUP Ở ĐÂY (Khi cập nhật thành công)
            // Dùng serializeBigInt để tránh lỗi crash khi gửi đi
            const safeData = serializeBigInt(order);

            // Gửi tín hiệu update sang server lưu trữ
            backupService.update(id, safeData, 'orders');

            res.json(safeData);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}