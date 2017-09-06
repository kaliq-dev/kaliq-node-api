/*
 * This controller handles all the request to /api/supplier
 *
 */
const Sequelize = require("sequelize");
const model = require('../../models');
import {Router, Request, Response} from 'express';
export class SupplierController {

    constructor() {
    }

    static getSupplierById(req: Request, res: Response){
        model.Supplier.findOne({
            where: {
                id: req.params.id
            }
        }).then((supplier) => {
            if (supplier) {
                res.send({data: supplier, status: true});
            } else {
                res.send({data: {}, status: false});
            }
        }).catch((err) => {
            res.send({data: {}, status: false});
        });
    }

    static create(req: Request, res: Response) {
        let data = req.body;
        model.Supplier.create({
            name: data['name'],
            contact_no: data['contact_no'],
            email: data['email'],
            attachment_list: data['supplierAttachmentList']
        }).then((supplier) => {
            res.send({data: supplier});
        }).catch((err) => {
            res.send({status: false});
        })
    }


    static readAll(req: Request, res: Response) {
        let result_data = [];
        model.Supplier.findAll({
            attributes: ['id', 'name', 'contact_no', 'email', 'attachment_list', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        }).then((supplier) => {
            result_data = supplier;
            return res.send({data: result_data, count: result_data.length, status: true});
        }).catch((err) => {
            return res.send({data: result_data, count: result_data.length, status: false});

        })
    }

    static deleteById(req: Request, res: Response) {
        model.Supplier.destroy({
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