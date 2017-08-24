/*
 * This controller handles all the request to /api/product
 *
 */
import {sequelize} from "../database/db.config";
const Sequelize = require("sequelize");
const model = require("../../models");
import {Router, Request, Response} from 'express';
import * as path from "path";
import * as fs from "fs";
import * as _ from "underscore";
import * as async from "async";

import {GeneralController} from './general.controller';


//REDIS -----
// const PORT = process.env.PORT;
// const redis = require('redis');
// const REDIS_PORT = process.env.REDIS_PORT;
// const client = redis.createClient(REDIS_PORT);


export class ProductController {
    constructor() {
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
        sequelize.query("SELECT Products.id, Products.name, Products.price, Products.vat, Products.image_list, Suppliers.name AS supplier_name, Brands.name as brand_name, Categories.name AS category_name FROM Products, Suppliers, Brands, Categories WHERE Products.supplier_id = Suppliers.id AND Products.category_id = Categories.id AND Products.brand_id = Brands.id ORDER BY Products.createdAt DESC")
            .spread((results, metadata) => {
                // result_data = GeneralController.getBase64Image(results);
                // client.setex('products',3600,result_data);
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

}