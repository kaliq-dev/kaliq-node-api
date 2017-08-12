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

router.get('/', (req: Request, res: Response) => {
    ProductController.readAll(req, res);
});

router.get('/:id', (req: Request, res: Response) => {

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


export const ProductApiRoute: Router = router;