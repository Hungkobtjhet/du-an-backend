import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../models/db.js';
import { DistanceHelper } from '../utils/distance.helper.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export class CheckoutController {
    static async processCheckout(req: Request, res: Response) {
        // 1. XỬ LÝ ĐẦU VÀO LINH HOẠT
        let { address, city, state, postcode, additional_info, name, email, phone_number, items, customer_info } = req.body;

        if (customer_info) {
            name = customer_info.name || name;
            phone_number = customer_info.phone || phone_number;
            address = customer_info.address || address;
            city = city || "Hà Nội";
            state = state || "Hà Nội";
            postcode = postcode || "10000";
            email = email || "guest@example.com";
        }

        const cartKey = 'customer';
        let cart = (req.session as any)[cartKey] || {};

        // 2. TỰ TẠO GIỎ HÀNG TỪ POSTMAN
        if (Object.keys(cart).length === 0 && items && Array.isArray(items) && items.length > 0) {
            try {
                const itemIds = items.map((i: any) => Number(i.menu_id));
                const dbItems = await prisma.menus.findMany({
                    where: { id: { in: itemIds } }
                });

                items.forEach((bodyItem: any) => {
                    const dbItem = dbItems.find(i => Number(i.id) === Number(bodyItem.menu_id));
                    if (dbItem) {
                        cart[dbItem.id.toString()] = {
                            id: Number(dbItem.id),
                            name: dbItem.name,
                            price: Number(dbItem.price),
                            image: dbItem.image,
                            quantity: Number(bodyItem.quantity)
                        };
                    }
                });
                (req.session as any)[cartKey] = cart;
            } catch (err) {
                console.error('Lỗi tự tạo giỏ hàng:', err);
            }
        }

        if (Object.keys(cart).length === 0) {
            return res.status(400).json({ message: 'Your cart is empty (Giỏ hàng trống hoặc ID món ăn không tồn tại).' });
        }

        try {
            // Lấy cài đặt đơn hàng
            let settings = await prisma.order_settings.findFirst();
            if (!settings) {
                settings = { price_per_mile: 10, distance_limit_in_miles: 100 } as any;
            }

            // Tính khoảng cách
            const restaurantAddress = process.env.RESTAURANT_ADDRESS || 'Hà Nội';
            const deliveryAddress = `${address} ${city}`;

            let distanceInMiles = 5;
            const distanceData = await DistanceHelper.getDistance(restaurantAddress, deliveryAddress);

            if (!distanceData.error) {
                // --- SỬA LỖI Ở ĐÂY: Thêm || 0 để TypeScript không báo lỗi undefined ---
                distanceInMiles = distanceData.value_in_miles || 5;
            }

            // Tính phí ship
            const pricePerMile = Number(settings?.price_per_mile || 0);
            const deliveryFee = Math.ceil(pricePerMile * distanceInMiles * 100) / 100;

            // Lưu session
            (req.session as any).delivery_details = {
                delivery_fee: deliveryFee,
                distance_in_miles: distanceInMiles,
                price_per_mile: pricePerMile
            };
            (req.session as any).customer_details = {
                name, email, phone_number, address, city, state, postcode, additional_info
            };

            const orderNo = Math.floor(1000000 + Math.random() * 9000000).toString();
            (req.session as any).order_no = orderNo;

            res.json({
                message: 'Checkout thành công!',
                order_no: orderNo,
                delivery_fee: deliveryFee,
                total_items: Object.keys(cart).length
            });

        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async createPaymentSession(req: Request, res: Response) {
        res.json({ message: "Payment logic here" });
    }
}