import mongoose from "mongoose";


 export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://monomaypramanick:URyf6pDjoWToTFtf@cluster1.45i2j.mongodb.net/food-del').then(()=>{
        console.log("Db Connected");
    })
}