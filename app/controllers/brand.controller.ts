/*
 * This controller handles all the request to /api/brand
 *
 */
const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';

export class BrandController {
    constructor() {
    }

    static create(req: Request, res: Response) {
        let data = req.body;
        model.Brand.create({
            name: data['name'],
            image_list: data['brandImageList']
        }).then((brand) => {
            res.send({data: brand});
        }).catch((err) => {
            res.send({status: false});
        });
    }


    static readAll(req: Request, res: Response) {
        model.Brand.findAll({
            attributes: ['id', 'name', 'image_list', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        }).then((brand) => {
            return res.send({data: brand});
        }).catch((err) => {
            return res.send({status: false});
        })
    }
}