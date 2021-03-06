/*
 * All routes here startes with /api/supplier
 * This API handles all the funcitonalities related to SUPPLIER
 */
import {Request, Response, Router} from "express";
import {FileUploadController} from "../controllers/file-upload.controller";
import {SupplierController} from "../controllers/supplier.controller";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    SupplierController.readAll(req, res);
});

router.get('/id/:id', (req: Request, res: Response) => {
    SupplierController.getSupplierById(req, res);
});

router.post('/create', (req: Request, res: Response) => {
    SupplierController.create(req, res);
});

router.post('/upload-image', (req: Request, res: Response) => {
    FileUploadController.uploadFile(req, res);
});

router.put('/update/:id', (req: Request, res: Response) => {

});

router.delete('/delete/:id', (req: Request, res: Response) => {
    SupplierController.deleteById(req, res);
});

export const SupplierApiRoute: Router = router;