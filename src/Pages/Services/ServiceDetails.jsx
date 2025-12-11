import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Shared/Loading/Loading';
import Heading from '../../Components/Shared/Heading/Heading';
import Container from '../../Components/Shared/Container/Container';
import BookingButton from '../../Components/Shared/Button/BookingButton/BookingButton';

const ServiceDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {data: service={}, isLoading} = useQuery({
        queryKey: ['service', id],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/services/${id}`);
            return res.data;

        }
    })
    if(isLoading){
        return <Loading/>
    }
    return (
       <Container>
        <div className='flex flex-col md:flex-row lg:flex-row items-center gap-8 my-16 '>
            <div className='flex-1'>
                <img src={service.image} alt={service.service_name} className='w-full h-80 md:h-[400px] lg:h-[500px] rounded-xl shadow-lg object-cover hover:scale-105 transition-transform duration-300' />


            </div>
            <div className='flex-1 bg-base-200 rounded-xl shadow-lg p-6 space-y-5 border border-primary/25'>
            <Heading title={service.service_name}/>
            <p className='text-neutral text-sm md:text-base lg:text-lg font-medium'>{service.description}</p>
             <div className='flex items-center justify-between'>
                <p className=' text-primary font-semibold text-lg'>৳{service.cost} <span className='text-sm text-neutral'>{service.unit}</span></p>
            <p className='badge bg-primary rounded-full text-white py-4 px-6'>{service.service_category}</p>
            </div>
            <BookingButton service={service}/>
            


            </div>

        </div>
         
       </Container>
    );
};

export default ServiceDetails;