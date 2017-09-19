import {sequelize} from "../database/db.config";
const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';
import * as _ from 'underscore';
import * as async from 'async';

export class CheckoutController {

    constructor(){}

    static setCheckout(req:Request,res:Response){

        function callback() {
            console.log("callback");
        }

        let data = req.body;
        let order_id = 0;
        if(data.isInstant){
            //for instant purchase checkout
            sequelize.query(`INSERT INTO Orders (full_name,address,phone,country,city,state,post_code,payment_method,card_holder_name,card_number,cvc,expire_date,total_price,userId,isInstant,brandId,typeId,quantity,gradeId,packageId) VALUES ('${data.full_name}','${data.address}','${data.phone}','${data.country}','${data.city}','${data.state}','${data.post_code}','${data.payment_method}','${data.card_holder_name}','${data.card_number}','${data.cvc}','${data.expire_date}','${data.total_price}','${data.userId}','${data.isInstant}','${data.brandId}','${data.typeId}','${data.quantity}','${data.gradeId}','${data.packageId}')`)
                .spread((results,metadata) => {
                    //empty cart for user
                    if(results > 0){
                        order_id = results;
                        sequelize.query(`DELETE FROM CartItems WHERE CartItems.shoppingCartId = (SELECT ShoppingCarts.id FROM ShoppingCarts WHERE ShoppingCarts.userId = ${data.userId})`)
                            .spread((results,metadata)=>{
                                res.send({order_id:order_id,status:true});
                            }).catch((err)=>{
                            res.send({status:false});
                        });
                    }
                }).catch((err)=>{
                res.send({status:false});
            });
        }else{
            //for regular checkout
            let product_data = [];
            let order_id = 0;
            sequelize.query(`SELECT productId, quantity FROM CartItems WHERE CartItems.shoppingCartId = (SELECT ShoppingCarts.id FROM ShoppingCarts WHERE userId = ${data.userId})`)
                .spread((results,metadata)=>{
                    product_data = results;
                    sequelize.query(`DELETE FROM CartItems WHERE CartItems.shoppingCartId = (SELECT ShoppingCarts.id FROM ShoppingCarts WHERE ShoppingCarts.userId = ${data.userId})`)
                        .spread((results,metadata)=>{
                            sequelize.query(`INSERT INTO Orders (full_name,address,phone,country,city,state,post_code,payment_method,card_holder_name,card_number,cvc,expire_date,total_price,userId,isInstant) VALUES ('${data.full_name}','${data.address}','${data.phone}','${data.country}','${data.city}','${data.state}','${data.post_code}','${data.payment_method}','${data.card_holder_name}','${data.card_number}','${data.cvc}','${data.expire_date}','${data.total_price}','${data.userId}','${data.isInstant}'`)
                                .spread((results,metadata)=>{
                                    order_id = results;
                                    async.map(product_data,function(item,callback){
                                        sequelize.query(`INSERT INTO OrderProduct (orderId,productId,quantity) VALUES (${order_id},${item.productId},${item.quantity})`)
                                            .spread((results,metadata)=>{
                                                callback(null,order_id);
                                            }).catch((err)=>{
                                            callback(err,null);
                                        })
                                    },function(err,results){
                                        if(!err){
                                            res.send({results:results,status:true});
                                        }else{
                                            res.send({error:err,status:false});
                                        }
                                    });
                                }).catch((err)=>{
                                if(err){
                                    console.log(err);
                                    res.send({from:"INSERT INTO Orders",status:false});
                                }
                            });
                        }).catch((err)=>{
                        if(err){
                            console.log(err);
                            res.send({from:"DELETE FROM CartItems",status:false});
                        }
                    });
                }).catch((err)=>{
                console.log(err);
                res.send({from:"SELECT MAIN",status:false});

            })
        }
    }

    static getOrderById(req:Request,res:Response){
        sequelize.query(`SELECT * FROM Orders WHERE Orders.id=${req.params.id}`)
            .spread((results,metadata)=>{
                res.send({results});
            }).catch((err)=>{
            res.send({status:false});
        })
    }
}
