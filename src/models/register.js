const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const registerSchema=new Schema(
    {
        // login_id:{type:Schema.Types.ObjectId,ref:"login"},
      name:String,
        email:String,
        password:String,
        role:String
    }
)
const registerdata=mongoose.model("register",registerSchema)
module.exports=registerdata;