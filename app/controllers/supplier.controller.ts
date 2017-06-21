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
        model.Supplier.findAll({
            attributes: ['id', 'name', 'contact_no', 'email', 'attachment_list', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        }).then((supplier) => {
            return res.send({data: supplier});
        }).catch((err) => {
            return res.send({status: false});
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