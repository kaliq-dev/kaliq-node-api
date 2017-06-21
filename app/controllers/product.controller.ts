/*
 * This controller handles all the request to /api/product
 *
 */
import {Router, Request, Response} from 'express';
export class ProductController {
    constructor() {
    }

    static create(req: Request, res: Response) {
        let data = req.body;
        res.send({status: true});
    }

}