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

router.get('/type-list/:categoryId/:brandId',(req: Request, res: Response)=>{
    HomeController.getTypeList(req,res);
});

router.get('/grade-list/:categoryId/:brandId/:typeId',(req: Request, res: Response)=>{
    HomeController.getGradeList(req,res);
});

router.get('/package-list/:categoryId/:brandId/:typeId/:gradeId',(req: Request, res: Response)=>{
    HomeController.getPackageList(req,res);
});

router.get('/get-total-price/:categoryId/:brandId/:typeId/:gradeId/:packageId/:quantity',(req: Request, res: Response)=>{
   HomeController.getTotalPrice(req,res);
});


export const ApiRoute: Router = router;
