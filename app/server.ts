import * as express from 'express';
import { WelcomeController } from './controllers';

const app: express.Application = express();
const port: number = process.env.PORT || 8080;

app.use('/welcome',WelcomeController);

app.listen(port, ()=>{
    console.log(`Listening at port :${port}`);
});