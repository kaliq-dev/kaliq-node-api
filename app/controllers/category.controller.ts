/*
 * This controller handles all the request to /api/category
 *
 */
import {sequelize} from "../database/db.config";
const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';
export class CategoryController {
    constructor() {
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
        sequelize.query("SELECT C1.id, C1.name, C1.parent,C1.image_list, C1.sub_category, C1.createdAt, C1.updatedAt, C2.name AS parent_name FROM Categories C1, Categories C2 WHERE C1.parent=C2.id ORDER BY C1.createdAt DESC")
            .spread((results, metadata) => {
                return res.send({data: results});
            })
    }

}