import { Router, Request, Response } from 'express';
const router: Router = Router();

router.get('/',(req:Request, res: Response)=>{
	res.send("Hello World !!");
});

router.get('/:name',(req: Request, res:Response)=>{
	let { name } = req.params;
	res.send(`Hello, ${name}`);
});

router.get('/my/new',(req:Request, res:Response)=>{
	res.send("This is New");
});

export const WelcomeController: Router = router;