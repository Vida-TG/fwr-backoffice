import { Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Notification = ()=>{
    const api = useSelector(state=>state.url)
    const [error, setError] = useState('')
    const [notificationTray, setNotificationTray] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{        
        axios.get(`${api}admin/notifications`).then((res)=>{
            setNotificationTray(res.data.notifications)
            setIsLoading(false)
            console.log(res.data)
        }).catch((err)=>{
            setIsLoading(false)
            setError("Sorry, couldn't fetch from server")
            console.log(err)
        })
    }, [])
    return (
        <div className="my-5">
            <p className="fs-5 pt-2 fw-less-bold text-white">
                Notifications
            </p>
            {
                isLoading
                ?
                <span className="spinner-border text-white"></span>
                :
                notificationTray.length !== 0 && !isLoading
                ?
                notificationTray.map((each, i)=>(
                    <Paper className="bg-dark text-white animate__animated animate__fadeIn animate__slow p-2">                    
                        <div className="d-flex flex-md-row flex-column">
                            <span className="fw-bold fs-6 text-fwr">New Registration Alert!</span>
                            <span className="fw-light fs-6 text-fwr ps-3">{new Date(each.date).toUTCString()}</span>
                        </div>  
                        <p className="pt-1 px-3">{each.user_email} joined and registered as a Foreign WIves Reign member</p>                  
                    </Paper>
                ))  
                :
                notificationTray.length == 0 && error == '' && !isLoading
                ?
                <div className="alert alert-info fw-bold">
                    You haven't had any recent notification!
                </div>
                :
                <div className="alert alert-danger">
                    {error}
                </div>
            }
        </div>
    )
}

export default Notification