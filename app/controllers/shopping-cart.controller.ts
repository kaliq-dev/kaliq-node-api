import {sequelize} from "../database/db.config";
const Sequelize = require("sequelize");
const model = require('../../models');
import * as _ from 'underscore';
import {Router, Request, Response} from 'express';
import {GeneralController} from './general.controller';

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
            let temp = result[0];
            let shoppingCartId = temp.dataValues.id;
            //find the product in that shopping cart
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
                        quantity: data["quantity"]
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
                        if (err) {
                            res.send({status: false});
                        }
                    })
                }
            })
        }).catch((err) => {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status: true});
            }
        })
    }

    //get the shopping cart of a particular user by userId
    static getShoppingCart(req: Request, res: Response) {
        let result_data = [];
        let userId = req.params.userId;
        sequelize.query("SELECT ShoppingCarts.id, ShoppingCarts.userId, ShoppingCarts.createdAt, ShoppingCarts.updatedAt, CartItems.id, CartItems.productId, CartItems.quantity, CartItems.shoppingCartId, Products.name, Products.price, Products.vat, Products.image_list, Products.rating FROM `ShoppingCarts`, `CartItems`, `Products` WHERE (ShoppingCarts.id = CartItems.shoppingCartId AND ShoppingCarts.userId = " + userId + " AND CartItems.productId = Products.id)")
            .spread((results, metadata) => {
                //get product-details of each cart-item
                let result_data = GeneralController.getImageFilePath(results);
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