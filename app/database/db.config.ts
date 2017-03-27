import { connect } from 'mongoose';

/*
*   Database connection to mongoDB
*/
export class DBConfig{
    static connectMongoDB(){
        connect('mongodb://localhost/testDB',(err)=>{
            if(err) console.log("Faied to connect to DB");
            console.log("Successfully connected to MongoDB");
        });
    }
}
