import * as express from 'express';
import {ApiRoute} from './routing/api.routes';
import {BrandApiRoute} from "./routing/brand-api.routes";
var bodyParser = require('body-parser');

const app: express.Application = express();
const port: number = process.env.PORT || 5000;

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// api router endpoint
app.use('/api', ApiRoute);
app.use('/api/brand', BrandApiRoute);

app.listen(port, () => {
    console.log(`Listening at port :${port}`);
});