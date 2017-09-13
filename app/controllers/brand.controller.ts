/*
 * This controller handles all the request to /api/brand
 *
 */
const Sequelize = require("sequelize");
const model = require('../../models');
import * as fs from "fs";
import * as path from "path";
import {Router, Request, Response} from 'express';
import {GeneralController} from './general.controller';

export class BrandController {

    static BrandList = [
        {id:5,name:"3M",image_list:["3M-logo_400x400_acf_cropped.jpg"]},
        {id:6,name:"DULUX",image_list:["_____4638770.jpg"]},
        {id:7,name:"DEWALT",image_list:["Dewalt.jpg"]},
        {id:8,name:"MAKITA",image_list:["Makita.jpg"]},
        {id:9,name:"HILLMAN",image_list:["twcc404b_400x400.png"]},
        {id:10,name: "BLACK+DECKER",image_list:["blackdecker-brand.gif"]}
    ]

    constructor() {
    }

    static getBrandById(req: Request, res: Response) {
        model.Brand.findOne({
            where: {
                id: req.params.id
            }
        }).then((brand) => {
            if (brand) {
                res.send({data: brand, status: true});
            } else {
                res.send({data: {}, status: false});
            }
        }).catch((err) => {
            res.send({data: {}, status: false});
        });
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
        let result_data = [];
        model.Brand.findAll({
            attributes: ['id', 'name', 'image_list', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        }).then((brand) => {
            result_data = GeneralController.getImageFilePath(brand);
            // result_data = GeneralController.getBase64Image(brand);
            return res.send({data: result_data, count: result_data.length, status: true});
        }).catch((err) => {
            if (err) {
                result_data = [];
                return res.send({data: result_data, count: result_data.length, status: false});
            }
        });
    }

    static deleteById(req: Request, res: Response) {
        model.Brand.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.send({status: true});
        }).catch((err) => {
            res.send({status: false});
        });
    }

    static getBrandByCategory(req:Request, res:Response){
        let category_id = req.params.categoryId;
    }
}