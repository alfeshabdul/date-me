import "./Home.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home () {
    const [products , setProducts] = useState([]);
     
    const loadProducts = async () =>{
       
            const response = await axios.get("/products");
            setProducts(response?.data?.data);
    }

    useEffect(() => {
       loadProducts();
    }, []); 


    return (

     <div> 
     <h1 className="text-center heading">ALL PRODUCTS</h1>
           {
            products?.map((product, index)=>{
            return(<div className='product-card'>
                <h1>"Name":- {product.name}</h1>
                <h2>"Price":- {product.price}</h2>
                <h3>"Description":- {product.description}</h3>
                </div>)
            })
           } 
        </div>
    )
}

export default Home 