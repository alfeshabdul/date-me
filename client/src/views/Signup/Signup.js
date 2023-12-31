import React, { useState } from "react"
import "./Signup.css"
import axios from "axios"

function Signup (){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const signup = async () => {
        const response = await axios.post("/signup", {
            name: name,
            email: email,
            mobile: mobile,
            password: password
        });

        if(response.data.success){
          alert(response.data.message);
          window.location.href = "/login";
        }
        
    }
     return (
        <div>
            <div className="signup-container">
              <h1 className="signup-heading"> SIGNUP PAGE</h1>
                <div className="input-container">
                 <label className="input-label">Name</label>
                 <input
                  type="text"
                  placeholder="Enter your NAME"
                  className="input-field"
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                  />
                  
                 </div>



                 <div className="input-container">
                 <label className="input-label">Email</label>
                 <input
                  type="email"
                  placeholder="Enter your Email"
                  className="input-field"
                  value={email}
                  onChange={(e)=>{
                   setEmail(e.target.value)
                  }}/>
                 </div>




                 <div className="input-container">
                 <label className="input-label">Mobile</label>
                 <input
                  type="text"
                  placeholder="Enter your Mobile No"
                  className="input-field"
                  value={mobile}
                  onChange={(e)=>{
                    setMobile(e.target.value)
                  }}
                  />
                 </div>



                 <div className="input-container">
                 <label className="input-label">Password</label>
                 <input
                  type="password"
                  placeholder="Enter your Password"
                  className="input-field"
                  value={password}
                  onChange={(e)=>{
                     setPassword(e.target.value)
                     
                  }}
                  />
                 </div>

                 <button type="button" className="signup-btn" onClick={signup}>
                    SIGNUP
                 </button>

            </div>
        </div>
    )
}

export default Signup