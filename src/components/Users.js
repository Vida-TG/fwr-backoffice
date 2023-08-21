import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Users = ()=>{
    const api = useSelector(state=>state.url)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [users, setUsers] = useState([])

    useEffect(()=>{
        axios.get(`${api}admin/users`).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
            setError('Sorry, could not fetch response from the server')
        })
    }, [])

    return (
        <div className="my-5">
            <p className="fs-5 fw-less-bold pt-2 text-white">
                FWR-Users
            </p>
            <div className="table-responsive">
                <table className="table table-dark table-borderless table-hoverable">
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