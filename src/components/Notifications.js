import { Paper } from "@mui/material";
import React from "react";

const Notification = ()=>{
    return (
        <div className="my-5">
            <p className="fs-5 pt-2 fw-less-bold text-white">
                Notifications
            </p>
            <Paper className="bg-dark text-white animate__animated animate__fadeIn animate__slow">
                <p className="ps-3 pt-1">This is a notification</p>
                <p className="text-end pe-3 pb-2">7:58pm</p>
            </Paper>
        </div>
    )
}

export default Notification