import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserWithEmailAndPassword, findUserForAuth } from "@/api-lib/db"

passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
});

passport.deserializeUser(async (req:any, id: any, done: any) => {
    try {
        const user = await findUserForAuth(id);
        done(null, user)
    } catch (error) {
        done((<Error>error).message)
    }
});

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req: any, email: string, password: string, done: any) => {
            const user = await findUserWithEmailAndPassword(email, password);
            if (user) done(null, user);
            else done(null, false, 'Email or Password is incorrect.' );
        })
);

export default passport;