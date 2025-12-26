import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && ((req.user as any).role === 'admin' || (req.user as any).role === 'global_admin')) {
        return next();
    }
    res.status(403).json({ message: 'Unauthorized. Admin access only.' });
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized. Please login.' });
};
