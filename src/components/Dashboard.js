import { AdminPanelSettings, CardGiftcard, NotificationAddOutlined, SupervisedUserCircleOutlined, UploadFile } from "@mui/icons-material";
import { Button, Dialog, DialogContent, Paper } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Dashboard = ()=>{
    const [open, setOpen] = useState(false)
    const handleClose = ()=>{
        setOpen(false)
    }
    const navigate = useNavigate()
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
                            900
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
                            900
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
                            900
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
                            900
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
                            900
                        </p>
                    </Paper>
                </div>
                <div className="col-md-4 animate__animated animate__fadeIn my-md-0 my-1">
                    <Paper elevation={3}  onClick={()=>navigate('/admin/notifications')} className="cursor-pointer bg-fwr text-white p-4" >
                        <div className="d-flex justify-content-between">
                            <p className="text-start fw-bold fs-3">
                                Wife Cards
                            </p>
                            <p>
                                <CardGiftcard />
                            </p>
                        </div>
                        <p className="text-end fs-1 fw-light">
                            900
                        </p>
                    </Paper>
                </div>
            </div>
            {/* Admin-Dialog */}
            <Dialog open={open} maxWidth={'xs'} fullWidth={true} onClose={handleClose}>
                <DialogContent className="bg-dark">                                        
                        <p className="fs-5 text-white">Add Admin</p>
                    <div className="form-group">
                        <label className="text-white">Email address of the admin you wish to add</label>
                        <input className="form-control text-white bg-dark" />
                    </div>
                    <Button className="my-2 btn-fwr">
                        Add Admin
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default Dashboard