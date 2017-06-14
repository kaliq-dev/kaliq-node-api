import * as path from "path";
import * as fs from "fs";
import * as Busboy from "busboy";

import {Request, Response, Router} from "express";

export class FileUploadController {
    static uploadFile(req: Request, res: Response) {
        let busboy = new Busboy({headers: req.headers});

        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var saveTo = path.join(__dirname, '../../../','uploads', path.basename(filename));
            file.pipe(fs.createWriteStream(saveTo));
        });

        busboy.on('finish', function () {
            res.writeHead(200, {'Connection': 'close'});
            res.end("File uploaded successfully");
        });
        return req.pipe(busboy);
    }
}


