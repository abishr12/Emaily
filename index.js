const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy

const app = express();

passport.use(new GoogleStrategy())

// clientID
// 527715501916-etfd86d8ug2vg94jtetelm289v4i88dr.apps.googleusercontent.com
// clientSecret KiaHlK7aG1JK10jm9VJVvNFC
app.get('/', (req,res)=>{
    res.send({hi: 'there'})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);