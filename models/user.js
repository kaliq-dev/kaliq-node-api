'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        last_logged_in: DataTypes.DATE,
        image: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return User;
};