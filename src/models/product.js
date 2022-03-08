const mongoose=require('mongoose')

const Schema=mongoose.Schema
const productSchema=new Schema(
    {
        pname:String,
        price:String,
        img:String
    })
const productdata=mongoose.model("post",productSchema)
module.exports=productdata;