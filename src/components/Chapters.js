import { LoadingButton } from "@mui/lab";
import { Alert, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as yup from 'yup'

const Chapters = ()=>{
    const api = useSelector(state=>state.url)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [chapters, setChapters] = useState([])
    const [open, setOpen] = useState(false)
    const [imageByte, setImageByte] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [response, setResponse] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [id, setId] = useState({name: '', id: ''})    
    const [openDelDialog, setOpenDelDialog] = useState(false)

    useEffect(()=>{
        axios.get(`${api}chapter/chapters`).then((res)=>{
            setIsLoading(false)
            setChapters(res.data.chapters)
            console.log(res.data)
        }, (err)=>{
            setIsLoading(false)
            console.log(err)
        })
    }, [])    
    const handleClose = ()=>{
        setOpen(false)
        setOpenDelDialog(false)
    }
    const openDialog = ()=>{
        setOpen(true)
    }
    const formik = useFormik({
        initialValues: {
            image: '',
            name: '',
            description: ''
        },
        validationSchema: yup.object().shape({
            image: yup.string().required(),
            name: yup.string().required(),
            description: yup.string().required()
        }),
        onSubmit: (values)=>{
            setIsCreating(true)
            values.image = imageByte
            console.log(values)
            axios.post(`${api}chapter/chapters`, values).then((res)=>{
                if (res.data.status) {
                    setOpen(false)
                    setIsCreating(false)
                    setResponse(res.data.message)
                    setSnackbarOpen(true)
                } else {
                    setIsCreating(false)
                    setResponse(res.data.message)
                    setSnackbarOpen(true)
                }
            }).catch((err)=>{
                setIsCreating(false)
                setResponse('Internal Server Error')
                setSnackbarOpen(true)
            })
        }
    })
    const pickFile = (e)=>{        
        const file = e.target.files[0]
        const fs = new FileReader()
        fs.readAsDataURL(file)
        fs.onload = ()=>{
            setImageByte(fs.result)            
        }
    }
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
    };
    const deleteChapter = ()=>{        
        console.log(id)
        // setIsDeleting(true)
    }

    return(
        <div className="my-5">
            <div className="container">
                <div className="d-flex justify-content-between pb-3">
                    <p className="fs-4 text-white fw-less-bold">Chapters</p>
                    <Button onClick={openDialog} className="text-fwr fw-less-bold fs-7 border border-fwr">Create Chapter</Button>
                </div>
                {
                    isLoading
                    ?
                    <span className="spinner-border text-white"></span>
                    :
                    error !== ''
                    ?
                    <div className="alert alert-danger fw-bold">
                        Error
                    </div>
                    :
                    !isLoading && chapters.length == 0
                    ?
                    <div className="alert alert-info fw-bold">
                        You have not created any chapters
                    </div>
                    :
                    <div className="w-100 row mx-auto">
                        {
                            chapters.map((each, i)=>(
                                <div className="col-lg-3 col-md-4 mb-4" key={i}>
                                    <Card sx={{ maxWidth: 345 }} className="py-2">
                                        <div className="d-flex justify-content-center">
                                            <img 
                                            src={each.image}
                                            className="img-fluid"
                                            />
                                        </div>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" className="text-center">
                                            {each.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" className="text-center">
                                            {each.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className="d-flex justify-content-center">
                                            <Button onClick={()=>{
                                                setId({name:each.name, id:each.id})
                                                setOpenDelDialog(true)
                                            }} size="small" className="fw-bold">
                                                Delete
                                            </Button>
                                            {/* <Button size="small">Edit</Button> */}
                                        </CardActions>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                }                                                            
            </div>
            {/* Snackbar */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={response.includes('successfully') ? 'success' : 'error'}>
                    {response}
                </Alert>
            </Snackbar>
            {/* Create Chapter */}
            <Dialog open={open} maxWidth={'xs'} fullWidth={true} >
                <DialogContent className="bg-dark">                                        
                    <p className="fs-5 text-white">Create a Chapter</p>
                    <div className="form-group my-3">
                        <label className="text-white">Image</label>
                        <input type="file" name="image" onInput={(e)=>pickFile(e)} onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.values.image == '' && formik.touched.image ? 'form-control text-white bg-dark is-invalid' : 'form-control text-white bg-dark'} />
                    </div>
                    {/* <input type="file" /> */}
                    <div className="form-group my-3">
                        <label className="text-white">Chapter Name</label>
                        <input type="text" placeholder="Nigeria" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.values.name == '' && formik.touched.name ? 'form-control text-white bg-dark is-invalid' : 'form-control text-white bg-dark'} />
                    </div>
                    <div className="form-group my-3">
                        <label className="text-white">Chapter Description</label>
                        <input type="text" placeholder="Welcome" name="description" onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.values.description == '' && formik.touched.description ? 'form-control text-white bg-dark is-invalid' : 'form-control text-white bg-dark'} />
                    </div>
                    {
                        !isCreating
                        ?
                        <Button onClick={formik.handleSubmit} className="my-2 btn-fwr me-2">
                            Create
                        </Button>
                        :
                        <LoadingButton loading loadingIndicator="Creating..." variant="outlined" className="text-loading me-2 fw-bold">
                            Creating...
                        </LoadingButton>
                    }
                    {
                        !isCreating
                        ?
                        <Button className="my-2 btn-dark text-fwr ms-2" onClick={handleClose}>
                            Cancel
                        </Button>
                        :
                        <LoadingButton loading loadingIndicator="Cancel"  variant="outlined" className="text-loading fw-bold">
                            Cancel
                        </LoadingButton>
                    }
                </DialogContent>
            </Dialog>
            {/* Delete Chapter */}
            <Dialog open={openDelDialog} maxWidth={'xs'} fullWidth={true}>
                <DialogContent className="bg-dark">
                    <p className="fs-5 text-white">Delete {id.name} Chapter</p>
                    <p className="fs-6 text-white">
                        Are you sure you want to delete this chapter?
                    </p>
                    {
                        !isDeleting
                        ?
                        <Button onClick={deleteChapter} className="my-2 btn-fwr me-2">
                            Yes
                        </Button>
                        :
                        <LoadingButton loading loadingIndicator="Deleting..." variant="outlined" className="me-2 fw-bold text-loading">
                            Deleting...
                        </LoadingButton>
                    }
                    {
                        !isDeleting
                        ?
                        <Button className="my-2 btn-dark text-fwr ms-2" onClick={handleClose}>
                            No
                        </Button>
                        :
                        <LoadingButton loading loadingIndicator="No"  variant="outlined" className="text-loading fw-bold">
                            No
                        </LoadingButton>
                    }
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Chapters