import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from '../models/db.js';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: any, done: any) => {
            try {
                const user = await prisma.users.findUnique({
                    where: { email },
                });

                if (!user) {
                    return done(null, false, { message: 'Invalid email or password.' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Invalid email or password.' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user: any, done: any) => {
    done(null, user.id.toString());
});

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: BigInt(id) },
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
});
