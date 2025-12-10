import React from 'react';
import Button from '../Shared/Button/Button';

const ServiceCard = ({service}) => {
    const {image,service_name, description, cost, service_category, unit } = service;
    return (
        <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 border border-gray-200 space-y-4'>
            <img src={image} alt={service_name} className='w-full h-60 object-cover rounded-lg' />
            <h2 className='text-xl font-bold text-accent'>{service_name}</h2>
            <p className='text-neutral text-sm  line-clamp-2'>{description}</p>
            <div className='flex items-center justify-between'>
                <p className=' text-primary font-semibold text-lg'>৳{cost} <span className='text-sm text-neutral'>{unit}</span></p>
            <p className='badge bg-primary rounded-full text-white py-4 px-6'>{service_category}</p>
            </div>
            <Button label="View Details"/>
            
        </div>
    );
};

export default ServiceCard;