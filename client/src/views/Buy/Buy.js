import React from "react";
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import { checkLogin } from "../../utils/auth";
import './Buy.css'
import axios from "axios";


export default function Buy ()
 {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [quantity , setQuantity ] = useState(1);
    const [shippingAddress , setShippingAddress ] = useState('');
    const [user , setUser] = useState({});

    const loadProduct = async() => {
       if (!id) {
            window.location.href = '/';
       }
       const response = await axios.get(`/product/${id}`)
        
       setProduct(response.data.data);
    };
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if(quantity > 1 ) {
        setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
      checkLogin();
      loadProduct();

      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);

    }, []); 

    const placeOrder = async () => {
        const response = await axios.post('/order' , {
            product : id,
            quantity: quantity,
            shippingAddress: shippingAddress,
            user: user._id
        })
        alert(response.data.message);
        window.location.href = '/my-orders';
    }

    return (
      <div className="buy-container">
       <img src={ product.image } className="buy.image"/>
        <div> 
         <h1>{product.name}</h1>
         <p>{product.description}</p>
         <h2>₹ {product.price}</h2>

         <div className="quantity-container">
            <span onClick={decreaseQuantity} className="quantity-btn" c>-</span>
            <span className="quantity-text" >{quantity}</span>
            <span onClick={increaseQuantity} className="quantity-btn">+</span>
         </div>

         <input type="text"
         placeholder="Shipping address"
         className="shipping-address"
         value={shippingAddress}
         onChange={(e) => {setShippingAddress(e.target.value)}}
         />

         <button onClick={placeOrder} type="button" className="order-btn">Place Order</button>

        </div>

      </div>
    )
}