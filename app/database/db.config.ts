
/*
 * For using locally connected to remote via ssh
 */
import * as Sequelize from "sequelize";
export const sequelize = new Sequelize('kaliqDB', 'root', 'root', {
    host: '127.0.0.1',
    port: 33060,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

/*
  * for using in remote server
 */
// import * as Sequelize from "sequelize";
// export const sequelize = new Sequelize('kaliqDB', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });






