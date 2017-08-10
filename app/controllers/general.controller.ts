const Sequelize = require("sequelize");
const model = require('../../models');
import * as fs from "fs";
import * as path from "path";
import {Router, Request, Response} from 'express';


export class GeneralController{

    constructor(){}

    static getBase64Image(data:any){
        let pattern = " ",
            re = new RegExp(pattern, "g");
        data.map((item, index) => {
            item.image_list = item.image_list.map((item) => {
                let newFilename = item.replace(re, '_');
                let imgPath = path.join(__dirname,'..' , '..', '..', 'uploads', newFilename);
                let ext = path.extname(imgPath);
                let data = fs.readFileSync(imgPath);
                let base64Image = new Buffer(data, 'binary').toString('base64');
                let imgSrcString = `data:image/${ext.split('.').pop()};base64,${base64Image}`;
                return imgSrcString;
            });
            return item;
        });
        return data;
    }

}