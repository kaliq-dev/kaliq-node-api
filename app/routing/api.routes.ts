/*
 * API endpoints are defined here
 * all routes start with /api/
 * This is for API test endpoints
*/

import {Router, Request, Response} from 'express';
import {HomeController} from '../controllers/home.controller';

const router: Router = Router();


router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to API routes");
});

router.get('/home', (req: Request, res: Response) => {
    HomeController.getHome(req, res);
});

export const ApiRoute: Router = router;
