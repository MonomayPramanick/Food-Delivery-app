import foodModel from "../models/foodModel.js";
import fs from 'fs';


//add food item

const addFood = async(req,res)=>{
  
   

   let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}


//all food list

const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods});
    }catch(error){
        console.log(error); 
        res.json({success:false,data:"Errors"});
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body._id); // Corrected to await and _id
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Remove the image from the uploads folder
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(req.body._id);

        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Server Error" });
    }
};


export {addFood,listFood,removeFood}