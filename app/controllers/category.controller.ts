/*
 * This controller handles all the request to /api/category
 *
 */
import {sequelize} from "../database/db.config";
const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';
import * as _ from 'underscore';
import * as async from 'async';
import {GeneralController} from './general.controller';
import {BrandController} from './brand.controller';

// const redis = require('redis');
const brandList = BrandController.BrandList;

export class CategoryController {
    //
    // static essentialCategoryBrandList = [
    //     {id:1,category_id:, brand_id:},
    //     {id:1,category_id:, brand_id:},
    //     {id:1,category_id:, brand_id:},
    //     {id:1,category_id:, brand_id:},
    //     {id:1,category_id:, brand_id:},
    //     {id:1,category_id:, brand_id:},
    //     {id:1,category_id:, brand_id:},
    // ]

    constructor() {
    }

    static getCategoryById(req: Request, res: Response) {
        model.Category.findOne({
            where: {
                id: req.params.id
            }
        }).then((category) => {
            if (category) {
                res.send({data: category, status: true});
            } else {
                res.send({data: {}, status: false});
            }
        }).catch((err) => {
            res.send({data: {}, status: false});
        });
    }

    static create(req: Request, res: Response) {
        let data = req.body;
        model.Category.create({
            name: data['name'],
            parent: data['parentCategory'],
            image_list: data['categoryImage'],
            sub_category: data['subCategory']
        }).then((category) => {
            res.send({data: category});
        }).catch((err) => {
            res.send({status: false});
        })
    }

    static readAll(req: Request, res: Response) {
        let result_data = [];

        function callback() {
            console.log("callback");
        }

        function newcallback() {
            console.log("callback");
        }

        sequelize.query("SELECT C1.id, C1.name, C1.parent,C1.image_list, C1.sub_category, C1.createdAt, C1.updatedAt, C2.name AS parent_name FROM Categories C1, Categories C2 WHERE C1.parent=C2.id ORDER BY C1.createdAt DESC")
            .spread((results, metadata) => {
                result_data = results;
                async.each(results, function (data, callback) {
                    let category = data;
                    category["sub_category_list"] = [];
                    if (!_.isEmpty(data['sub_category'])) {
                        async.each(data['sub_category'], function (item, newcallback) {
                            // database query here
                            model.Category.findById(item).then((sub_category) => {
                                if (_.isUndefined(sub_category) || _.isEmpty(sub_category)) {
                                    // console.log("No sub-category");
                                } else {
                                    // console.log(sub_category);
                                    category["sub_category_list"].push(sub_category['dataValues']);
                                }
                            }).then(() => {
                                newcallback();
                            });
                        }, function (err) {
                            if (err) {
                                // console.log("error in all sub-category");
                            } else {
                                callback();
                                // console.log("Read all sub-category data");
                            }
                        });
                    } else {
                        callback();
                    }
                }, function (err) {
                    if (err) {
                        // console.log("Error in data");
                        res.send({data: result_data, count: result_data.length, status: false});
                    } else {
                        // console.log("All data read");
                        // result_data = GeneralController.getBase64Image(result_data);
                        result_data = GeneralController.getImageFilePath(result_data);
                        res.send({data: result_data, count: result_data.length, status: true});
                    }
                });
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
        model.Category.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.send({status: true});
        }).catch((err) => {
            res.send({status: false});
        });
    }

    static getEssentialCategory(req: Request, res: Response) {
        let result_data = [];
        let price = 100;
        sequelize.query("SELECT * FROM Categories WHERE id IN (6,31,29,5,28,35)")
            .spread((results, metadata) => {
                result_data = GeneralController.getImageFilePath(results);
                result_data['data'] = result_data.map((item)=>{
                    item['price'] = price;
                    price += 150;
                });
                res.send({data: result_data, count: result_data.length, status: true});
            }).catch((err) => {
            if (err) {
                res.send({data: result_data, count: result_data.length, status: false});
            } else {
                res.send({data: result_data, count: result_data.length, status: true});
            }
        })
    }

}