/*
 * All routes here startes with /api/brand/
 * This API handles all the functionalities related to BRAND
 */
import {Router, Request, Response} from 'express';
import {FileUploadController} from '../controllers/file-upload.controller';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {

});

router.get('/:id', (req: Request, res: Response) => {

});

router.post('/create', (req: Request, res: Response) => {
    FileUploadController.uploadFile(req, res);
});

router.put('/update/:id', (req: Request, res: Response) => {

});

router.delete('/delete/:id', (req: Request, res: Response) => {

});


export const BrandApiRoute: Router = router;