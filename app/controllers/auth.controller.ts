/*
 * This controller handles all the request to /api/auth
 *
 */
const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';

export class AuthController {
    constructor() {

    }

    static register(req: Request, res: Response) {
        let data = req.body;
        let currentDate = Date.now();
        if (data.password != data.confirm_password) {
            res.send({status: false});
        } else {
            model.User.create({
                username: data['username'],
                email: data['email'],
                password: data['password'],
                last_logged_in: currentDate
            }).then((user) => {
                res.send({status: true, data: user});
            }).catch((err) => {
                res.send({status: false});
            });
        }
    }

    static login(req: Request, res: Response) {
        let data = req.body;
        model.User.findOne({
            where: {
                $and: [
                    {email: data['email']},
                    {password: data['password']}
                ]
            }
        }).then((user) => {
            res.send({status: true, data: user});
        }).catch((err) => {
            res.send({status: false});
        })
    }


}