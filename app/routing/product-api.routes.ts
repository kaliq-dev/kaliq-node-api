/*
 * All routes here startes with /api/product/
 * This API handles all the functionalities related to PRODUCT
 */
import {Router, Request, Response} from 'express';
import {FileUploadController} from '../controllers/file-upload.controller';
import {ProductController} from '../controllers/product.controller';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {

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

});

export const ProductApiRoute: Router = router;