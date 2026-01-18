import React from 'react';
import { FaArrowRight, FaClock, FaCrown, FaSmile, FaUsers } from 'react-icons/fa';
import Container from '../../Shared/Container/Container';
import Heading from '../../Shared/Heading/Heading';

const features = [
    {
        icon:<FaCrown/>,
        title: 'Premium Decoration Quality',
        description: 'We use high-quality materials and modern designs to create elegant and unforgettable decorations for every event.',
        number: '01'
    },
    {
        icon:<FaUsers/>,
        title: 'Experienced Decorators',
        description: 'Our professional decorators have years of experience in weddings, home decor, and corporate events.',
        number: '02'
    },
    {
        icon:<FaClock/>,
        title: 'On-Time & Hassle-Free Service',
        description: 'We value your time. Our team ensures timely setup and smooth execution without any stress.',
        number: '03'
    },
    {
        icon:<FaSmile/>,
        title: '100% Customer Satisfaction',
        description: 'Your satisfaction is our priority. We work closely with you to bring your vision to life perfectly.',
        number: '04'
    },
]

const WhyChooseUs = () => {
    return (
        <div className='pt-6 md:pt-8 lg:pt-12 relative overflow-hidden'>
            <div className='absolute inset-0 opacity-5'>
                <div className='absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full animate-pulse '></div>
                <div className='absolute bottom-20 right-20 w-40 h-40 border-2 border-secondary rounded-full animate-pulse delay-300'></div>
                <div className='absolute top-1/2 left-1/3 w-24 h-24 border-2 border-primary rounded-full animate-pulse delay-500'></div>

            </div>
            <Container>
                <div className='relative z-10'>
                    <div className='mb-8'>
                        <Heading title="Why Choose Laxius Decor" subtitle="We combine creativity, experience, and dedication to make your moments truly special." center/>

                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {
                            features.map((item, index)=> (
                                <div
                                key={index}
                                className='group relative'
                                style={{animationDelay: `${index * 100}ms`}}
                                >
                                    <div className='absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-10'></div>
                                    <div className='relative bg-base-100 rounded-xl p-6 shadow-xl border-2 border-base-300 group-hover:border-primary transition-all duration-300 h-full'>
                                        <div className='absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform'>
                                            {item.number}
                                        </div>
                                        <div className='relative mb-6'>
                                            <div className='w-20 h-20 mx-auto relative'>
                                                <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 transform rotate-45 rounded-lg'></div>
                                                <div className='absolute inset-2 bg-base-100 transform rotate-45 rounded-lg'></div>
                                                <div className='absolute inset-0 flex items-center justify-center text-primary text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300'>
                                                    {item.icon}
                                                </div>

                                            </div>

                                        </div>

                                        <div className='text-center space-y-3'>
                                            <h3 className='text-lg font-bold text-accent group-hover:text-primary transition-colors'>
                                                {item.title}
                                            </h3>
                                            <p className='text-sm text-neutral leading-relaxed'>
                                                {item.description}
                                            </p>

                                        </div>

                                        <div className='mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                                            <div className='flex items-center gap-2 text-primary text-sm font-semibold'>
                                                <span>Learn More</span>
                                                <FaArrowRight className='text-xs'/>

                                            </div>

                                        </div>

                                        <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl'></div>

                                    </div>
                                    {
                                        index < features.length - 1 && (
                                            <div className='hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent z-20'></div>
                                        )
                                    }

                                </div>
                            ))
                        }

                    </div>

                </div>
            </Container>
            
        </div>
    );
};

export default WhyChooseUs;