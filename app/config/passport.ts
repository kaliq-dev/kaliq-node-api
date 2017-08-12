var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var model = require('../../models');
var config = require('./main');

module.exports = function (passport) {
    var opts = {};
    opts["jwtFromRequest"] = ExtractJwt.fromAuthHeader();
    opts["secretOrKey"] = config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        model.User.findOne({
            where: {
                id: jwt_payload.id
            }
        }).then((user) => {
            done(null, user);
        }).catch((err) => {
            done(null, false);
        });
    }))
}


// --------------------------------------------------------
// // Importing Passport, strategies, and config\
// import {AuthController} from '../controllers/auth.controller';
// const passport = require('passport'),
//     model = require('../models'),
//     config = require('./main'),
//     JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt,
//     LocalStrategy = require('passport-local');
//
// const localOptions = {usernameField: 'email'};
//
// const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
//     model.User.findOne({
//         where: {
//             email: email
//         }
//     }).then((user) => {
//         let passwordMatch = AuthController.comparePassword(user.password, password);
//         if (passwordMatch) {
//             return done(null, user);
//         } else {
//             console.log("passowrd mismatch");
//             return done(null, false, {error: "Your login details could not be verified. Please try again."});
//         }
//     }).catch((err) => {
//         if (err) {
//             return done(err);
//         }
//     });
// });
//
// const jwtOptions = {
//     // Telling Passport to check authorization headers for JWT
//     jwtFromRequest: ExtractJwt.fromAuthHeader(),
//     // Telling Passport where to find the secret
//     secretOrKey: config.secret
// };
//
//
// const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
//     model.User.findOne({
//         where: {
//             id: payload.id
//         }
//     }).then((user) => {
//         done(null, user);
//     }).catch((err) => {
//         if (err) {
//             done(null, false);
//         }
//     })
// })
//
// passport.use(jwtLogin);
// passport.use(localLogin);
//
// export default passport;
