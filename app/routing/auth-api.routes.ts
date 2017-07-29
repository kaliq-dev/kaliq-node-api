import {Router, Request, Response} from 'express';
import {AuthController} from '../controllers/auth.controller';
const router: Router = Router();

router.post('/register', (req: Request, res: Response) => {
    AuthController.register(req, res);
});

router.post('/login', (req: Request, res: Response) => {
    AuthController.login(req, res);
});

export const AuthApiRoute: Router = router;