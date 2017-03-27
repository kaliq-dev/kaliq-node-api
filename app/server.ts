import * as express from 'express';
import { ApiRoute } from './routing/api.routes';

const app: express.Application = express();
const port: number = process.env.PORT || 8080;

// api router endpoint
app.use('/api',ApiRoute);


app.listen(port, ()=>{
    console.log(`Listening at port :${port}`);
});