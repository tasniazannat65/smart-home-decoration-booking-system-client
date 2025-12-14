import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Heading from '../../../../Components/Shared/Heading/Heading';
import { IoMdAdd } from 'react-icons/io';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const ManageServices = () => {
    return (
        <div>
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
            <button className='bg-primary text-white px-4 py-2
             rounded-md hover:bg-secondary flex items-center'>
                <IoMdAdd size={20}/>

                Add Service</button>
            </div>
            <div className='mb-4 flex gap-2'>
                <input type="text" placeholder='Search...' className='border px-2 py-1 rounded focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md' />
                        <select  className='border border-gray-300 rounded px-2 py-1 shadow-sm bg-white  focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md  '>
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
                          
                          <th className="text-primary font-bold text-lg"> Status</th>
                          <th className="text-primary font-bold text-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                         <tr >
                            <th className="p-2"></th>
                            <td className="p-2 "></td>
                            <td className="p-2 "></td>
                            <td className="p-2">
                            </td>
                            <td className="p-2">
                             
                              
                            </td>
                            <td className="p-2 font-bold capitalize"></td>
            
                            <td className="flex items-center gap-2 flex-col md:flex-row lg:flex-row p-2">
                              <div>
                                <button
                                  className="btn bg-primary hover:bg-secondary text-white font-semibold rounded-md"
                                >
                                  <FaEdit size={20}/>
                                  {/* Edit */}
                                </button>
                               
                              </div>
                              <button
                                className="btn bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                              >
                                <FaTrashAlt size={20}/>
                                {/* Delete */}
                              </button>
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  </div>

        </div>

    </TabPanel>
    <TabPanel>
         <div className='p-4 bg-white shadow rounded-lg'>
            <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold text-accent'>Packages</h2>
            <button className='bg-primary text-white px-4 py-2
             rounded-md hover:bg-secondary flex items-center'>
                <IoMdAdd size={20}/>

                Add Packages</button>
            </div>
            <div className='mb-4 flex gap-2'>
                <input type="text" placeholder='Search...' className='border px-2 py-1 rounded focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md' />
                        <select  className='border border-gray-300 rounded px-2 py-1 shadow-sm bg-white  focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md  '>
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
                         <tr >
                            <th className="p-2"></th>
                            <td className="p-2 "></td>
                            <td className="p-2 "></td>
                            
                            <td className="p-2">
                             
                              
                            </td>
                            <td className="p-2 font-bold capitalize"></td>
            
                            <td className="flex items-center gap-2 flex-col md:flex-row lg:flex-row p-2">
                              <div>
                                <button
                                  className="btn bg-primary hover:bg-secondary text-white font-semibold rounded-md"
                                >
                                  <FaEdit size={20}/>
                                  
                                </button>
                               
                              </div>
                              <button
                                className="btn bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                              >
                                <FaTrashAlt size={20}/>
                              </button>
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  </div>

        </div>

    </TabPanel>
  </Tabs>
        </div>
    );
};

export default ManageServices;