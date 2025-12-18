import React from 'react';
import Heading from '../../../../Components/Shared/Heading/Heading';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Swal from 'sweetalert2';
import EditUserModal from '../../../../Components/Modal/EditUserModal';

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();
        const [search, setSearch] = useState("");
  
   const [page, setPage] = useState(1);
            const limit = 5;
  const [editUser, setEditUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
          params: {
                    page, limit, search
                }
      });
      console.log(res.data)
      return res.data;
    },
  });
    const users = data?.users || [];
  const totalPages = data?.totalPages || 1;
  const handleMakeDecorator = async(id)=>{
    try {
        await axiosSecure.put(`users/${id}/make-decorator`);
        toast.success('Users promoted to decorator successfully!');
        refetch();
        
    } catch (error) {
        console.log(error)
        toast.error('Failed to make a decorator')
        
    }
  }
  const handleApprove = async(id)=>{
     try {
        await axiosSecure.put(`users/${id}/approve`);
        toast.success('Decorator approved!');
        refetch();
        
    } catch (error) {
        console.log(error)
        toast.error('Failed to approve decorator')
        
    }
  }
  const handleDisable = async(id)=>{
     try {
        await axiosSecure.put(`users/${id}/disable`);
        toast.success('Decorator disabled!');
        refetch();
        
    } catch (error) {
        console.log(error)
        toast.error('Failed to disable decorator')
        
    }
  }
  const handleEdit = async(id, updatedData)=>{
    try {
        await axiosSecure.put(`/users/${id}`, updatedData);
        toast.success('User info updated!');
        refetch();
        setEditUser(null);
    } catch (error) {
        console.log(error)
        toast.error('Failed to update user info');
        
    }
  }
  const handleDelete = async(id)=>{
    Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4F46E5",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/users/${id}`).then((res) => {
            //   console.log(res.data);
              if (res.data.deletedCount) {
                refetch();
                Swal.fire({
                  title: "Deleted!",
                  text: "User deleted.",
                  icon: "success",
                });
              }
            });
          }
        });
  }
  if(isLoading){
    return <Loading/>
  }
    return (
         <div>
      <Heading title="Manage Decorators" center />
           <div className='flex lg:justify-start justify-center'>
             <input type="text" placeholder='Search Services...' value={search} onChange={(e)=> {setSearch(e.target.value);
                  setPage(1);
                }}  className='border px-2 py-1 rounded focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md' />
           </div>
     

      <div className="overflow-x-auto rounded-box border-2 border-primary  bg-base-100 mt-5">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200 ">
            <tr>
              <th className="text-primary font-bold text-lg">SL.</th>

              <th className="text-primary font-bold text-lg">Name</th>
              <th className="text-primary font-bold text-lg">Email</th>
              <th className="text-primary font-bold text-lg">Role</th>
              <th className="text-primary font-bold text-lg">Status</th>
              <th className="text-primary font-bold text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th className="p-2">{index + 1}</th>
                <td className="p-2 ">{user.displayName}</td>
                <td className="p-2 ">{user.email}</td>
                <td className="p-2 ">{user.role}</td>
                <td className="p-2">
                    {user.status || 'null'}
                </td>
                <td className='flex items-center gap-2 flex-col md:flex-row lg:flex-row'>
                    {
                        user.role === 'user' && (
                            <button onClick={()=> handleMakeDecorator(user._id)} className='px-3 py-1 bg-primary hover:bg-secondary text-white rounded-md'>Make Decorator</button>
                        )
                    }
                    {
                        user.role === 'decorator' && user.status === 'pending' && (
                            <button onClick={()=> handleApprove(user._id)} className='px-3 py-1
                             bg-green-700 hover:bg-green-600 text-white rounded-md'>Approve</button>
                        )
                    }
                    {
                        user.role === 'decorator' && user.status === 'approved' && (
                            <button onClick={()=> handleDisable(user._id)} className='px-3 py-1
                             bg-amber-500 hover:bg-amber-400 text-white rounded-md'>Disable</button>
                        )
                    }
                    
                 
                    
                       <button onClick={()=> {
                        setEditUser(user);
                        setIsOpen(true);
                    }} className='px-3 py-1 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md'>
                        Edit
                    </button>
                    {
                       isOpen && editUser && (
                            <EditUserModal isOpen={isOpen} setIsOpen={setIsOpen} user={editUser}
                            onSubmit={handleEdit}
                            />
                        )
                    }
                 
                 
                    <button onClick={()=> handleDelete(user._id)} className='px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-md'>
                        Delete
                    </button>

                </td>
                

               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <div className='flex gap-2 justify-center mt-4'>
                    <button
                    disabled={page === 1}
                    onClick={()=> setPage(page - 1)}
                    className='btn btn-sm bg-primary/20'
                    
                    >
                      Prev

                    </button>
                    {[
                      ...Array(totalPages).keys()
                    ].map(num => (
                      <button
                      key={num}
                      onClick={()=> setPage(num + 1)}
                      className={`btn btn=sm ${page === num + 1 ? 'btn-primary' : ''}`}
                      
                      >
                        {num + 1}

                      </button>
                    ))}
                    <button disabled={page === totalPages}
                    onClick={()=> setPage(page + 1)}
                    className='btn btn-sm bg-primary/20'
                    >
                      Next
                    </button>

                  </div>
    </div>
    );
};

export default ManageDecorators;