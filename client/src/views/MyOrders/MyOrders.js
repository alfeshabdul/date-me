import React, { useEffect, useState } from "react";
import axios from "axios";
import"./MyOrders.css"

export default function MyOrders(){
const [orders, setOrders] = useState([]);

const fetchOrders = async() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const response = await axios.get(`/orders?id=${user._id}`)

    setOrders(response?.data?.data);

}

useEffect(()=>{
    fetchOrders();
}, []);


    return(
    <div>
        <h1>MY ORDERS PAGE</h1>
        {
            orders?.map((order, index)=>{
                const {product , shippingAddress , quantity } = order;

                return(
                <div key={index} className="orders-card" > 
                <h2>{product.name}</h2>
                <p className="quantity-text">Quantity of product : - {quantity}</p>
                <p className="price-text">Price of Product : - {product.price}<br></br> Total Amount  :  {product.price * quantity}</p>
               
                <p className="address-text"> ShippingAddress: - {shippingAddress}</p>

                </div>)
            })
        }
    </div>
    )
}