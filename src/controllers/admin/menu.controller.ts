import { Request, Response } from 'express';
import prisma from '../../models/db.js';

export class AdminMenuController {
    static async index(req: Request, res: Response) {
        try {
            const menus = await prisma.menus.findMany({
                include: { categories: true },
            });
            res.json(menus);
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
                    category_id: BigInt(category_id),
                    image: image || '',
                },
            });
            res.status(212).json(menu);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, category_id, image } = req.body;
        try {
            const menu = await prisma.menus.update({
                where: { id: BigInt(id) },
                data: {
                    name,
                    description,
                    price: price ? parseFloat(price) : undefined,
                    category_id: category_id ? BigInt(category_id) : undefined,
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
                where: { id: BigInt(id) },
            });
            res.json({ message: 'Menu deleted successfully.' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
