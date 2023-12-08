import "./home.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from "../../components/ProductsCard/ProductsCard";
import { checkLogin } from "../../utils/auth";

function Home () {
    const [products , setProducts] = useState([]);
     
    const loadProducts = async () =>{
       
            const response = await axios.get("/products");
            setProducts(response?.data?.data);
    }
   
    useEffect(() => {
        checkLogin()
       loadProducts();
    }, []); 


    return (

     <div> 
     <h1 className="text-center heading">ALL PRODUCTS</h1>

         <div className="products-container">
         {
            products?.map((product, index)=>{
            const {_id, name, price, description, image} = product;

                return(<ProductCard key={index} id={_id}  name={name} price={price} description={description} image={image}  /> )
            })
           } 

         </div>
        </div>
    )
}

export default Home 