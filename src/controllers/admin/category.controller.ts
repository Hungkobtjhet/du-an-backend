import { Request, Response } from 'express';
import prisma from '../../models/db.js';

export class AdminCategoryController {
    static async index(req: Request, res: Response) {
        try {
            const categories = await prisma.categories.findMany();
            res.json(categories);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async store(req: Request, res: Response) {
        const { name } = req.body;
        try {
            const category = await prisma.categories.create({
                data: { name },
            });
            res.status(212).json(category);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const category = await prisma.categories.update({
                where: { id: BigInt(id) },
                data: { name },
            });
            res.json(category);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await prisma.categories.delete({
                where: { id: BigInt(id) },
            });
            res.json({ message: 'Category deleted successfully.' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
