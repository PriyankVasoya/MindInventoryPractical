import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'
import DataTable from 'react-data-table-component';
import DataTableExtension from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TaskData() {

    const [data,setData ] = useState();

    const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
  })
  const { register, handleSubmit,reset,formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});

const onsubmit = async (data)=>{
  
    try {
        let sendData = {
            title:data?.title,
            description: data?.des,
        
        }  
        const res = await axios.post('http://localhost:1612/api/tasks',sendData)
        toast.success('Task added successfully!');

        reset()
    } catch (error) {
        console.log(error)
    }
}


const getData = async ()=>{
  
    try {
        
        const res = await axios.get('http://localhost:1612/api/tasks')
        setData(res.data?.response)
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
    getData();
},[])

const columns = [
    {
        name : 'id',
        selector : (row,index)=>index+1,
        sortable : true
    },
    {
        name : 'Title',
        selector : (row,index)=>row.title, 
               sortable : true
    }, 
     {
        name : 'Description',
        selector : (row,index)=>row.description, 
               sortable : true
    },
     

    // {
    //     name : 'Status',
    //     selector : (row,index)=>row.is_completed == true ? 'completed' : 'pending', 
    //            sortable : true
    // },
    {
        name: 'Status',
        selector: (row) => row.is_completed ? 'Completed' : 'Pending',
        sortable: true,
        cell: (row) => (
          <button
            type="button"
            className="btn"
            onClick={() => toggleStatus(row._id, row.is_complete)}
          >
            {row.is_complete? 'Mark as Pending' : 'Mark as Completed'}
          </button>
        )
      },
    {
        name : 'Action',
        selector : (row,index)=>row._id,
        cell : (row)=><>
        <button type='button' className='btn' onClick={()=>DeleteData(row._id)}>Delete</button>
        <Link to='/edit-task' state={row._id}  className='btn'>Edit</Link>

        </>
               
    },
    

]

const [tasks, setTasks] = useState(data); // Assuming `data` is the array of tasks

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const res = await axios.put(`http://localhost:1612/api/tasks/${id}`,{is_complete: updatedStatus, toggle: 1})
      getData()
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

const DeleteData = async (id)=>{
  
    try {
        const res = await axios.delete(`http://localhost:1612/api/tasks/${id}`)
        getData();
        toast.success('Task deleted successfully!');

    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
<form onSubmit={handleSubmit(onsubmit)}>
  <div className="form-group">
    <label for="title">Title</label>
    <input type="text" className="form-control" id="title" name='title' {...register('title')} aria-describedby="emailHelp/"/>
    {errors.title?.message && <p style={{color : 'red'}}>{errors.title?.message}</p>}

  </div>
  <div className="form-group">
    <label for="des">description </label>
    <input type="text" className="form-control" id="des" name='des' {...register('des')} aria-describedby="emailHelp/"/>

  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

<div className='container'>

  <DataTable columns={columns} data={data}></DataTable>
</div>
</>
  )
}
