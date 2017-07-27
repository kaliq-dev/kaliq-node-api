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

var bodyParser = require("body-parser");

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
app.use('/api/supplier', SupplierApiRoute);
app.use('/api/category', CategoryApiRoute);
app.use('/api/product', ProductApiRoute);


//test base64 imgae read
app.get('/read-img', (req, res) => {

    let imgPath = path.join(__dirname, '..', '..', 'uploads', '1.jpg');

    fs.readFile(imgPath, (err, data) => {

        if (err) res.status(500).send(err);

        let ext = path.extname(imgPath);

        let base64Image = new Buffer(data, 'binary').toString('base64');

        let imgSrcString = `data:image/${ext.split('.').pop()};base64,${base64Image}`;

        res.send({img: imgSrcString});
    });
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


app.listen(port, () => {
    // readImageFiles();
    console.log(`Listening at port :${port}`);
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully');
        })
        .catch((err) => {
            console.log("Unable to connect to datbase", err);
        })
});

