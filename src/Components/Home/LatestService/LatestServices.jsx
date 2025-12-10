import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Container from '../../Shared/Container/Container';
import Heading from '../../Shared/Heading/Heading';
import ServiceCard from '../../ServiceCard/ServiceCard';
import { Link } from 'react-router';
import { FaArrowCircleRight } from 'react-icons/fa';

const LatestServices = () => {
        const axiosSecure = useAxiosSecure();
  
    
    const {data: services=[], isLoading} = useQuery({
        queryKey: ['latest-services'],
        queryFn:  async()=>{
            const res = await axiosSecure.get('/latest-services')
            return res.data
        }
    })
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className='py-6 md:py-8 lg:py-12'>
            <Container>
                <div className='max-w-4xl mx-auto mb-5'>
                    <Heading title="Our Top Decoration Services" subtitle="Explore premium decoration packages for weddings, birthdays, homes, and offices." center/>
                </div>
                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service=> <ServiceCard key={service._id} service={service}/>)
                }
            </div>
            <Link to='/services' className='flex justify-center mb-8 mt-5 '>
                             <button className='relative inline-flex items-center justify-center p-[5px] overflow-hidden font-semibold text-white  cursor-pointer transition-all duration-300 bg-gradient-to-r from-primary via-secondary  to-primary rounded-lg active:scale-90 hover:shadow-lg shadow-xl shadow-secondary/30'>
                           
                            <span className='w-full h-full bg-primary transition-all duration-300 hover:bg-transparent px-10 py-3 rounded-md flex items-center gap-1'>View All Services
                                <FaArrowCircleRight size={20}/>
                            </span>
                          </button>
                         </Link>


            </Container>
            
        </div>
    );
};

export default LatestServices;