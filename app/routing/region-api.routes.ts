import {Router, Request, Response} from 'express';

import {RegionController} from '../controllers/region.controller';

const router: Router = Router();

router.get('/country-list',(req: Request, res: Response)=>{
    RegionController.getCountryList(req,res);
});

router.get('/region-list-by-country/:countryId',(req: Request, res: Response)=>{
    RegionController.getRegionListByCountry(req,res);
});

router.get('/city-list-by-region/:regionId',(req:Request,res:Response)=>{
    RegionController.getCityListByRegion(req,res);
});

export const RegionApiRoute: Router = router;