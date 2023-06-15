import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const[users,setusers]=useState([])

    const {id}=useParams()
    useEffect(()=>{
        loadUsers();
    },[]);

    const loadUsers=async()=>{
        const res=await axios.get("http://localhost:8080/getusers")
        console.log("res",res.data);
        setusers(res.data);
    }

    const deleteUsers=async(id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }

  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow ">
  <thead>
    <tr>
      <th scope="col">SL.NO</th>
      <th scope="col">NAME</th>
      <th scope="col">USERNAME</th>
      <th scope="col">EMAIL</th>
      <th scope="col">ACTION</th>
    </tr>
  </thead>
  <tbody>
    {
        users.map((user,index)=>(
            <tr>
      <th scope="row" key={index}>{index+1}</th>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        <Link className='btn btn-dark mx-2' 
        to={`/viewuser/${user.id}`}>View</Link>
        <Link className='btn btn-outline-dark mx-2' 
        to={`/edituser/${user.id}`}>Edit</Link>
        <button onClick={()=>deleteUsers(user.id)} className='btn btn-danger mx-2'>Delete</button>
      </td>
    </tr>

        ))
    }
    
  </tbody>
</table>
        </div>
    </div>
  )
}
