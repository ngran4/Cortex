const passport = require('passport');
const { db } = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// require user model
const User = require('../models/user');

// configure Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    console.log(profile, 'this is the profile from google');

    // Check if user exists in DB
    // If so, provide user document to passport
    const user = await User.findOne({googleId: profile.id});

    if(user) return cb(null, user);

    // If user does not exist in DB (new user), add them to it
    try {
      const newUser = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      })
      // pass newUser doc to passport
      return cb(null, newUser)

    } catch(err){
      return cb(err)
    }
  }
));

// determine which data of the user obj should be stored in each session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// "id" argument corresponds to key of user obj in done fn above (user.id)
passport.deserializeUser(function(id, done) {
  // Find your User using model, then call done
  User.findById(id, function(err, userDoc){
    done(err, userDoc);
  });
  /* when done fn is called, passport assigns the user doc to req.user, 
  which will then be available in every controller fn, so you always know the logged in user */
});



