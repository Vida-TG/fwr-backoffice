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
                <Paper className="bg-dark text-white animate__animated animate__fadeIn animate__slow">
                    <p className="ps-3 pt-1">This is a notification</p>
                    <p className="text-end pe-3 pb-2">7:58pm</p>
                </Paper>
                :
                notificationTray.length == 0 && error == '' && !isLoading
                ?
                <div className="alert alert-info">
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