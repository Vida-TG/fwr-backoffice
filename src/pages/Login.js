import React, { useState } from "react";
import Logo from '../assets/Foreign_Wive_Reigns.png'
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

const Login = ()=>{
    const api = useSelector(state=>state.url)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required()
        }),
        onSubmit: (values)=>{
            console.log(values)
            setError('')
            setIsLoading(true)            
            axios.post(
                `${api}admin/login`,
                values
            ).then(res=>{
                if (res.data.status) {
                    sessionStorage.setItem('admin-token', JSON.stringify(res.data.token))
                    navigate('/admin')
                } else {
                    setIsLoading(false)  
                    setError(res.data.message)
                }
            }).catch(err=>{
                setIsLoading(false)  
                setError('Something went wrong')
            })
        }
    })
    return (
        <div>
            <div className="row w-100 px-md-0 px-4 mx-auto d-flex justify-content-center py-5">
                <div className="col-lg-3 col-md-4 shadow bg-dark my-5 animate__animated animate__fadeIn animate__slow">
                    <form onSubmit={formik.handleSubmit} className="p-sm-4 p-3">
                        <img src={Logo} className="" width={'100px'} />                        
                        <p className="text-white fs-5">
                            Admin Login
                        </p>
                        {
                            error !== ''
                            &&
                            <Alert severity="error">
                                {error}
                            </Alert>
                        }
                        <div className="form-group my-4">
                            <label className="text-white">Email Address</label>
                            <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.values.email == '' && formik.touched.email ? 'form-control text-white bg-dark is-invalid fw-less-bold' : 'form-control text-white bg-dark fw-less-bold'} placeholder="admin@gmail.com" />
                        </div>
                        <div className="form-group my-4">
                            <label className="text-white">Password</label>
                            <input name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.values.password == '' && formik.touched.password ? 'form-control text-white bg-dark is-invalid fw-less-bold' : 'form-control text-white bg-dark fw-less-bold'}placeholder="password" />
                        </div>
                        <div className="form-group">
                        <Button disabled={isLoading} type="submit" className={isLoading ? 'btn border border-fwr rounded-0 w-100 text-fwr' : 'btn-fwr rounded-0 w-100'} >
                            {
                                isLoading
                                ?
                                'Logging in...'
                                :
                                'Login'
                            }
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login