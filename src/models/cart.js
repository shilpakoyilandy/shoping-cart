const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const cartSchema=new Schema(
    {
        prd_id:{type:Schema.Types.ObjectId,ref:"post"},
        qty:Number,
        total:Number

        
    }
)
const cartdata=mongoose.model("cart",cartSchema)
module.exports=cartdata;