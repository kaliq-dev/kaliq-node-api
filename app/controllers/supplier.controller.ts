/*
 * This controller handles all the request to /api/supplier
 *
 */
import {Router, Request, Response} from 'express';
export class SupplierController {
    constructor() {
    }

    static create(req: Request, res: Response) {
        let data = req.body;
        res.send({status: true});
    }
}