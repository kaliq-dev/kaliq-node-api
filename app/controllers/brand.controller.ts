/*
 * This controller handles all the request to /api/brand
 *
 */
import {Router, Request, Response} from 'express';
export class BrandController {
    constructor() {
    }

    static create(req: Request, res: Response) {
        let data = req.body;
        res.send(req.body);
    }
}