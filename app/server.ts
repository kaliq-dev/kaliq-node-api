import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import * as chokidar from "chokidar";
import {sequelize} from "./database/db.config";

import {ApiRoute} from "./routing/api.routes";
import {BrandApiRoute} from "./routing/brand-api.routes";
import {SupplierApiRoute} from "./routing/supplier-api.routes";
import {CategoryApiRoute} from "./routing/category-api.routes";
import {ProductApiRoute} from "./routing/product-api.routes";
import {AuthApiRoute} from "./routing/auth-api.routes";
import {ShoppingCartApiRoute} from "./routing/shopping-cart-api.routes";
import {RegionApiRoute} from "./routing/region-api.routes";

const bodyParser = require("body-parser");
const config = require('./config/main');
const logger = require('morgan');
const passport = require('passport');

const app: express.Application = express();

// Log requests to API using morgan
app.use(logger('dev'));
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//for serving static files
app.use('/static', express.static(path.join(__dirname, '..', '..', 'uploads')))

app.use(passport.initialize());
require('./config/passport')(passport);

// api router endpoint
app.use('/api', ApiRoute);
app.use('/api/brand', BrandApiRoute);
app.use('/api/supplier', SupplierApiRoute);
app.use('/api/category', CategoryApiRoute);
app.use('/api/product', ProductApiRoute);
app.use('/api/auth', AuthApiRoute);
app.use('/api/cart', ShoppingCartApiRoute);
app.use('/api/region',RegionApiRoute);
/*
app.use('/api/cart',CartApiRoute);
*/
//testing JWT token with passport
app.get('/api/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});
//test base64 imgae read
app.post('/api/get-base64-images', (req, res) => {

    let pattern = " ",
        re = new RegExp(pattern, "g");
    let productList = req.body.data;

    let newProductList = productList.map((product, index) => {
        product.image_list = product.image_list.map((item) => {
            let newFilename = item.replace(re, '_');
            let imgPath = path.join(__dirname, '..', '..', 'uploads', newFilename);
            let ext = path.extname(imgPath);
            let data = fs.readFileSync(imgPath);
            let base64Image = new Buffer(data, 'binary').toString('base64');
            let imgSrcString = `data:image/${ext.split('.').pop()};base64,${base64Image}`;
            return imgSrcString;
        });
        return product;
    });
    res.send({data: productList});
});

function readImageFiles() {
    let uploadDir = path.join(__dirname, '..', '..', 'uploads');
    let pattern = " ",
        re = new RegExp(pattern, "g");
    fs.readdir(uploadDir, (err, filenames) => {
        if (err) throw err;
        filenames.forEach((file) => {
            let newFilename = file.replace(re, '_');
            let oldPath = path.join(__dirname, '..', '..', 'uploads', file);
            let newPath = path.join(__dirname, '..', '..', 'uploads', newFilename);
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log("renamed complete");
            });
        });
    });
}


app.listen(config.port, () => {
    // readImageFiles();
    console.log(`Listening at port :${config.port}`);
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully');
        })
        .catch((err) => {
            console.log("Unable to connect to datbase", err);
        })
});

