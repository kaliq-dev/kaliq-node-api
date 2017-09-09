/*
 * This controller handles all the request to /api/product
 *
 */
import {sequelize} from "../database/db.config";
const Sequelize = require("sequelize");
const model = require("../../models");
import {Router, Request, Response} from 'express';
import {GeneralController} from './general.controller';
import * as _ from 'underscore';

const rowCount = 32;
export class ProductController {

    constructor() {
    }

    //set rating for a product
    static setRating(req: Request, res: Response) {
        let data = req.body;
        model.ProductUserRating.find({
            where: {
                $and: [
                    {
                        productId: data['productId']
                    },
                    {
                        userId: data['userId']
                    }
                ]
            }
        }).then((result) => {
            if (!result) {
                model.ProductUserRating.create({
                    productId: data['productId'],
                    userId: data['userId'],
                    rating: data['rating']
                }).then((item) => {
                    res.send({data: item, status: true});
                }).catch((err) => {
                    if (err) {
                        res.send({data: {}, status: false});
                    }
                })
            } else {
                //update product quantity
                model.ProductUserRating.update({
                    rating: data['rating']
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
        }).catch((err) => {
            if (err) {
                res.send({status: false})
            } else {
                res.send({status: true})
            }
        });
    }

    //favourite product
    static setFavourite(req: Request, res: Response) {
        let data = req.body;
        model.Favourite.findOne({
            where: {
                $and:[
                    {
                        productId: data['productId']
                    },
                    {
                        userId: data['userId']
                    }
                ]
            }
            }).then((result)=>{
                if(result){
                    model.Favourite.destroy({
                        where: {
                            $and: [
                                {
                                    productId: data['productId']
                                },
                                {
                                    userId: data['userId']
                                }
                            ]
                        }
                    }).then((data)=>{
                        res.send({data:data,status:true});
                    }).catch((err)=>{
                        if(err){
                            res.send({data:[],status:false});
                        }
                    })
                }else{
                    model.Favourite.create({
                        userId: data['userId'],
                        productId: data['productId']
                    }).then((data)=>{
                        res.send({data:data,status:true});
                    }).catch((err)=>{
                        if(err){
                            res.send({data:[],status:false});
                        }
                    })
                }
            }).catch((err)=>{
            if(err){
                res.send({status:false});
            }else{
                res.send({status:false})
            }
        });
    }

    static getFavouriteList(req: Request, res: Response) {
        let result_data = [];
        let skipCount = (req.params.paginationCount - 1) * 10;
        sequelize.query(`SELECT Favourites.id, Favourites.userId, Favourites.productId, Products.name, Products.image_list, Products.price, Products.vat, Products.in_cart,ProductUserRatings.rating FROM Favourites LEFT JOIN Products ON Favourites.productId = Products.id LEFT JOIN ProductUserRatings ON Favourites.productId = ProductUserRatings.productId WHERE Favourites.userId = ${req.params.userId} LIMIT 10 OFFSET ${skipCount}`)
            .spread((results, metadata) => {
                // result_data = GeneralController.getImageFilePath(results);
                res.send({data: results, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});
            }
        });
    }

    static getProductDetailsById(req: Request, res: Response) {
        let result_data = [];
        let rating = 0;
        let category_id = 1;
        let product_details = {};

        sequelize.query(`SELECT Products.id, Products.category_id, Products.name, Products.price, Products.vat, Products.image_list,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name, FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id AND Products.id = ${req.params.productId}`)
            .spread((results,metadata)=>{
            console.log(results);
                result_data = GeneralController.getImageFilePath(results);
                category_id = results[0].category_id;
                if(results.length > 0){
                    sequelize.query(`SELECT ProductUserRatings.rating FROM ProductUserRatings WHERE ProductUserRatings.productId = ${req.params.productId} AND ProductUserRatings.userId = ${req.params.userId}`)
                        .spread((results,metadata)=>{
                            if(results.length > 0) {
                                rating = results[0].rating;
                            }
                            product_details = {
                                id: result_data[0].id,
                                userId: req.params.userId,
                                name: result_data[0].name,
                                price: result_data[0].price,
                                vat: result_data[0].vat,
                                supplier_name: result_data[0].supplier_name,
                                brand_name: result_data[0].brand_name,
                                category_name: result_data[0].category_name,
                                image_list: result_data[0].image_list,
                                rating: rating,
                                in_cart: result_data[0].in_cart
                            }
                            sequelize.query("SELECT Products.id,Products.category_id,Products.supplier_id,Products.brand_id, Products.name, Products.price, Products.vat, Products.image_list, Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id AND Products.category_id = " + category_id)
                                .spread((results, metadata) => {
                                    let data = GeneralController.getImageFilePath(results);
                                    res.send({details: product_details, similar_products: data});
                                }).catch((err)=>{
                                if(!err){
                                    res.send({details:product_details,status:true});

                                }else{
                                    res.send({details:product_details,status:false});

                                }
                            })
                        }).catch((err)=>{
                        if(err){
                            res.send({status:false});
                        }else{
                            res.send({status:true});
                        }
                    });
                }
            }).catch((err)=>{
            if(err){
                res.send({details: product_details, status: false});
            }else{
                res.send({details: product_details, status: true});
            }
        })
    }

    static create(req: Request, res: Response) {
        let data = req.body;
        model.Product.create({
            name: data['name'],
            supplier_id: parseInt(data['supplier']),
            category_id: parseInt(data['category']),
            brand_id: parseInt(data['brand']),
            price: data['price'],
            vat: data['vat'],
            image_list: data['image_list']
        }).then((product) => {
            res.send({data: product});
        }).catch((err) => {
            res.send({status: false});
        });
    }

    static readAll(req: Request, res: Response) {
        let result_data = [];
        let skipCount = (req.params.paginationCount - 1) * 10;
        sequelize.query("SELECT Products.id, Products.name, Products.price, Products.vat, Products.image_list, Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id LIMIT 10 OFFSET " + skipCount)
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                res.send({data: result_data, count: result_data.length, status: true});
            })
            .catch((err) => {
                if (err) {
                    res.send({data: result_data, count: result_data.length, status: false});
                } else {
                    res.send({data: result_data, count: result_data.length, status: true});
                }
            });
    }

    static deleteById(req: Request, res: Response) {
        model.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.send({status: true});
        }).catch((err) => {
            res.send({status: false});
        });
    }

    static filterByCategory(req: Request, res: Response) {
        let filterId = req.body.filterList;
        let result = [];
        model.Product.findAll({
            where: {
                category_id: {
                    $in: filterId
                }
            }
        }).then((data) => {
            result = data;
            res.send({data: result, count: result.length, status: true});
        }).catch((err) => {
            res.send({data: result, count: result.length, status: false});
        });
    }

    static filterByBrand(req: Request, res: Response) {
        let filterId = req.body.filterList;
        let result = [];
        model.Product.findAll({
            where: {
                brand_id: {
                    $in: filterId
                }
            }
        }).then((data) => {
            result = data;
            res.send({data: result, count: result.length, status: true});
        }).catch((err) => {
            res.send({data: result, count: result.length, status: false});
        });
    }


    static filterBySupplier(req: Request, res: Response) {
        let filterId = req.body.filterList;
        let result = [];
        model.Product.findAll({
            where: {
                supplier_id: {
                    $in: filterId
                }
            }
        }).then((data) => {
            result = data;
            res.send({data: result, count: result.length, status: true});
        }).catch((err) => {
            res.send({data: result, count: result.length, status: false});
        });
    }

    static getNewProducts(req: Request, res: Response) {
        let result_data = [];
        sequelize.query("SELECT Products.id, Products.name, Products.price, Products.vat, Products.image_list,Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id Order By rand() LIMIT 10")
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});
            }
        });
    }


    static getPopularProducts(req: Request, res: Response) {
        let result_data = [];
        sequelize.query("SELECT Products.id, Products.name, Products.price, Products.vat, Products.image_list,Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id Order By rand() LIMIT 10")
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});

            }
        });
    }

    static getFeaturedProducts(req: Request, res: Response) {
        let result_data = [];
        sequelize.query("SELECT Products.id, Products.name, Products.price, Products.vat, Products.image_list,Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id Order By rand() LIMIT 10")
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});
            }
        });
    }

    static getRecommendedProducts(req: Request, res: Response) {
        let result_data = [];
        sequelize.query("SELECT Products.id, Products.name, Products.price, Products.vat, Products.image_list, Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id Order By rand() LIMIT 10")
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});

            }
        });
    }

    static getNewArrivalProducts(req: Request, res: Response) {
        let result_data = [];
        sequelize.query("SELECT Products.id, Products.name, Products.price, Products.vat, Products.image_list, Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id Order By rand() LIMIT 10")
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});

            }
        });
    }


    static getRandomInt(min, max) {
        let data = [];
        for (let i = 0; i <= 10; i++) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
            data.push(num);
        }
        return data;
    }

    //get product by category
    static getProductByCategory(req: Request, res: Response) {
        let result_data = [];
        sequelize.query("SELECT Products.id,Products.category_id,Products.supplier_id,Products.brand_id, Products.name, Products.price, Products.vat, Products.image_list, Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name AS brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id AND Products.category_id = " + req.params.categoryId + " LIMIT 10")
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});
            }
        });
    }

    //get product details
    static getProductDetails(req: Request, res: Response) {
        let result_data = [];
        sequelize.query("SELECT Products.id,Products.category_id,Products.supplier_id,Products.brand_id, Products.name, Products.price, Products.vat, Products.image_list, Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id AND Products.id = " + req.params.productId)
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                let details = result_data[0];
                sequelize.query("SELECT Products.id,Products.category_id,Products.supplier_id,Products.brand_id, Products.name, Products.price, Products.vat, Products.image_list, Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id AND Products.category_id = " + details.category_id)
                    .spread((results, metadata) => {
                        let data = GeneralController.getImageFilePath(results);
                        res.send({details: details, similar_products: data});
                    })
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});
            }
        })
    }

    //search product by keyword
    static searchProduct(req: Request, res: Response) {
        let result_data = [];
        let skipCount = (req.params.paginationCount - 1) * 10;
        sequelize.query("SELECT Products.id,Products.category_id,Products.supplier_id,Products.brand_id, Products.name, Products.price, Products.vat, Products.image_list, Products.rating,Products.in_cart, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id AND Products.name LIKE '%" + req.params.key + "%' LIMIT 10 OFFSET " + skipCount)
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (!err) {
                res.send({data: result_data, count: result_data.length, status: true});
            } else {
                res.send({data: result_data, count: result_data.length, status: false});
            }
        })

    }
}