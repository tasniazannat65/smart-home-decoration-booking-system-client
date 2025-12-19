import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Heading from '../../../../Components/Shared/Heading/Heading';
import { IoMdAdd } from 'react-icons/io';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import AddServiceModal from '../../../../Components/Modal/AddServiceModal';
import Swal from 'sweetalert2';
import EditServiceModal from '../../../../Components/Modal/EditServiceModal';
import Loading from '../../../../Components/Shared/Loading/Loading';
import ManagePackages from './ManagePackages';


const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editService, setEditService] = useState(null);
      const [search, setSearch] = useState("");
      const [category, setCategory] = useState('');
      const [page, setPage] = useState(1);
      const limit = 5;
  
  const {data, refetch, isLoading} = useQuery({
    queryKey: ['admin-services', search, category, page, limit ],
    queryFn: async()=>{
      const res = await axiosSecure.get('/services', {
        params: {admin: true,
          search,
          category,
          page, limit
        }
      });
      return res.data;
    }
  })
  const services = data?.services || [];
  const totalPages = data?.totalPages || 1;
  const {data: allServices} = useQuery({
    queryKey: ['all-services'],
    queryFn: async ()=> {
      const res = await axiosSecure.get('/services/all');
      return res.data.services;
    }
  })

 

  const handleDeleteService = (id)=>{
     Swal.fire({
          title: "Are you sure?",
          text: "This service will be deleted!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4F46E5",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/services/${id}`).then((res) => {
              if (res.data.deletedCount) {
                refetch();
                Swal.fire({
                  title: "Deleted!",
                  text: "Services deleted successfully.",
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
          <title>Laxius Decor || Manage Services</title>
            <Heading title="Manage Services & Packages" center/>
             <Tabs>
    <TabList className='flex border-b-2 border-gray-200 mb-4'>
      <Tab className="text-primary px-4 py-2 cursor-pointer font-medium " selectedClassName='border-b-2 border-primary text-secondary'>Services</Tab>
      <Tab className='text-primary px-4 py-2 cursor-pointer font-medium ' selectedClassName='border-b-2 border-primary text-secondary'>Packages</Tab>
    </TabList>

    <TabPanel>
        <div className='p-4 bg-white shadow rounded-lg'>
            <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold text-accent'>Services</h2>
            <button onClick={()=> setIsOpen(true)} className='bg-primary text-white px-4 py-2
             rounded-md hover:bg-secondary flex items-center'>
                <IoMdAdd size={20}/>

                Add Service</button>
                <AddServiceModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch}/>
            </div>
            <div className='mb-4 flex gap-2'>
                <input type="text" placeholder='Search Services...' value={search} onChange={(e)=> {setSearch(e.target.value);
                  setPage(1);
                }}  className='border px-2 py-1 rounded focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md' />
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
            
                          <th className="text-primary font-bold text-lg">Service Name</th>
                          <th className="text-primary font-bold text-lg">Category</th>
                          <th className="text-primary font-bold text-lg">Cost</th>
                          <th className="text-primary font-bold text-lg">Unit</th>
                          
                          <th className="text-primary font-bold text-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                       {
                        services.map((service, index)=> (
                            <tr key={service._id}>
                            <td className="p-2">{index + 1 + (page - 1) * limit}</td>
                            <td className="p-2 ">{service.service_name}</td>
                            <td className="p-2 ">{service.service_category}</td>
                            <td className="p-2">
                              {service.cost}

                            </td>
                            <td className="p-2">
                              {service.unit}
                             
                              
                            </td>
            
                            <td className="flex items-center gap-2 flex-col md:flex-row lg:flex-row p-2">
                              <div>
                                <button onClick={()=> {
                                  setEditService(service);
                                  setIsEditOpen(true);
                                }}
                                  className="btn bg-primary hover:bg-secondary text-white font-semibold rounded-md"
                                >
                                  <FaEdit size={20}/>
                                 
                                  
                                </button>
                              
                               
                              </div>
                              <button onClick={()=> handleDeleteService(service._id)}
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
                                    editService && (
                                       <EditServiceModal isEditOpen={isEditOpen}
                                setIsEditOpen={setIsEditOpen}
                                refetch={refetch}
                                editService={editService}
                                
                                />
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

    </TabPanel>
    <TabPanel>
      <ManagePackages services={allServices || []} />
       

    </TabPanel>
  </Tabs>
        </div>
    );
};

export default ManageServices;