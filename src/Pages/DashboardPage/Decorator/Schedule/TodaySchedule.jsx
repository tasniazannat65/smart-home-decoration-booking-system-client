import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Shared/Loading/Loading';
import Heading from '../../../../Components/Shared/Heading/Heading';

const TodaySchedule = () => {
    const axiosSecure = useAxiosSecure();
    const {data: todayJobs = [], isLoading} = useQuery({
        queryKey: ['today-schedule'],
        refetchInterval: 60000,
        queryFn: async()=>{
            const res = await axiosSecure.get('/decorator/today-schedule');
            console.log('schedule', res.data)
            return res.data;
        }

    });
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className='p-6'>
            <Heading title="Today's Schedule" center/>
            {
                todayJobs.length === 0 ? (
                    <p className='text-center text-accent py-10'>
                        No jobs schedule for today
                    </p>
                ) : (
                   <div className="overflow-x-auto rounded-box border-2 border-primary  bg-base-100 mt-5">
                            <table className="table">
                              {/* head */}
                              <thead className="bg-base-200 ">
                                <tr>
                                  <th className="text-primary font-bold text-lg">SL.</th>
                    
                                  <th className="text-primary font-bold text-lg">User</th>
                                  <th className="text-primary font-bold text-lg">Services</th>
                                  <th className="text-primary font-bold text-lg">Location</th>
                                  <th className="text-primary font-bold text-lg">Time</th>
                                  <th className="text-primary font-bold text-lg"> Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {todayJobs.map((job, index) => (
                                  <tr key={job._id}>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2 ">{job.userEmail}</td>
                                    <td className="p-2 ">{job.serviceName || 'No Services'}</td>
                                   
                                    <td className="p-2">{job.location}</td>
                                    <td className='p-2'>
                                        {
                                            job.bookingDate ? new Date(job.bookingDate).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'N/A'
                                        }
                                    </td>
                                    <td className="p-2">
                                     <span
                                     className={`badge ${
                                        job.status === 'completed' ? 'bg-green-600' :
                                        job.status === 'on_the_way' ? 'bg-blue-500' :
                                        job.status === 'materials_ready' ? 'bg-yellow-500' :
                                        job.status === 'planning' ? 'bg-purple-500' : 
                                        'bg-gray-500'
                                     }`}
                                     >
                                        {job.status || 'assigned'}

                                     </span>
                                    </td>
                                   
                    
                                    
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                )
            }
        </div>
    );
};

export default TodaySchedule;