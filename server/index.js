import express from 'express'
import mongoose from 'mongoose';
import Product from './models/product.js';
import dotenv from 'dotenv'; 
dotenv.config();

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

    const {name , price , description } = req.body;
    
    const product = new Product({
        name : name,
        price: price ,
        description: description 
    });

    const savedProduct = await product.save();

    res.json({
        sucess: true,
        data : savedProduct ,
        message : 'Product added sucessfully'
    })
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
    sucess:true,
    data: updatedProduct,
    message:'Product updated sucessfully'
   })
});
const PORT = 5000;

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})