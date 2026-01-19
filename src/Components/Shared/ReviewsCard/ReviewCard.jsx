import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaQuoteLeft, FaStar } from 'react-icons/fa';

const ReviewCard = ({review}) => {

    return (
        <motion.div
        whileHover={{scale: 1.05}}
        className='min-w-[320px] bg-base-100 rounded-xl shadow-xl border-2 border-base-300 hover:border-primary/50 transition-colors duration-300 overflow-hidden group'
        >
            <div className='h-2 bg-gradient-to-r from-primary to-secondary'>

            </div>
            <div className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                        <div className='relative'>
                            <img src={review.userPhoto} alt={review.userName}
                            className='w-14 h-14 rounded-full object-cover border-2 border-base-300 group-hover:border-primary transition-colors'

                            />
                            <div className='absolute -bottom-1 -right-1 bg-success rounded-full p-1 border-2 border-base-100'>
         
<FaCheck className="w-3 h-3 text-white"/>


                            </div>

                        </div>
                        <div>
                            <p className='font-bold text-accent group-hover:text-primary transition-colors'>
                                {review.userName}
                            </p>
                            <div className='flex items-center gap-1 mt-1'>
                                {[...Array(5)].map((_, i)=> (
                                    <FaStar key={i} size={14} className={`${ i < review.rating ? 'text-warning' : 'text-base-300'}`}/>

                                ))}
                                <span className='text-xs text-neutral ml-1'>({review.rating}.0)</span>

                            </div>
                        </div>

                    </div>
                    <div className='bg-primary/10 p-2 rounded-lg'>
                    <FaQuoteLeft className='text-primary text-lg'/>

                    </div>

                </div>
                <div className='mb-4 relative'>
                    <p className='text-neutral text-sm leading-relaxed line-clamp-4'>
                        {review.message}
                    </p>

                </div>
    <div className='h-px bg-gradient-to-r from-transparent via-base-300 my-1 to-transparent'></div>
    <div className='flex items-center justify-between'>
        <div>
            <p className='text-xs text-neutral'>Customer</p>
            <p className='text-sm font-medium text-accent'>{review.userEmail}</p>
        </div>
        <div className='bg-base-200 px-3 py-1 rounded-full'>
            <p className='text-xs font-semibold text-primary'>Verified</p>

        </div>

    </div>

            </div>
            
        </motion.div>
    );
};

export default ReviewCard;