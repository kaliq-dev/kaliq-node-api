/*
 * All routes here startes with /api/category
 * This API handles all the funcitonalities related to CATEGORY
 */
import {Request, Response, Router} from "express";
import {FileUploadController} from "../controllers/file-upload.controller";
import {CategoryController} from "../controllers/category.controller";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {

});

router.get('/:id', (req: Request, res: Response) => {

});

router.post('/create', (req: Request, res: Response) => {
    CategoryController.create(req, res);
});

router.post('/upload-image', (req: Request, res: Response) => {
    FileUploadController.uploadFile(req, res);
});

router.put('/update/:id', (req: Request, res: Response) => {

});

router.delete('/delete/:id', (req: Request, res: Response) => {

});

export const CategoryApiRoute: Router = router;