import {Router, Request, Response} from 'express';
const router: Router = Router();
import {CartController} from "../controllers/cart.controller";

//add a product list against a userId in shopping cart
router.post('/add-to-cart', (req: Request, res: Response) => {
    CartController.addToCart(req, res);
});

//get a product list against a userId
router.get('/get-cart', (req: Request, res: Response) => {
    CartController.getCart(req, res);
});

export const CartApiRoute: Router = router;