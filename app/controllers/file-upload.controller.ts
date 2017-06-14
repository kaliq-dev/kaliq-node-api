import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as Busboy from 'busboy';

import {Router, Request, Response} from 'express';

export class FileUploadController {
    static uploadFile(req: Request, res: Response) {
        let busboy = new Busboy({headers: req.headers});

        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var saveTo = path.join(path.dirname(os.tmpdir()),'uploads', path.basename(filename));
            file.pipe(fs.createWriteStream(saveTo));
        });

        busboy.on('finish', function () {
            res.writeHead(200, {'Connection': 'close'});
            res.end("File uploaded successfully");
        });
        return req.pipe(busboy);
    }
}


