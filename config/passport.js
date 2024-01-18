const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user')

passport.use(new GoogleStrategy(
  // Configuration object
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // A user has logged in with OAuth...
      let user = await User.findOne({ googleId: profile.id });
      // Existing user found, so provide it to passport
      // ****** Check to see if they are an admin (musician)
      
      if (user) return cb(null, user);
      // We have a new user via OAuth!
      // ******  We might not want to create a new user =>  REFACTOR BELOW *****
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));


passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
  });

