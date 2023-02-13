import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import findOrCreate from 'mongoose-findorcreate';
import User from '../models/userModel.js';

passport.serializeUser(function (user, cb) {
  console.log(user, 'serialize');
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log(user, 'deserialize');
  process.nextTick(function () {
    return cb(null, user);
  });
});

// FOR GOOGLE STRATEGY FROM PASSPORT
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/google/secrets',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile, 'google');
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

//FOR FACEBOOK STRATEGY FROM PASSPORT
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:8080/auth/facebook/secret',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile, 'facebook');
      User.findOrCreate(
        { facebookId: profile.id, email: profile.email },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
