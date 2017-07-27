/*
 * Controller to handle request to /home
 */

import {Router, Request, Response} from 'express';

export class HomeController {
    constructor() {
    }

    static getHome(req: Request, res: Response): Response {
        return res.send("Welcome To API Home !!");
    }
}