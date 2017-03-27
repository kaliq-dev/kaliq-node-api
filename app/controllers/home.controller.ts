import { Router, Request, Response } from 'express';
import { Person } from '../database/models/Person';
/*
* Controller to handle request to /home 
*/
export class HomeController{

    constructor(){}

    getHome(req:Request,res:Response):Response{
       return res.send("Welcome To API Home !!");
    }

    getPerson(req:Request,res:Response):Response{
        let person:Person = {
            id:1,
            name: "Abrar",
            email: "shariarabrar@gmail.com",
            skills: ["C/C++","JavaScript","TypeScript","Nodejs"]
        }
        return res.send(person);
    }
}