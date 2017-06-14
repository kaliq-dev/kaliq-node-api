/*
 * This controller handles all the request to /api/category
 *
 */
import {Router, Request, Response} from 'express';
export class CategoryController {
    constructor() {
    }

    static create(req: Request, res: Response) {
        let data = req.body;
        res.send({status: true});
    }
}