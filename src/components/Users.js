import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Button, Dialog, DialogContent, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Users = ()=>{
    const api = useSelector(state=>state.url)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [id, setId] = useState('')
    const [response, setResponse] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    useEffect(()=>{
        axios.get(`${api}admin/users`).then((res)=>{
            setIsLoading(false)
            setUsers(res.data.users)
            console.log(res.data)
        }).catch((err)=>{
            setIsLoading(false)
            console.log(err)
            setError('Sorry, could not fetch response from the server')
        })
    }, [])

    const deleteUser = ()=>{
        setIsDeleting(true)
        axios.delete(`${api}admin/user/${id}`).then(res=>{
            setUsers(users.filter(each=>each.id !== id))
            setOpen(false)
            setIsDeleting(false)
            setResponse(res.data.message)
            setSnackbarOpen(true)
        }, err=>{
            setIsDeleting(false)
            setResponse('Internal Server Error')
            setSnackbarOpen(true)
        })
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const handleSnackbarClose = ()=>{
        setSnackbarOpen(false)
    }

    return (
        <div className="my-5">
            <p className="fs-5 fw-less-bold pt-2 text-white">
                FWR-Users
            </p>
            {
                isLoading
                ?
                (
                    <span className="spinner-border text-white"></span>
                )
                :
                !isLoading && error !== ''
                ?
                (
                    <div className="alert alert-danger">{error}</div>
                )
                :
                !isLoading && users.length == 0
                ?
                <div className="alert alert-info fw-bold">You have no users presently</div>
                :
                (
                    <div className="table-responsive">
                        <table className="table table-dark table-borderless table-hoverable">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Chapter</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((each, i)=>(
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{each.username}</td>
                                            <td>{each.email}</td>
                                            <td>{each.chapter}</td>
                                            <td>
                                                <Button onClick={()=>{
                                                    setId(each.id)
                                                    setOpen(true)
                                                }} className="btn-fwr rounded-0 shadow-lg">
                                                    <Delete />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            {/* Snackbar */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={response.includes('successfully') ? 'success' : 'error'}>
                    {response}
                </Alert>
            </Snackbar>
            {/* Dialog */}
            <Dialog open={open} maxWidth={'xs'} fullWidth={true} >
                <DialogContent className="bg-dark">                                        
                    <p className="fs-5 text-white">Delete User</p>
                    <p className="fs-6 text-white">
                        Are you sure you want to delete this user?
                    </p>
                    {
                        !isDeleting
                        ?
                        <Button onClick={deleteUser} className="my-2 btn-fwr me-2">
                            Yes
                        </Button>
                        :
                        <LoadingButton loading loadingIndicator="Deleting..." variant="outlined" className="me-2 fw-bold">
                            Deleting
                        </LoadingButton>
                    }
                    {
                        !isDeleting
                        ?
                        <Button className="my-2 btn-dark text-fwr ms-2" onClick={handleClose}>
                            No
                        </Button>
                        :
                        <LoadingButton loading loadingIndicator="Cancel"  variant="outlined" className="`fw-bold">
                            No
                        </LoadingButton>
                    }
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Users