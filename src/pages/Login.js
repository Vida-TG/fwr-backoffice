import React from "react";
import Logo from '../assets/Foreign_Wive_Reigns.png'
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const Login = ()=>{
    const navigate = useNavigate()
    return (
        <div>
            <div className="row w-100 px-md-0 px-4 mx-auto d-flex justify-content-center py-5">
                <div className="col-lg-3 col-md-4 shadow bg-dark my-5 animate__animated animate__fadeIn animate__slow">
                    <form className="p-sm-4 p-3">
                        <img src={Logo} className="" width={'100px'} />                        
                        <p className="text-white fs-5">
                            Admin Login
                        </p>
                        <div className="form-group my-4">
                            <label className="text-white">Email Address</label>
                            <input className="form-control bg-dark text-white fw-less-bold" placeholder="admin@gmail.com" />
                        </div>
                        <div className="form-group my-4">
                            <label className="text-white">Password</label>
                            <input className="form-control bg-dark text-white fw-less-bold" placeholder="password" />
                        </div>
                        <div className="form-group">
                            <Button className="btn-fwr rounded-0 w-100" onClick={()=>navigate('/admin')}>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login