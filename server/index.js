import express from 'express';
import mongoose from 'mongoose';
import Product from './models/product.js';
import dotenv from 'dotenv';
dotenv.config();

import Order from './models/order.js';
import path  from 'path';
const __dirname = path.resolve();

import User from './models/user.js';


const app = express();
app.use(express.json());

const connectMongoDB = async() => {
 const connection = await mongoose.connect(process.env.MONGODB_URI);

 if(connection){
    console.log('Connected to MongoDB')
 }
}
connectMongoDB();


app.post('/product' , async (req, res)=>{

    const {name , price , description , image} = req.body;
    
    const product = new Product({
        name : name,
        price: price ,
        description: description,
        image: image
    });
    try{
        const savedProduct = await product.save();

        res.json({
            sucess: true,
            data : savedProduct ,
            message : 'Product added sucessfully'
        })
    }catch(e){
        res.json({
            success: false,
            message: e.message
        })
    }   
})

app.get('/products' , async (req,res)=>{

    const products = await Product.find();

    res.json({
        data: products,
        SUCESS: true,
        Message : 'Products added sucessfully'
    })
})

app.get('/product/:id' , async(req , res)=>{
    const {id} = req.params;

    const product = await Product.findOne({_id: id});

    res.json({
        success: true,
        data: product,
        message: 'Product Retrieved Sucessfully'
    })
})

app.delete('/product/:id' , async(req , res)=>{
    const {id} = req.params;

    await Product.deleteOne({_id: id});
    
    res.json({
        success: true,
        message: 'product deleted successfully'
    })
})

app.put('/product/:id' ,async(req , res) => {
    const {id} = req.params;
    const {name , price , description } = req.body;

    await Product.updateOne ({_id: id} , {$set : {
           name : name,
           proce: price,
           description: description
}});
   const updatedProduct = await Product.findOne({_id: id});

   res.json({
    success:true,
    data: updatedProduct,
    message:'Product updated sucessfully'
   })
});

app.post('/signup' ,async (req , res ) => {
const {name , mobile , email , password } = req.body;

const user = new User ({
    name: name,
    mobile: mobile,
    email: email,
    password: password
});
try {
    const savedUser = await user.save();

    return res.json({
        success: true,
        data: savedUser,
        message: 'User Registered successfully'
    })
}
catch(e){
return res.json({
    success: false,
    message: e.message
})
}
});

app.post('/login' , async(req , res ) => {
    
    const{ email , password } = req.body;

    const user = await User.findOne({email: email , password: password});

    if(user){
        return res.json({
            success:true,
            data: user,
            message:'Userlogged in Successfully'
        })
    }
    else{
        res.json({
            success:false,
            message:'Invalid user details'
        })
    }
})

app.post('/order' , async (req , res ) => {
    const {product , user , quantity , shippingAddress} = req.body;

    const order = new Order ({
        product: product,
        user: user,
        quantity: quantity,
        shippingAddress: shippingAddress
    });

    const savedOrder = await order.save();

    return res.json({
        success: true,
        data: savedOrder,
        message: "Order placed successfully"
    })
 })

 app.get('/orders' , async(req , res) => {
    const {id} = req.query;

    const myOrders = await Order.find({user : id}).populate("product user");

    res.json({
        success: true,
        data: myOrders,
        message:"Orders Retrieved Succesfully"
    })
 })


 if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '..' , 'client' , 'built' )));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..' , 'client' , 'built', 'index.html'))
    });
}
const PORT = 5000; 

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})