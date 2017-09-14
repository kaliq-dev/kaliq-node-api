const Sequelize = require("sequelize");
const model = require('../../models');
const config = require('../config/main');
import {Router, Request, Response} from 'express';


export class RegionController {

    static CountryList = [
        {id: 1,name: "Oman"}
    ];

    static RegionList = [
        {id: 1,country_id: 1, name: "Ad Dakhiliyah"},
        {id: 2,country_id: 1, name: "Ad Dhahirah"},
        {id: 3,country_id: 1, name: "Al Batinah North"},
        {id: 4,country_id: 1, name: "Al Batinah South"},
        {id: 5,country_id: 1, name: "Al-Musannah"},
        {id: 6,country_id: 1, name: "Al Buraimi"},
        {id: 7,country_id: 1, name: "Al Wusta"},
        {id: 8,country_id: 1, name: "Ash Sharqiyah North"},
        {id: 9,country_id: 1, name: "Ash Sharqiyah South"},
        {id: 10,country_id: 1, name: "Dhofar"},
        {id: 11,country_id: 1, name: "Masqat"},
        {id: 12,country_id: 1, name: "Musandam"}
    ];

    static CityList = [
        {id: 1,region_id:1,name:"Nizwa"},
        {id: 2,region_id:1,name:"Samail"},
        {id: 3,region_id:1,name:"Bahla"},
        {id: 4,region_id:1,name:"Adam"},
        {id: 5,region_id:1,name:"Al Hamra"},
        {id: 6,region_id:1,name:"Manah"},
        {id: 7,region_id:1,name:"Izki"},
        {id: 8,region_id:1,name:"Bid Bid"},
        {id: 9,region_id:2,name:"Ibri"},
        {id: 10,region_id:2,name:"Yanqul"},
        {id: 11,region_id:2,name:"Dhank"},
        {id: 12,region_id:3,name:"Sohar"},
        {id: 13,region_id:3,name:"Shinas"},
        {id: 14,region_id:3,name:"Liwa"},
        {id: 15,region_id:3,name:"Saham"},
        {id: 16,region_id:3,name:"Al Khaboura"},
        {id: 17,region_id:3,name:"Suwayq"},
        {id: 18,region_id:4,name:"Rustaq"},
        {id: 19,region_id:4,name:"Al Awabi"},
        {id: 20,region_id:4,name:"Nakhal"},
    ];

    constructor(){}

    static getCountryList(req:Request,res:Response){
         res.send({country_list:RegionController.CountryList,count: RegionController.CountryList.length,status:true});
    }

    static getRegionListByCountry(req:Request,res:Response){
        let region_list = [];
        RegionController.RegionList.map((item)=>{
            if(item['country_id'] == req.params.countryId){
                region_list.push(item);
            }
        });

        res.send({region_list: region_list,count: region_list.length,status:true});
    }

    static getCityListByRegion(req:Request,res:Response){
        let city_list = [];
        RegionController.CityList.map((item)=>{
            if(item['region_id'] == req.params.regionId){
                city_list.push(item);
            }
        });
        res.send({city_list:city_list,count: city_list.length,status:true});
    }
}