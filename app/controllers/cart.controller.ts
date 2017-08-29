/*
 this controller handles all the request to /api/cart
 */

const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';


export class CartController {

    constructor() {

    }

    static addToCart(req: Request, res: Response) {
        let data = req.body;
        model.Cart.create({
            user_id: data['user_id'],
            product_list: data['product_list']
        }).then((cart) => {
            res.send({data: cart, status: true});
        }).catch((err) => {
            if (err) {
                res.send({data: {}, status: false});
            }
        });
    }

    static getCart(req: Request, res: Response){
        let result_data = [];

    }
}