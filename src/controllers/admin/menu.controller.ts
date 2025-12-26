import { Request, Response } from 'express';
import prisma from '../../models/db.js';

export class AdminMenuController {
    static async index(req: Request, res: Response) {
        try {
            const menus = await prisma.menus.findMany({
                include: { categories: true },
            });
            // Convert BigInt to String before sending JSON (để tránh lỗi serialization nếu còn sót BigInt)
            const responseData = JSON.parse(JSON.stringify(menus, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
            res.json(responseData);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async store(req: Request, res: Response) {
        const { name, description, price, category_id, image } = req.body;
        try {
            const menu = await prisma.menus.create({
                data: {
                    name,
                    description,
                    price: parseFloat(price),
                    // QUAN TRỌNG: Đổi BigInt thành Number vì DB đã đổi sang Int
                    category_id: Number(category_id),
                    image: image || '', // Hiện tại chỉ nhận String (Link ảnh)
                },
            });
            res.status(201).json(menu); // Đổi 212 thành 201 (Created) cho chuẩn
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, category_id, image } = req.body;
        try {
            const menu = await prisma.menus.update({
                // QUAN TRỌNG: Đổi BigInt(id) thành Number(id)
                where: { id: Number(id) },
                data: {
                    name,
                    description,
                    price: price ? parseFloat(price) : undefined,
                    // QUAN TRỌNG: Đổi BigInt thành Number
                    category_id: category_id ? Number(category_id) : undefined,
                    image,
                },
            });
            res.json(menu);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await prisma.menus.delete({
                where: { id: Number(id) }, // QUAN TRỌNG: Đổi BigInt thành Number
            });
            res.json({ message: 'Menu deleted successfully.' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}