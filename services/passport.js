const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users')


// Logging in
passport.serializeUser((user, done) =>{
    done(null, user.id)
})

// Making requests
passport.deserializeUser((id,done) =>{
    User.findById(id)
        .then(user =>{
            done(null, user)
        })
    
})
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id})
        .then(existingUser  => {
            if(existingUser){
                //First argument is any error object 
                //2nd argument is the user record -> Existing User
                done(null, existingUser)
            }
            else{
                new User({googleId: profile.id}).save()
                    .then(user => done(null, user))
            }
            
        })
    

}))