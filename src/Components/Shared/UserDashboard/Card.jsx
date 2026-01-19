import React from 'react';

const Card = ({icon, value, label}) => {
    return (
        <div className='bg-secondary/10 p-4 rounded-xl shadow-lg flex flex-col items-center'>
                   <div className='text-3xl text-primary mb-2'>{icon}</div>         
                         <p className='text-xl font-bold'>{value}</p>
                         <p className='text-neutral text-sm'>{label}</p>
                        </div>
    );
};

export default Card;