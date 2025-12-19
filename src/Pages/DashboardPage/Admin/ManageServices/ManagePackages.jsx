import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import AddPackageModal from '../../../../Components/Modal/AddPackageModal';
import Swal from 'sweetalert2';
import EditPackagesModal from '../../../../Components/Modal/EditPackagesModal';

const ManagePackages = ({services}) => {
      const axiosSecure = useAxiosSecure();
      const [isOpen, setIsOpen] = useState(false);
        const [isEditOpen, setIsEditOpen] = useState(false);
        const [editPackage, setEditPackage] = useState(null);

     const [search, setSearch] = useState("");
          const [category, setCategory] = useState('');
          const [page, setPage] = useState(1);
          const limit = 5;
     const {data, refetch} = useQuery({
        queryKey: ['admin-packages', search, category, page, limit],
        queryFn: async ()=> {
          const res = await axiosSecure.get(
            `/packages?search=${search}&category=${category}&page=${page}&limit=${limit}`
          )
          return res.data;
        }
      })
      const packages = data?.packages || [];
      const totalPages = data?.totalPages || 1;

      const handleDeletePackage = (id)=>{
         Swal.fire({
                  title: "Are you sure?",
                  text: "This package will be deleted!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#4F46E5",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    axiosSecure.delete(`/packages/${id}`).then((res) => {
                      if (res.data.deletedCount) {
                        refetch();
                        Swal.fire({
                          title: "Deleted!",
                          text: "Packages deleted successfully.",
                          icon: "success",
                        });
                      }
                    });
                  }
                });
      }
    return (
         <div className='p-4 bg-white shadow rounded-lg'>
          <title>Laxius Decor || Manage Packages</title>
            <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold text-accent'>Packages</h2>
            <button onClick={()=> setIsOpen(true)} className='bg-primary text-white px-4 py-2
             rounded-md hover:bg-secondary flex items-center'>
                <IoMdAdd size={20}/>

                Add Packages</button>
                {
                    isOpen && (
                        <AddPackageModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} services={services}/>
                    )
                }
            </div>
            <div className='mb-4 flex gap-2'>
                <input type="text" placeholder='Search package...' value={search} onChange={(e)=>{
                  setSearch(e.target.value);
                  setPage(1);
                }} className='border px-2 py-1 rounded focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md' />
                        <select value={category} onChange={(e)=> {
                          setCategory(e.target.value);
                          setPage(1);
                        }}  className='border border-gray-300 rounded px-2 py-1 shadow-sm bg-white  focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md  '>
  <option value="">All Categories</option>
  <option value="wedding">Wedding</option>
  <option value="home">Home</option>
  <option value="office">Office</option>
  <option value="corporate">Corporate</option>
  <option value="seminar">Seminar</option>
 
</select>

            </div>
            <div className="overflow-x-auto rounded-box border-2 border-primary  bg-base-100 mt-5">
                    <table className="table">
                      {/* head */}
                      <thead className="bg-base-200 ">
                        <tr>
                          <th className="text-primary font-bold text-lg">SL.</th>
            
                          <th className="text-primary font-bold text-lg">Package Name</th>
                          <th className="text-primary font-bold text-lg">Category</th>
                          <th className="text-primary font-bold text-lg">Services Included</th>
                          <th className="text-primary font-bold text-lg">Price</th>
                          
                         
                          <th className="text-primary font-bold text-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                         {
                          packages.map((p, index)=> (
                            <tr key={p._id}>
                            <td className="p-2">{index + 1 + (page - 1) * limit}</td>
                            <td className="p-2 ">{p.package_name}</td>
                            <td className="p-2 ">{p.category}</td>
                            
                            <td className="p-2">
                             {p.services.map(s=> s.service_name).join(', ')}
                              
                            </td>
                            <td className="p-2 font-bold capitalize">{p.price} BDT</td>
            
                            <td className="flex items-center gap-2 flex-col md:flex-row lg:flex-row p-2">
                              <div>
                                <button onClick={()=> {
                                    setEditPackage(p);
                                    setIsEditOpen(true);
                                }}
                                  className="btn bg-primary hover:bg-secondary text-white font-semibold rounded-md"
                                >
                                  <FaEdit size={20}/>
                                  
                                </button>
                            
                               
                              </div>
                              <button onClick={()=> handleDeletePackage(p._id)}
                                className="btn bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                              >
                                <FaTrashAlt size={20}/>
                              </button>
                            </td>
                          </tr>
                          ))
                         }
                      </tbody>
                    </table>
                        {
                                  editPackage && (
                                    <EditPackagesModal  isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} editPackage={editPackage} services={services} refetch={refetch}/>


                                  )

                                  
                                }
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

export default ManagePackages;