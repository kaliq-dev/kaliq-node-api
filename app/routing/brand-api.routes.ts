/*
 * All routes here startes with /api/brand/
 * This API handles all the functionalities related to BRAND
 */
import {Router, Request, Response} from 'express';
import {FileUploadController} from '../controllers/file-upload.controller';
import {BrandController} from "../controllers/brand.controller";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    BrandController.readAll(req, res);
});

router.get('/id/:id', (req: Request, res: Response) => {
    BrandController.getBrandById(req, res);
});

router.post('/create', (req: Request, res: Response) => {
    BrandController.create(req, res);
});

router.post('/upload-image', (req: Request, res: Response) => {
    FileUploadController.uploadFile(req, res);
});

router.put('/update/:id', (req: Request, res: Response) => {

});

router.delete('/delete/:id', (req: Request, res: Response) => {
    BrandController.deleteById(req, res);
});


export const BrandApiRoute: Router = router;