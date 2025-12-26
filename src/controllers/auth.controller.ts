import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../models/db.js';
import passport from 'passport';

export class AuthController {
    /**
     * Handle the login request
     */
    static async login(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', (err: any, user: any, info: any) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ message: info?.message || 'Invalid email or password.' });
            }

            if (user.status !== 1) {
                // Handle inactive/banned users exactly like Laravel
                if (user.notice === 'change_password_to_activate_account') {
                    return res.status(403).json({
                        message: 'Activation required.',
                        action: 'activate_account',
                        email: user.email
                    });
                } else if (user.notice === 'banned') {
                    return res.status(403).json({ message: 'Your account has been banned.' });
                }
                return res.status(403).json({ message: 'Account is not active.' });
            }

            req.logIn(user, (err: any) => {
                if (err) return next(err);
                return res.json({
                    message: 'Logged in successfully.',
                    user: {
                        id: user.id.toString(),
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        role: user.role
                    }
                });
            });
        })(req, res, next);
    }

    /**
     * Handle logout
     */
    static logout(req: Request, res: Response) {
        req.logout((err: any) => {
            if (err) return res.status(500).json({ message: 'Logout failed.' });
            res.json({ message: 'Logged out successfully.' });
        });
    }

    /**
     * Get current user
     */
    static me(req: Request, res: Response) {
        if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
        const user = req.user as any;
        res.json({
            id: user.id.toString(),
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role
        });
    }
}
