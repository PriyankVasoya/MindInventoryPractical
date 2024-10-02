import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function EditTask() {
    const [data,setData ] = useState();
 var id = useLocation().state;
 const navigate = useNavigate();

    const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
  })
  const { register, handleSubmit,reset,formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});


const findId = async ()=>{
  
    try {
        
        const res = await axios.get(`http://localhost:1612/api/tasks/${id}`)
        setData(res.data?.response)
    } catch (error) {
        console.log(error)
    }
}

const onsubmit = async (data)=>{
  
    try {
        let sendData = {
            title:data?.title,
            description: data?.des,
        
        }  
        const res = await axios.put(`http://localhost:1612/api/tasks/${id}`,sendData)
        toast.success('Task updated successfully!');

        reset()
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}


useEffect(()=>{
    findId();
},[])
  return (
<>
<form onSubmit={handleSubmit(onsubmit)}>
  <div className="form-group">
    <label for="title">Title</label>
    <input type="text" className="form-control" id="title" name='title' {...register('title')} defaultValue={data?.title} aria-describedby="emailHelp/"/>
    {errors.title?.message && <p style={{color : 'red'}}>{errors.title?.message}</p>}

  </div>
  <div className="form-group">
    <label for="des">description </label>
    <input type="text" className="form-control" id="des" name='des' {...register('des')} defaultValue={data?.description} aria-describedby="emailHelp/"/>

  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</>  )
}
