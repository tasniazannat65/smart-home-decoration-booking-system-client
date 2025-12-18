import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {motion} from 'framer-motion';
import Loading from '../../Shared/Loading/Loading';
import Container from '../../Shared/Container/Container';
import Heading from '../../Shared/Heading/Heading';



const TopDecorators = () => {
    const axiosSecure = useAxiosSecure();
    const {data: decorators=[], isLoading} = useQuery({
        queryKey: ['top-decorators'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users/top-decorators')
            console.log(res.data)
            return res.data;
        }
    })
    const sectionVariant = {
        hidden: {opacity: 0, y: 40},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.15
            }
        }


    }
    const cardVariant = {
        hidden: {opacity: 0, y: 30, scale: 0.95},
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {duration: 0.4}
        }
    }
 
  if(isLoading){
    return <Loading/>
  }
    return (
        <motion.section
        variants={sectionVariant}
        initial= 'hidden'
        whileInView="visible"
        viewport={{once: true}}
        className='pb-8 md:pb-10 lg:pb-14'
        
        
        >
           <Container>
            <Heading title="Top Decorators" subtitle="Meet top-rated decorators ready to transform your ideas into reality." center/>
            <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5'
            >
                {
                    decorators.map(decorator => (
                        <motion.div
                        key={decorator._id}
                        variants={cardVariant}
                        whileHover={{scale: 1.05}}
                        className='bg-primary/10 rounded-2xl shadow-lg p-6 text-center cursor-pointer transition'
                        
                        
                        >
                            <img src={decorator.photoURL || ''} alt={decorator.displayName} className='w-24 h-24 mx-auto rounded-full object-cover border-4 border-gray-300' />
                            <h3 className='text-lg font-semibold mt-4'>{decorator.displayName}</h3>
                            <p className='text-sm text-gray-500 mt-1'>{decorator.rating || 4.8}</p>
                        <div className='flex flex-wrap justify-center gap-2 mt-4'>
                            {
                                (decorator.specialties || ['Wedding', 'Home Decor']).map(
                                    (item, index)=> (
                                        <span key={index}
                                        className='px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full'>
                                            {item}


                                        </span>
                                    )
                                )
                            }

                        </div>

                        </motion.div>

                    ))
                }

            </motion.div>

           </Container>


        </motion.section>
  
  );
};



export default TopDecorators;