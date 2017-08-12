'use strict';
const bcrypt = require('bcrypt-nodejs');
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            last_logged_in: DataTypes.DATE,
            image: DataTypes.STRING,
            password: DataTypes.STRING,
            resetPasswordToken: DataTypes.STRING,
            resetPasswordExpires: DataTypes.DATE
        },
        {
            instanceMethods: {
                setPassword: function (password, done) {
                    return bcrypt.genSalt(10, function (err, salt) {
                        if(err) console.log("Error in hasing");
                        return bcrypt.hash(password, salt, function (error, encrypted) {
                            this.password = encrypted;
                            this.salt = salt;
                            return done();
                        });
                    });
                }
            }
        },
        {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
        }
        )
    ;
    return User;
};