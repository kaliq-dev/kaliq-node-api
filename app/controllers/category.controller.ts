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
import {version} from "punycode";

// const redis = require('redis');
const brandList = BrandController.BrandList;

export class CategoryController {

    //essential category's brand list
    static essentialCategoryBrandList = [
        {id:1,category_id:5, brand_id:5},
        {id:2,category_id:5, brand_id:6},
        {id:3,category_id:5, brand_id:7},
        {id:4,category_id:5, brand_id:8},
        {id:5,category_id:6, brand_id:9},
        {id:6,category_id:6, brand_id:10},
        {id:7,category_id:28, brand_id:5},
        {id:8,category_id:28, brand_id:6},
        {id:9,category_id:28, brand_id:7},
        {id:10,category_id:28, brand_id:10},
        {id:11,category_id:28, brand_id:9},
        {id:12,category_id:28, brand_id:8},
        {id:13,category_id:28, brand_id:7},
        {id:14,category_id:28, brand_id:6},
        {id:15,category_id:28, brand_id:5},
        {id:16,category_id:29, brand_id:5},
        {id:17,category_id:29, brand_id:6},
        {id:18,category_id:29, brand_id:7},
        {id:19,category_id:29, brand_id:10},
        {id:20,category_id:31, brand_id:10},
        {id:21,category_id:31, brand_id:9},
        {id:22,category_id:31, brand_id:5},
        {id:23,category_id:31, brand_id:6}
    ];


    static subCategoryList = [
        {id:1,name: "OPC",parent_category_id:6},
        {id:2,name:"RHC",parent_category_id:6},
        {id:3,name:"Holcim",parent_category_id:6},
        {id:4,name:"Cemex",parent_category_id:6},
        {id:5,name:"HeidelbergCement",parent_category_id:6},
        {id:6,name:"UltraTech",parent_category_id:6},
        {id:7,name:"Buzzi",parent_category_id:6},
        {id:8,name:"6-40 mm TMT Bars",parent_category_id:31},
        {id:9,name:"HSD Steel Bars",parent_category_id:31},
        {id:10,name:"ArcelorMittal",parent_category_id:31},
        {id:11,name:"Star Steel",parent_category_id:31},
        {id:12,name:"Qatar Steel",parent_category_id:31},
        {id:13,name:"Crushed Washed Sand",parent_category_id:29},
        {id:14,name:"Crushed Unwashed Sand",parent_category_id:29},
        {id:15,name:"Natural Washed Sand",parent_category_id:29},
        {id:16,name:"Plaster Sand",parent_category_id:29},
        {id:17,name:"Hollow Blocks",parent_category_id:8},
        {id:18,name:"Solid Blocks",parent_category_id:8},
        {id:19,name:"Insulated Blocks",parent_category_id:8},
        {id:20,name:"Thermal Blocks",parent_category_id:8},
        {id:21,name:"Roof Tiles",parent_category_id:8},
        {id:22,name:"50 to 5000 SQM",parent_category_id:28},
        {id:23,name:"Thick",parent_category_id:28},
        {id:24,name:"Medium",parent_category_id:28},
        {id:25,name:"Light",parent_category_id:28},
        {id:26,name:"Gypsum Boards & Drywall",parent_category_id:35},
        {id:27,name:"Hardboard and Thin MDF",parent_category_id:35},
        {id:28,name:"Softwood Lumber",parent_category_id:35},
        {id:29,name:"Plywood",parent_category_id:35},
        {id:30,name:"Doors",parent_category_id:35},
        {id:31,name:"Decore",parent_category_id:35},
        {id:32,name:"Tapes",parent_category_id:4},
        {id:33,name:"Sealants",parent_category_id:4},
        {id:34,name:"Adhesives & Glues",parent_category_id:4},
        {id:35,name:"Cyanoacrylate Adhesives",parent_category_id:4},
        {id:36,name:"Switches",parent_category_id:11},
        {id:37,name:"Sockets",parent_category_id:11},
        {id:38,name:"Plugs and Connectors",parent_category_id:11},
        {id:39,name:"Cable Accessories",parent_category_id:11},
        {id:40,name:"Inverters",parent_category_id:11},
        {id:41,name:"Safety Gloves",parent_category_id:11},
        {id:42,name:"CC CAM Solutions",parent_category_id:30},
        {id:43,name:"Fire Alarm Systems",parent_category_id:30},
        {id:44,name:"Industrial Workwear",parent_category_id:30},
        {id:45,name:"Safety Kit",parent_category_id:30},
        {id:46,name:"Anti-Static & Esd Equipment",parent_category_id:30},
    ];

    constructor() {
    }


    static getBrandListByCategory(req:Request,res:Response){
        let newData = [];

        let result_list = _.filter(CategoryController.essentialCategoryBrandList,(item)=>{
            return item['category_id'] == req.params.categoryId;
        });

        _.each(result_list,(item)=>{
            let data = _.find((brandList),(el)=>{
                return el['id'] == item['brand_id'];
            });
            item['brand_details'] = data;
            newData.push(item);
        });

        if(newData.length > 0){
            res.send({data:newData,count:newData.length,status:true});
        }else{
            res.send({data:newData,count:newData.length,status:false});
        }
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
        sequelize.query("SELECT * FROM Categories WHERE id IN (6,31,29,5,28)")
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