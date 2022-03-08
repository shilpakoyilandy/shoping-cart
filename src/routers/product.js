var express = require('express');
const cartdata = require('../models/cart');
const registerdata = require('../models/register');
// const logindata = require('../models/login');
const productRouter = express.Router();
const productdata = require("../models/product");
const { response } = require('express');


productRouter.get('/index', (req, res) => {

    productdata.find().then((items) => {
        res.render("index", {
            items,
            nav: [{ link: "/index", name: "HOME" },
            { link: "/register", name: "REGISTER" },
            { link: "/", name: "LOGIN" },
            // { link: "/add", name: "ADD ITEM" },
            { link: "/cart", name: "SHOW CART" },
            {link:"/logout",name:"LOGOUT"}]
        })
    })

    // res.render("index",{
    //     items,
    //     nav:[{link:"/",name:"HOME"},
    //          {link:"/register",name:"REGISTER"},
    //         {link:"/login",name:"LOGIN"},
    //         {link:"/add",name:"ADD ITEM"},
    //         {link:"/",name:"SHOW CART"}]
    //         })

})


productRouter.get('/add', (req, res) => {
    res.render("additem")
})
productRouter.post('/add', (req, res) => {
    const item = {
        pname: req.body.pname,
        price: req.body.price,
        img: req.body.img

    }
    // console.log(req.body.pname)
    // console.log(item)
    // console.log(req.body)

    var p = productdata(item)
    p.save().then((response) => {
        // console.log(response)
        res.redirect('/index')
    })


})

productRouter.get('/', (req, res) => {

    res.render("login",{err:null})
})

productRouter.post('/', (req, res) => {
    const loginperson = {
        email: req.body.email,
        password: req.body.password,
        role:req.body.role
    };
    console.log(loginperson)
    registerdata.findOne({ email: req.body.email }).then((signin) => {
        console.log(signin);
        if (signin.password === req.body.password) {
            if(signin.role==="user")
        {
               res.redirect("/index")
              }
                else{
                 res.redirect("/admin")
                    }
          
            }
            
        }).catch((signin)=> {
        res.render("login",{err:"incorrect login"})
         })
              
        })
    
productRouter.get('/register', (req, res) => {
    res.render("register")
})
productRouter.post('/register', (req, res) => {

    const regperson = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role:req.body.role
    };

    console.log(regperson)
    var reg = registerdata(regperson)
    reg.save().then((rgtr) => {
        // console.log(rgtr)
    })
    res.redirect("login")
})



productRouter.post('/cart/:id', (req, res) => {
    const id = req.params.id;
    const qty = req.body.qty;
    // console.log(id)
    let total = 1;
    productdata.findOne({ _id: id }).then((item) => {
        // console.log(item.price +" qty: "+ qty)
        total = item.price * qty;

        const items = {
            prd_id: id,
            qty: qty,
            total: total
        }
        // console.log(items);
        var c = cartdata(items)
        c.save();
        res.redirect('/cart');
    })

})


productRouter.get("/cart", (req, res) => {

    cartdata.aggregate([
        {
            $lookup:
            {
                from: 'posts',
                localField: 'prd_id',
                foreignField: '_id',
                as: 'cartdetails'
            }
        }]).then((details) => {
            console.log(JSON.stringify(details));
            res.render("addtocart", { details ,
            nav:[{link:"/index",name:"HOME"},
            { link: "/register", name: "REGISTER" },
            { link: "/", name: "LOGIN" },
            { link: "/add", name: "ADD ITEM" },
            { link: "/cart", name: "SHOW CART" },
            {link:"/logout",name:"LOGOUT"}
        ]})
        })

})

productRouter.get("/admin",(req,res)=>{
    productdata.find().then((items) => {
        res.render("admin", {
            items,
            nav: [{ link: "/index", name: "HOME" },
            { link: "/register", name: "REGISTER" },
            { link: "/", name: "LOGIN" },
            { link: "/add", name: "ADD ITEM" },
            // { link: "/cart", name: "SHOW CART" },
            {link:"/logout",name:"LOGOUT"}]
        })
    // res.render("admin")
})
})


productRouter.get("/edit/:id",(req,res)=>{
    const id=req.params.id;
    productdata.findOne({_id:id}).then((item)=>{
        // console.log(item)
        res.render("edit",{item,nav:[{link:"/index",name:"HOME"},
        { link: "/register", name: "REGISTER" },
        { link: "/", name: "LOGIN" },
        { link: "/add", name: "ADD ITEM" },
        { link: "/cart", name: "SHOW CART" },
        {link:"/logout",name:"LOGOUT"}
    ]})
    })
})

productRouter.post("/update/:id",(req,res)=>{
    const id=req.params.id;
    var item={
        pname:req.body.pname,
        price:req.body.price,
        img:req.body.img

    };
    // console.log(item)
    productdata.findByIdAndUpdate({_id:id},item).then((updt)=>{
    //   console.log(updt)
        res.redirect("/admin")
    })
})

productRouter.post("/delete/:id",(req,res)=>{
    const id=req.params.id;
    var item={
        pname:req.body.pname,
        price:req.body.price,
        img:req.body.img

    };
     console.log(item)
    productdata.findByIdAndDelete({_id:id},item).then((del)=>{
        res.redirect("/admin")
    })
})


productRouter.get('/singleview/:id', (req, res) => {
    const id = req.params.id;
    productdata.findOne({_id:id}).then((items) => {
        // console.log(items);


        res.render("singleview", { items,nav:[{link:"/index",name:"HOME"},
        { link: "/register", name: "REGISTER" },
        { link: "/", name: "LOGIN" },
        { link: "/add", name: "ADD ITEM" },
        { link: "/cart", name: "SHOW CART" },
        {link:"/logout",name:"LOGOUT"}
    ]})

    })

})
productRouter.get('/logout', (req, res) => {
    res.redirect("/")
})

module.exports = productRouter;