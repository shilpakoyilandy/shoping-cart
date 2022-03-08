var express=require('express');
const mongoose=require('mongoose')
const cors =require('cors')
var prouter=require('./src/routers/product')

mongoose.connect("mongodb+srv://shilpas:resmivk@mycluster.rxjic.mongodb.net/myshoppingcart?retryWrites=true&w=majority",()=>{console.log("connected")})
var app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static('./public'))
app.set('view engine','ejs')
app.set('views',__dirname+'/src/views')
app.use('/',prouter);




app.listen(8086,()=>{
    console.log("sucess")
})
