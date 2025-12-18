import React from 'react';

const Card = ({title, value}) => {

    return (
        <div className='bg-base-100 shadow rounded-xl p-6 border-l-4 border-primary'>
            <h4 className='text-neutral text-sm'>{title}</h4>
            <h2 className='text-3xl font-bold text-primary mt-2'>{value}</h2>
        </div>
    );
};

export default Card;