import { Request, Response } from 'express';
import prisma from '../models/db.js';

export class PublicController {
    /**
     * Home page data
     */
    static async home(req: Request, res: Response) {
        try {
            const menus = await prisma.$queryRaw`SELECT * FROM menus ORDER BY RAND()`;
            const blogs = await prisma.blogs.findMany({
                orderBy: { created_at: 'desc' },
                take: 3,
            });
            const testimonies = await prisma.$queryRaw`SELECT * FROM testimonies ORDER BY RAND() LIMIT 5`;

            res.json({
                menus,
                blogs,
                testimonies,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Menu page with categories
     */
    static async menu(req: Request, res: Response) {
        const { search } = req.query;

        try {
            const categories = await prisma.categories.findMany({
                include: {
                    menus: {
                        where: search ? {
                            name: {
                                contains: search as string,
                            },
                        } : {},
                    },
                },
            });

            res.json(categories);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Single menu item details
     */
    static async menuItem(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const menu = await prisma.menus.findUnique({
                where: { id: BigInt(id) },
                include: { categories: true },
            });

            if (!menu) {
                return res.status(404).json({ message: 'Menu item not found.' });
            }

            const relatedMenus = await prisma.$queryRaw`SELECT * FROM menus WHERE id != ${BigInt(id)} ORDER BY RAND() LIMIT 5`;

            res.json({
                menu,
                relatedMenus,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
