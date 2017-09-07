/*
 * All routes here startes with /api/product/
 * This API handles all the functionalities related to PRODUCT
 */
import {Router, Request, Response} from 'express';
import {FileUploadController} from '../controllers/file-upload.controller';
import {ProductController} from '../controllers/product.controller';

const router: Router = Router();

// const PORT = process.env.PORT;
// const redis = require('redis');
// const REDIS_PORT = process.env.REDIS_PORT;
// const client = redis.createClient(REDIS_PORT);

// function cache(req, res, next) {
//     client.get("products", (err, result_data) => {
//         if (err) throw err;
//         if (result_data != null) {
//             result_data = JSON.parse(result_data);
//             result_data.map((item) => {
//                 console.log(item);
//             })
//
//
//             res.send({data: result_data});
//             // res.send({data: result_data, count: result_data.length, status: true});
//         } else {
//             next();
//         }
//     });
// }

router.get('/page/:paginationCount', (req: Request, res: Response) => {
    ProductController.readAll(req, res);
});


router.get("/new-products", (req: Request, res: Response) => {
    ProductController.getNewProducts(req, res);
});

router.get("/recommended-products", (req: Request, res: Response) => {
    ProductController.getRecommendedProducts(req, res);
});

router.get("/featured-products", (req: Request, res: Response) => {
    ProductController.getFeaturedProducts(req, res);
});

router.get("/popular-products", (req: Request, res: Response) => {
    ProductController.getFeaturedProducts(req, res);
});

router.get("/new-arrival-products", (req: Request, res: Response) => {
    ProductController.getNewArrivalProducts(req, res);
});

router.get('/id/:id', (req: Request, res: Response) => {
    ProductController.getProductById(req, res);
});

router.post('/create', (req: Request, res: Response) => {
    ProductController.create(req, res);
});

router.post('/upload-image', (req: Request, res: Response) => {
    FileUploadController.uploadFile(req, res);
})

router.put('/update/:id', (req: Request, res: Response) => {

});

router.delete('/delete/:id', (req: Request, res: Response) => {
    ProductController.deleteById(req, res);
});

//filter api endpoints
router.post("/filter-by-category", (req: Request, res: Response) => {
    ProductController.filterByCategory(req, res);
});

router.post("/filter-by-brand", (req: Request, res: Response) => {
    ProductController.filterByBrand(req, res);
});

router.post("/filter-by-supplier", (req: Request, res: Response) => {
    ProductController.filterBySupplier(req, res);
});

//favourite product API endpoint
router.post("/set-favourite", (req: Request, res: Response) => {
    ProductController.setFavourite(req, res);
});

router.get("/get-favourite/userId/:userId/page/:paginationCount", (req: Request, res: Response) => {
    ProductController.getFavouriteList(req, res);
});

//get product by category
router.get("/get-product-by-category/:categoryId", (req: Request, res: Response) => {
    ProductController.getProductByCategory(req, res);
});

//get product details
router.get("/product-details/:productId", (req: Request, res: Response) => {
    ProductController.getProductDetails(req, res);
});

//search product api
router.get("/search/:key/:paginationCount", (req: Request, res: Response) => {
    ProductController.searchProduct(req, res);
});

//set rating of a product by a user
router.post("/set-rating", (req: Request, res: Response) => {
    ProductController.setRating(req,res);
});

export const ProductApiRoute: Router = router;