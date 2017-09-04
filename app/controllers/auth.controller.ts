/*
 * This controller handles all the request to /api/auth
 *
 */
const bcrypt = require('bcrypt-nodejs');

const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';
const config = require('../config/main');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

export class AuthController {

    constructor() {

    }

    static setUserInfo(request) {
        return {
            id: request.id,
            email: request.email
        }
    }


    static generateToken(user) {
        return jwt.sign(user, config.secret, {
            expiresIn: 3600  // in seconds
        });
    }

    static register(req: Request, res: Response) {
        let data = req.body;
        let currentDate = Date.now();
        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(data.password, salt);
        model.User.create({
            email: data['email'],
            password: hashPassword,
            last_logged_in: currentDate
        }).then((user) => {
            let userInfo = AuthController.setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + AuthController.generateToken(userInfo),
                user: userInfo,
                status: true
            });
        }).catch((err) => {
            res.send({status: false});
        });
    }

    static login(req: Request, res: Response) {
        // let data = req.body;
        let userInfo = AuthController.setUserInfo(req.body);
        res.status(200).json({
            token: 'JWT ' + AuthController.generateToken(userInfo),
            user: userInfo
        })

        // model.User.findOne({
        //     where: {
        //         $and: [
        //             {email: data['email']},
        //             {password: data['password']}
        //         ]
        //     }
        // }).then((user) => {
        //     res.send({status: true, data: user});
        // }).catch((err) => {
        //     res.send({status: false});
        // })
    }

    static comparePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    }


    static authenticate(req: Request, res: Response) {
        model.User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (!user) {
                res.send({status: false, message: 'Authentication failed. User not found.'});
            } else {
                if (AuthController.comparePassword(req.body.password, user.password)) {
                    console.log("Password match");
                    // --------------------------------------------
                    let userInfo = AuthController.setUserInfo(user);
                    res.status(201).json({
                        token: 'JWT ' + AuthController.generateToken(userInfo),
                        user: userInfo,
                        status: true
                    });
                } else {
                    res.send({status: false, message: 'Authentication failed. Passwords did not match.'});
                }
            }
        }).catch((err) => {
            console.log(err);
            if (err) {
                res.send({status: false, message: 'Authentication failed. Error in authentication'});
            }
        })
    }





}