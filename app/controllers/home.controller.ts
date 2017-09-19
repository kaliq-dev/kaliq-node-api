/*
 * Controller to handle request to /home
*/

import {Router, Request, Response} from 'express';
import {BrandController} from './brand.controller';

const brandList = BrandController.BrandList;

export class HomeController {

    static essentialCategoryPrice = [
        {id: 5, price: 100},
        {id: 6, price: 250},
        {id: 28, price: 400},
        {id: 29, price: 550},
        {id: 31, price: 700}
    ];

    static TypeList = [
        {id:1,name:"Fine",price:120},
        {id:2,name:"Boulder",price:200},
        {id:3,name:"Plaster",price:400},
        {id:4,name:"TMT",price:620},
        {id:5,name:"RCC",price:820},
        {id:6,name:"PCC",price:920}
    ];

    static GradeList = [
        {id:1,name:"6-40mm",price: 100},
        {id:2,name:"A",price: 150},
        {id:3,name:"A+",price: 200},
        {id:4,name:"24sqm",price: 250},
        {id:5,name:"48sqm",price: 300},
        {id:6,name:"4T",price: 350},
        {id:7,name:"2T",price: 400},
        {id:8,name:"1T",price: 450}
    ];

    static PackageList = [
        {id:1,name:"10TON",price: 10},
        {id:2,name:"15KG",price: 20},
        {id:3,name:"25TON",price: 30},
        {id:4,name:"50KG",price: 40},
        {id:5,name:"100KG",price: 50},
        {id:6,name:"5 TON",price: 60}
    ];

    constructor() {
    }

    static getHome(req: Request, res: Response): Response {
        return res.send("Welcome To API Home !!");
    }

    static getTypeList(req: Request, res: Response){
        res.send({data:HomeController.TypeList,count:HomeController.TypeList.length,status:true});
    }

    static getGradeList(req: Request, res: Response){
        res.send({data:HomeController.GradeList,count:HomeController.GradeList.length,status:true});
    }

    static getPackageList(req: Request, res: Response){
        res.send({data:HomeController.PackageList,count:HomeController.PackageList.length,status:true});
    }

    static getTotalPrice(req: Request, res: Response){
        let totalPrice = 0;

        HomeController.essentialCategoryPrice.forEach((item)=>{
            if(item.id == req.params.categoryId){
                totalPrice = req.params.quantity * item.price;
            }
        });

        brandList.forEach((item)=> {
            if (item.id == req.params.brandId) {
                totalPrice += item.price;
            }
        });

        HomeController.TypeList.forEach((item)=>{
            if(item.id == req.params.typeId){
                totalPrice += item.price;
            }
        });

        HomeController.GradeList.forEach((item)=>{
            if(item.id == req.params.gradeId){
                totalPrice += item.price;
            }
        });

        HomeController.PackageList.forEach((item)=>{
            if(item.id == req.params.packageId){
                totalPrice += item.price;
            }
        });

        res.send({total_price: totalPrice, status:true});
    }
}