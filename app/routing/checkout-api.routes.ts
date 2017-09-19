/*
 API endpoint for checkout
*/
import {Router, Request, Response} from 'express';
import {CheckoutController} from '../controllers/checkout.controller';
const router: Router = Router();

router.post('/',(req:Request,res:Response)=>{
    CheckoutController.setCheckout(req,res);
});

router.get('/order/id/:id',(req:Request,res:Response)=>{
    CheckoutController.getOrderById(req,res);
});

export const CheckoutApiRoute: Router = router;