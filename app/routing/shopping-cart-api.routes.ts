import {Router, Request, Response} from 'express';
const router: Router = Router();
import {ShoppingCartController} from '../controllers/shopping-cart.controller';

//get the shopping cart of a particular user
router.get('/get-shopping-cart/userId/:userId', (req: Request, res: Response) => {
    ShoppingCartController.getShoppingCart(req, res);
});

//create a new shopping cart for a user
router.post('/add-to-shopping-cart', (req: Request, res: Response) => {
    ShoppingCartController.addToShoppingCart(req, res);
});

//delete shopping cart
router.get('/delete-shopping-cart/:shoppingCartId', (req: Request, res: Response) => {

});

//delete an item from the cart of that user
router.get('/delete-item/productId/:productId/userId/:userId',(req: Request, res: Response)=>{
   ShoppingCartController.deleteFromCart(req,res);
});

export const ShoppingCartApiRoute: Router = router;





