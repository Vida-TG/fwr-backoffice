import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const Users = ()=>{
    return (
        <div className="my-5">
            <p className="fs-5 fw-less-bold pt-2 text-white">
                FWR-Users
            </p>
            <div className="table-responsive">
                <table className="table table-dark table-borderless table-hoverable animate__animated animate__fadeIn animate__slower">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Fullname</th>
                            <th>Email</th>
                            <th>Chapter</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Test</td>
                            <td>test@gmail.com</td>
                            <td>Nigeria</td>
                            <td>
                                <Button className="btn-fwr rounded-0 shadow-lg">
                                    <Delete />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users