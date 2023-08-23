import { AdminPanelSettings, CreditCard, NotificationAddOutlined, SupervisedUserCircleOutlined, UploadFile } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogContent, Paper, Snackbar } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as yup from 'yup'

const Dashboard = ()=>{
    const api = useSelector(state=>state.url)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [addAdminResponse, setAddAdminResponse] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [records, setRecords] = useState({admin: 0, users: 0, notifications: 0, chapters: 0, docs: 0})
    const handleClose = ()=>{
        setOpen(false)
    }
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`${api}admin/count`).then(res=>{
            console.log(res.data)
            setRecords({...records, ...res.data.count})    
            setIsLoading(false)
        }).catch((err)=>{
            setIsLoading(false)
            setError(err.name)
        })       
    }, [])
    const handleSnackbarClose = ()=>{
        setSnackbarOpen(false)
    }
    const emailForm = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: yup.object().shape({
            email: yup.string().email().required()
        }),
        onSubmit: (values)=>{
            console.log(values)
            setIsAdding(true)
            axios.post(`${api}admin/add-admin`, values).then(res=>{
                setIsAdding(false)
                if (res.data.status) {
                    setOpen(false)
                    setSnackbarOpen(true)
                    setAddAdminResponse(res.data.message)
                } else {
                    setAddAdminResponse(res.data.message)
                }                
            }).catch((err)=>{
                console.log(err)
                setIsAdding(false)
                setAddAdminResponse('Something went wrong')
            })            
        }
    })
    return (
        <div className="my-5">
            <p className="fs-5 text-white fw-less-bold pt-2">
                Dashboard
            </p>
            <div className="row w-100 mx-auto">
                <div className="col-md-4 animate__animated animate__fadeIn my-md-0 my-1">
                    <Paper elevation={3} onClick={()=>setOpen(true)} className="cursor-pointer bg-dark text-white p-4" >
                        <div className="d-flex justify-content-between">                            
                            <p className="text-start fw-bold fs-3">
                                Admins
                            </p>
                            <p>
                                <AdminPanelSettings />
                            </p>
                        </div>
                        <p className="text-end fs-1 fw-light">
                            {
                                isLoading
                                ?
                                <span className="spinner-border fw-bold text-white"></span>
                                :
                                error !== ''
                                ?
                                <i className="fa fa-exclamation-triangle"></i>
                                :
                                records.admin
                            }
                        </p>
                    </Paper>
                </div>
                <div className="col-md-4 animate__animated animate__fadeIn my-md-0 my-1">
                    <Paper elevation={3} onClick={()=>navigate('/admin/users')} className="cursor-pointer bg-fwr text-white p-4" >
                        <div className="d-flex justify-content-between">                            
                            <p className="text-start fw-bold fs-3">
                                Users
                            </p>
                            <p>
                                <SupervisedUserCircleOutlined />
                            </p>
                        </div>
                        <p className="text-end fs-1 fw-light">
                            {
                                isLoading
                                ?
                                <span className="spinner-border fw-bold"></span>
                                :
                                error !== ''
                                ?
                                <i className="fa fa-exclamation-triangle"></i>
                                :
                                records.users
                            }
                        </p>
                    </Paper>
                </div>
                <div className="col-md-4 animate__animated animate__fadeIn my-md-0 my-1">
                    <Paper elevation={3} onClick={()=>navigate('/admin/notifications')} className="cursor-pointer bg-dark text-white p-4" >
                        <div className="d-flex justify-content-between">                            
                            <p className="text-start fw-bold fs-3">
                                Notification
                            </p>
                            <p>
                                <NotificationAddOutlined />
                            </p>
                        </div>
                        <p className="text-end fs-1 fw-light">
                            {
                                isLoading
                                ?
                                <span className="spinner-border fw-bold"></span>
                                :
                                error !== ''
                                ?
                                <i className="fa fa-exclamation-triangle"></i>
                                :
                                error == ''
                                &&
                                records.notifications
                            }
                        </p>
                    </Paper>
                </div>
            </div>
            <div className="row w-100 mx-auto my-5">
                <div className="col-md-4 animate__animated animate__fadeIn my-md-0 my-1">
                    <Paper elevation={3} onClick={()=>navigate('/admin/notifications')} className="cursor-pointer bg-fwr text-white p-4" >
                        <div className="d-flex justify-content-between">
                            <p className="text-start fw-bold fs-3">
                                Chapters
                            </p>
                            <p>
                                
                            </p>
                        </div>
                        <p className="text-end fs-1 fw-light">
                            {
                                isLoading
                                ?
                                <span className="spinner-border fw-bold"></span>
                                :
                                error !== ''
                                ?
                                <i className="fa fa-exclamation-triangle"></i>
                                :
                                error == ''
                                &&
                                records.chapters
                            }
                        </p>
                    </Paper>
                </div>
                <div className="col-md-4 animate__animated animate__fadeIn my-md-0 my-1">
                    <Paper elevation={3}  onClick={()=>navigate('/admin/notifications')} className="cursor-pointer bg-dark text-white p-4" >
                        <div className="d-flex justify-content-between">
                            <p className="text-start fw-bold fs-3">
                                Doc Uploads
                            </p>
                            <p>
                                <UploadFile />
                            </p>
                        </div>                        
                        <p className="text-end fs-1 fw-light">
                            {
                                isLoading
                                ?
                                <span className="spinner-border fw-bold"></span>
                                :
                                error !== ''
                                ?
                                <i className="fa fa-exclamation-triangle"></i>
                                :
                                error == ''
                                &&
                                records.docs
                            }
                        </p>
                    </Paper>
                </div>
                <div className="col-md-4 animate__animated animate__fadeIn my-md-0 my-1">
                    <Paper elevation={3}  onClick={()=>navigate('/admin/notifications')} className="cursor-pointer bg-fwr text-white p-4" >
                        <div className="d-flex justify-content-between">
                            <p className="text-start fw-bold fs-3">
                                Transactions
                            </p>
                            <p>
                                <CreditCard />
                            </p>
                        </div>
                        <p className="text-end fs-1 fw-light">
                            {
                                isLoading
                                ?
                                <span className="spinner-border fw-bold"></span>
                                :
                                error !== ''
                                ?
                                <i className="fa fa-exclamation-triangle"></i>
                                :
                                error == ''
                                &&
                                0
                            }
                        </p>
                    </Paper>
                </div>
            </div>
            {/* Admin-Dialog */}
            <Dialog open={open} maxWidth={'xs'} fullWidth={true}>
                <DialogContent className="bg-dark">                                        
                        <p className="fs-5 text-white">Add Admin</p>
                        {!addAdminResponse.includes('added') && addAdminResponse !== '' && <Alert severity="error" className="mb-2">{addAdminResponse}</Alert>}
                    <div className="form-group">
                        <label className="text-white">Email address of the admin you wish to add</label>
                        <input name="email" onChange={emailForm.handleChange} onBlur={emailForm.handleBlur} className={emailForm.values.email == '' && emailForm.touched.email ? 'form-control text-white bg-dark is-invalid' : 'form-control text-white bg-dark'} />
                    </div>
                    <Button disabled={isAdding} onClick={emailForm.handleSubmit} className={isAdding ? 'my-2 btn-dark rounded-0 text-fwr mx-1' : 'my-2 btn-fwr rounded-0 mx-1'}>
                        {
                            isAdding
                            ?
                            'Adding Admin...'
                            :
                            'Add Admin'
                        }
                    </Button>
                    <Button disabled={isAdding} onClick={handleClose} className="my-2 text-fwr mx-1">
                        Cancel
                    </Button>
                </DialogContent>
            </Dialog>
            {/* snackbar */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={addAdminResponse.includes('added') ? 'success' : 'error'}>
                    {addAdminResponse}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default Dashboard