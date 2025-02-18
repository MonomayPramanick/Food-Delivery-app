import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodcontroller.js';
import multer from "multer";
import path from "path";
import fs from "fs";



const foodRouter=express.Router();



//Image storage engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
            const t=cb(null,`${Date.now()}${file.originalname}`)
            return t;
            
    }
})

const uploads=multer({storage:storage})


foodRouter.post("/add",uploads.single("image"),addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);


export default foodRouter;


