import {sequelize} from "../database/db.config";
const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';

export class ShoppingCartController {

    constructor() {

    }

    static addToShoppingCart(req: Request, res: Response) {
        let data = req.body;
        model.ShoppingCart.findOrCreate({
            where: {
                userId: data["userId"]
            }
        }).then((result) => {
            let shoppingCartId = 1;
            // find the product in that shopping cart
            model.CartItem.find({
                where: {
                    $and: [
                        {
                            shoppingCartId: shoppingCartId
                        },
                        {
                            productId: data['productId']
                        }
                    ]
                }
            }).then((result) => {
                if (!result) {
                    //insert new product in a shopping cart
                    model.CartItem.create({
                        shoppingCartId: shoppingCartId,
                        productId: data['productId'],
                        quantity: data['quantity']
                    }).then((item) => {
                        res.send({data: item, status: true});
                    }).catch((err) => {
                        res.send({data: {}, status: false});
                    });
                } else {
                    //update product quantity
                    model.CartItem.update({
                        quantity: result["quantity"] + 1
                    }, {
                        where: {
                            id: result["id"]
                        }
                    }).then((item) => {
                        if (item) {
                            res.send({status: true});
                        } else {
                            res.send({status: false});
                        }
                    }).catch((err) => {
                        res.send({status: false});
                    });
                }
            }).catch((err) => {
                if (err) {
                    res.send({status: false});
                }
            })
        })
    }


    //get the shopping cart of a particular user by userId
    static getShoppingCart(req: Request, res: Response) {
        let result_data = [];
        let userId = req.params.userId;
        sequelize.query("SELECT ShoppingCarts.id, ShoppingCarts.userId, ShoppingCarts.createdAt, ShoppingCarts.updatedAt, CartItems.id, CartItems.productId, CartItems.quantity, CartItems.shoppingCartId FROM `ShoppingCarts`, `CartItems` WHERE (ShoppingCarts.id = CartItems.shoppingCartId AND ShoppingCarts.userId = "+ userId + ")")
            .spread((results, metadata) => {
                result_data = results;
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});
            }
        });
    }
}