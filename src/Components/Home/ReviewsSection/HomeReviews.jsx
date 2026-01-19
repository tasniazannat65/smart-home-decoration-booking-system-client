import React, { useEffect, useMemo, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Heading from '../../Shared/Heading/Heading';
import Container from '../../Shared/Container/Container';
import { motion } from 'framer-motion';
import ReviewCard from '../../Shared/ReviewsCard/ReviewCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const HomeReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [current, setCurrent] = useState(0);
    const {data: reviews = [], isLoading} = useQuery({
        queryKey: ['homeReviews'],
        queryFn: async ()=> {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    })
    const limitedReviews = useMemo(()=> reviews.slice(0, 6), [reviews]);
    const total = limitedReviews.length;
    useEffect(()=> {
        if(total === 0) return;
        const timer = setInterval(()=> {
            setCurrent((prev)=> (prev + 1) % total);
        }, 4000);
        return ()=> clearInterval(timer);
    },[total]);
    if(isLoading) return <Loading/>
    if(!total) return null;
    return (
        <div className='pt-6 md:pt-8 lg:pt-12'>
            <Heading title="What Our Clients Say" subtitle="Trusted by customers for quality, creativity, and timely delivery." center/>
            <Container>
                <div className='relative mt-8'>
                    <div className='overflow-hidden'>
                        <div className='relative w-full h-[300px]'>
                            {
                                limitedReviews.map((review, index)=> {
                                    const diff = index - current;
                                    const circularDiff = diff > total / 2 ? diff - total : diff < -total / 2 ? diff + total : diff;
                                    const isActive = circularDiff === 0;
                                    const isLeft = circularDiff === -1;
                                    const isRight = circularDiff === 1;
                                    return (
                                        <motion.div
                                        key={review._id || index}
                                        className="absolute top-0 left-1/2 -translate-x-1/2"
                                        animate={{
                                            x: circularDiff * 260,
                                            scale: isActive ? 1 : isLeft || isRight ? 0.85 : 0.7,
                                            opacity: isActive ? 1 : 0.55,
                                            rotateY: isActive ? 0 : isLeft ? 25 : isRight ? -25 : 0,
                                            zIndex: isActive ? 10 : isLeft || isRight ? 5 : 1,
                                        }}
                                        transition={{duration: 0.6}}

                                        >
                                            <div className='w-[320px]'>
                                                <ReviewCard review={review}/>

                                            </div>

                                        </motion.div>
                                    )
                                })
                            }
                            <div className='absolute inset-0 flex items-center justify-between px-6 pointer-events-none'>
                                <button
                                className='pointer-events-auto btn btn-circle btn-sm bg-base-200 text-primary shadow-lg hover:bg-base-100'
         onClick={()=> setCurrent((prev)=> (prev - 1 + total) % total)}                                >
            <FaChevronLeft/>

                                </button>
                                <button
                                className='pointer-events-auto btn btn-circle btn-sm bg-base-200 text-primary shadow-lg hover:bg-base-100'
         onClick={()=> setCurrent((prev)=> (prev + 1) % total)}                                >
            <FaChevronRight/>

                                </button>

                            </div>

                        </div>

                    </div>

                    <div className='flex justify-center gap-2 mt-4'>
                        {
                            limitedReviews.map((_, index)=> (
                                <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition ${
                                    index === current ? 'bg-primary' : 'bg-base-200'
                                }`}
                                onClick={()=> setCurrent(index)}
                                >

                                </button>
                            ))
                        }

                    </div>

                </div>
            </Container>
            
        </div>
    );
};

export default HomeReviews;