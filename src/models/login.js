const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const loginSchema=new Schema(
    {
        // prd_id:{type:Schema.Types.ObjectId,ref:"register"},
        email:String,
        password:String

        
    }
)
const logindata=mongoose.model("login",loginSchema)
module.exports=logindata;