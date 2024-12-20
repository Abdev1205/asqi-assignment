import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/user.js';
import dotenv from 'dotenv';
import Employee from '../models/employee.js';

dotenv.config();


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await Employee.findOne({ googleId: profile.id });
    if (!user) {
      user = new Employee({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value,
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Employee.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

