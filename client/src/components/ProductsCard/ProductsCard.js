import React from "react";
import "./ProductCard.css"
import {Link} from 'react-router-dom'

function ProductCard({id,name,price,description,image}) {
    return (
        <div className="product-card">
        <img src={image} alt={name} className="img-card"/>
        <h1>{name}</h1>
        <h1>₹{price}</h1>
        <p>{description}</p>
        <Link className="btn" to={`/buy/${id}`}>BUY NOW</Link>
        </div>
    )
}

export default ProductCard