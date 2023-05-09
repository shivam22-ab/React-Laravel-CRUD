import React, { useState , useEffect} from 'react';
import http from '../http';
import {Link} from 'react-router-dom';


const Home = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers =async () =>{
    await http.get('/users').then(res=>{
      setUsers(res.data);
    })
  }

  useEffect(()=>{
    fetchAllUsers();
  },[]);
  const deleteUser = async (id)=>{
    await http.delete('/users/'+id).then((res)=>{
      fetchAllUsers();
    })
  }
  return (
    <div className='mt-5'>
      <h2>Users Listings</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index)=>(
              <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link className='btn btn-primary' to={{pathname:'/edit/'+user.id}}>Edit</Link>
                <Link className='btn btn-info' to={{pathname:'/details/'+user.id}}>Details</Link>
              <button type="button" onClick={()=>{deleteUser(user.id)}} className="btn btn-danger">Delete</button></td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home