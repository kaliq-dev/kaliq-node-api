import {Router, Request, Response} from 'express';
import {AuthController} from '../controllers/auth.controller';

// const passportService = require('./config/passport');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('jwt', {session: false});

const router: Router = Router();

router.post('/register', (req: Request, res: Response) => {
    AuthController.register(req, res);
});

router.post('/login', requireLogin, (req: Request, res: Response) => {
    AuthController.login(req, res);
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/authenticate', (req: Request, res: Response) => {
    AuthController.authenticate(req,res);
});




export const AuthApiRoute: Router = router;