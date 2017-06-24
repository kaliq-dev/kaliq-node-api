/*
 * This controller handles all the request to /api/product
 *
 */
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
        let result_data;
        model.Product.findAll({
            include: [model.Supplier]
        }).then((product) => {
            return res.send({data: product);
        }).catch((err) => {
            return res.send({status: false});
        });
    }
}