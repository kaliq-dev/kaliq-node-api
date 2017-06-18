import * as Sequelize from "sequelize";
export const sequelize = new Sequelize('kaliqDB', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});




