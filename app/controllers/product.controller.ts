/*
 * This controller handles all the request to /api/product
 *
 */
import {sequelize} from "../database/db.config";
const Sequelize = require("sequelize");
const model = require("../../models");
import {Router, Request, Response} from "express";

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
                result_data = results;
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
}