import React from 'react';
import { FaArrowRight, FaCalendarCheck, FaClipboardList, FaMagic, FaUserTie } from 'react-icons/fa';
import Container from '../../Shared/Container/Container';
import Heading from '../../Shared/Heading/Heading';

const steps = [
    {
        icon: <FaClipboardList/>,
        title: 'Choose a Service',
        description: 'Browse our wide range of decoration services and select the one that matches your event and style.',

    },
    {
        icon: <FaCalendarCheck/>,
        title: 'Book Online',
        description: 'Pick your preferred date and place your booking easily through our secure online system.',

    },
    {
        icon: <FaUserTie/>,
        title: 'Decorator Assignment',
        description: 'We assign a professional decorator based on your requirements and event type.',

    },
    {
        icon: <FaMagic/>,
        title: 'Event Day Setup',
        description: 'Sit back and relax while our team transforms your venue into a beautifully decorated space.',

    },


]

const HowItWork = () => {
    return (
        <div className='pt-6 md:pt-8 lg:pt-12 relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl'>

            </div>
            <div className='absolute bottom-0 left-0 w-96 h-96
             bg-secondary/5 rounded-full blur-3xl'></div>

             <Container>
                <div className='relative z-10'>
                    <div className='mb-8'>
                        <Heading title="How It Works" subtitle=" A simple and hassle-free process to make your event truly special." center/>

                    </div>

                    <div className='relative'>
                        <div className='hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-20'></div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {
                                steps.map((step, index)=> (
                                    <div key={index}
                                    className='relative group'
                                    >
                                        {
                                            index < steps.length - 1 && (
                                                <div className='hidden lg:block absolute top-20 -right-8 z-10'>
                                                    <div className='w-12 h-12 bg-base-100 rounded-full flex items-center justify-center shadow-lg border-2 border-base-300 group-hover:border-primary transition-colors  '>
                                                        <FaArrowRight className='text-primary text-sm'/>

                                                    </div>

                                                </div>
                                            )
                                        }

                                        <div className='relative bg-base-100 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-base-300 hover:border-primary/50'>
                                        <div className='absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-base shadow-xl z-20'>
                                            {index + 1}

                                        </div>
                                        <div className='relative mb-4 mt-2'>
                                            <div className='relative w-14 h-14 mx-auto'>
                                                <div className='absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300'>

                                                </div>
                                                <div className='relative w-full h-full bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                                    {step.icon}
                                                </div>

                                                <div className='absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300'>

                                                </div>

                                            </div>


                                        </div>


<div className='text-center space-y-2'>
    <h3 className='text-base font-bold text-accent group-hover:text-primary transition-colors'>
        {step.title}
    </h3>
    <p className='text-xs text-neutral leading-relaxed'>
        {step.description}
    </p>

</div>
<div className='mt-4 flex justify-center gap-1.5'>
    {
        steps.map((_, i)=> (
            <div key={i}
            className={`h-1 rounded-full transition-all duration-300 ${ i <= index ? 'w-6 bg-gradient-to-r from-primary to-secondary' : 'w-3 bg-base-300'}`}
            >

            </div>
        ))
    }

</div>
                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    </div>

                </div>
             </Container>
            
        </div>
    );
};

export default HowItWork;