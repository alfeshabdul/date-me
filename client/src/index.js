import ReactDOM from "react-dom/client";

import Home from "./views/home/home";
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import Buy from "./views/Buy/Buy";
import MyOrders from "./views/MyOrders/MyOrders";
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
"path": "/",
"element": <Home/>
    },
    {
        "path": "/signup",
        "element": <Signup/>
        
     },
     {
        "path": "/login",
        "element": <Login/>
        
     },
     {
        "path": "/buy/:id",
        "element": <Buy/>
        
     },
     {
      "path": "/my-orders",
      "element": <MyOrders/>
      
   },
])


root.render(<RouterProvider router={router} />);


