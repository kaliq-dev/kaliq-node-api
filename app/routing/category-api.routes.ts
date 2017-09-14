/*
 * All routes here startes with /api/category
 * This API handles all the funcitonalities related to CATEGORY
 */
import {Request, Response, Router} from "express";
import {FileUploadController} from "../controllers/file-upload.controller";
import {CategoryController} from "../controllers/category.controller";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    CategoryController.readAll(req, res);
});

router.get('/id/:id', (req: Request, res: Response) => {
    CategoryController.getCategoryById(req, res);
});

//essential category list
router.get('/essentials', (req: Request, res: Response) => {
    CategoryController.getEssentialCategory(req, res);
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
    CategoryController.deleteById(req, res);
});

//get brand list by essential category id
router.get('/brand-list/:categoryId',(req: Request, res: Response)=>{
    CategoryController.getBrandListByCategory(req,res);
});

export const CategoryApiRoute: Router = router;