/*
*   all API routes are defined here
*/
import { Router, Request, Response } from 'express';
import { HomeController } from '../controllers/home.controller';

const router: Router = Router();
// instantiating controllers
let homeController = new HomeController();

/*
* API endpoints are defined here 
* all routes start with /api
*/
router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to API routes");
});

router.get('/home', (req: Request, res: Response) => {
    homeController.getHome(req, res);
});

router.get('/home/person',(req:Request, res:Response) => {
    homeController.getPerson(req,res);
});



export const ApiRoute: Router = router;
