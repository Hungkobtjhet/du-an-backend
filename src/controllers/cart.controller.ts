import { Request, Response } from 'express';

export class CartController {
    private static getCartSession(req: Request, cartKey: string) {
        if (!req.session) return {};
        return (req.session as any)[cartKey] || {};
    }

    private static saveCartSession(req: Request, cartKey: string, cart: any) {
        if (!req.session) return;
        (req.session as any)[cartKey] = cart;
    }

    static async addToCart(req: Request, res: Response) {
        const { cartkey, id, name, price, img_src } = req.body;

        if (!cartkey || !id || !name || price === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const cart = CartController.getCartSession(req, cartkey);

        if (cart[id]) {
            cart[id].quantity++;
        } else {
            cart[id] = {
                id,
                name,
                price,
                img_src: img_src || '',
                quantity: 1,
            };
        }

        CartController.saveCartSession(req, cartkey, cart);
        const totalItems = CartController.calculateTotalItems(cart);

        res.json({
            success: true,
            cart,
            total_items: totalItems,
        });
    }

    static async removeFromCart(req: Request, res: Response) {
        const { cartkey, id } = req.body;
        const cart = CartController.getCartSession(req, cartkey);

        if (cart[id]) {
            delete cart[id];
        }

        CartController.saveCartSession(req, cartkey, cart);
        const totalItems = CartController.calculateTotalItems(cart);

        res.json({
            success: true,
            cart,
            total_items: totalItems,
        });
    }

    static async getCart(req: Request, res: Response) {
        const { cartkey } = req.query;
        const cart = CartController.getCartSession(req, cartkey as string);
        res.json({ cart });
    }

    static async clearCart(req: Request, res: Response) {
        const { cartkey } = req.body;
        CartController.saveCartSession(req, cartkey, {});
        res.json({ success: true, cart: [] });
    }

    static async updateQuantity(req: Request, res: Response) {
        const { cartkey, id, quantity } = req.body;
        const cart = CartController.getCartSession(req, cartkey);

        if (cart[id]) {
            cart[id].quantity = quantity;
            CartController.saveCartSession(req, cartkey, cart);
        }

        const totalItems = CartController.calculateTotalItems(cart);
        res.json({ success: true, cart, total_items: totalItems });
    }

    private static calculateTotalItems(cart: any) {
        return Object.values(cart).reduce((total: number, item: any) => total + (item.quantity || 0), 0);
    }
}
