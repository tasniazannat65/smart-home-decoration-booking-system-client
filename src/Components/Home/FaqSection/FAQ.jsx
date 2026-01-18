import React from 'react';
import Container from '../../Shared/Container/Container';
import Heading from '../../Shared/Heading/Heading';
const faqs = [
    {
        question: 'How early should I book a decoration service?',
        answer: 'We recommend booking at least 7 to 14 days in advance to ensure availability, especially during peak seasons.'
    },
    {
        question: 'Can I customize the decoration based on my preference?',
        answer: 'Yes, absolutely. We work closely with you to customize designs, colors, and themes according to your event needs.'
    },
    {
        question: 'Do you provide decorators along with the service?',
        answer: 'Yes, all our services include professional and experienced decorators for setup and execution.'
    },
    {
        question: 'What areas do you provide services in?',
        answer: 'We currently provide services in selected cities and surrounding areas. Our coverage is expanding continuously.'
    },
    {
        question: 'What happens if I need to cancel or reschedule?',
        answer: 'You can reschedule or cancel based on our policy. Please contact us as early as possible for smooth coordination.'
    }
]

const FAQ = () => {
    return (
        <div className='pt-6 md:pt-12 lg:pt-12 bg-base-100'>
            <Container>
                <Heading title="Frequently Asked Questions" subtitle="Find answers to common questions about our decoration services." center/>

                <div className='max-w-7xl mx-auto mt-8 space-y-4'>
                    {
                        faqs.map((faq, index)=> (
                            <div
                            key={index}
                            className='collapse collapse-arrow bg-base-200 border border-base-300 rounded-xl'
                            >
                                <input type="checkbox" />
                                <div className='collapse-title text-lg font-semibold text-accent'>
                                    {faq.question}

                                </div>
                                <div className='collapse-content'>
                                    <p className='text-neutral leading-relaxed'>
                                        {faq.answer}
                                    </p>

                                </div>

                            </div>
                        ))
                    }

                </div>
            </Container>
            
        </div>
    );
};

export default FAQ;