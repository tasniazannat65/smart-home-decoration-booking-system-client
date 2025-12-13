import React from 'react';
import video from '../../assets/video/video.mp4';
import team from '../../assets/team.webp';
import paint from '../../assets/paint.png';
import clock from '../../assets/clock.png';
import money from '../../assets/salary.png';
import person from '../../assets/person.png';
import team1 from '../../assets/team1.avif';
import team2 from '../../assets/team2.avif';
import team3 from '../../assets/team3.jpg';
import { Link } from 'react-router';
import Container from '../../Components/Shared/Container/Container';
import Heading from '../../Components/Shared/Heading/Heading';

const About = () => {
  return (
    <div className='text-gray-800'>
      <section className='relative h-96 md:h-[500px] lg:h-[600px] w-full overflow-hidden'>
        <video className='absolute inset-0 w-full h-full object-cover' src={video}
        autoPlay
        loop
        muted
        playsInline
        
        
        ></video>
        <div className='absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>Welcome to Laxius Decor</h1>
        <p className='text-lg md:text-xl lg:text-2xl mb-6'>We make your events unforgettable</p>
        <Link to='/services' className='btn bg-primary hover:bg-secondary text-white px-6 py-2 rounded-md'>Explore Services</Link>
        </div>

      </section>

      <Container>
        <section className='pt-8 md:pt-12 lg:pt-14 flex flex-col md:flex-row lg:flex-row items-center gap-8'>
          <img src={team} alt="Our Team" className='w-full md:w-1/2
           lg:w-1/2 rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300' />
           <div className='md:w-1/2 lg:w-1/2'>
<Heading title="About Laxius Decor"/>
<p className='text-neutral mb-1'> At Laxius Decor, we create memorable events tailored to your needs.
            Our experienced team ensures every detail is perfect, from decoration
            to ambience.</p>
            <p className='text-neutral'> Our mission is to transform your vision into reality, making each
            celebration unique and unforgettable.</p>
           </div>

        </section>
       <section className='grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-12 pt-8 md:pt-12 lg:pt-14'>
        <div className='bg-primary/10 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300'>
        <h2 className='text-2xl font-bold text-primary mb-4'>Our Mission</h2>

        <p className='text-neutral'>Our mission is to transform ordinary spaces into extraordinary
            experiences through exceptional home and event decoration services.
            We strive for perfection in every detail, ensuring your special
            moments are unforgettable.</p>

        </div>
        <div className='bg-secondary/10 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300'>
         <h2 className='text-2xl font-bold text-secondary mb-4'>Our Vision</h2>

        <p className='text-neutral'>  Our vision is to be the leading home and event decoration service,
            recognized for creativity, reliability, and customer satisfaction.
            We aim to inspire beauty and elegance in every space we touch.</p>


        </div>

       </section>
       

      </Container>
      <section className='pt-8 md:pt-12 lg:pt-14 bg-gradient-to-b from-gray-50 to-white text-center'>
        <Heading title="Our Core Values" center/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-8 md:px-12 lg:px-14 gap-5 mt-5'>
          {[
            {img: paint, title: "Creative Designs", desc: "Unique decor ideas for every occasion."},
            {img: clock, title: "Timely Delivery", desc: "On-time execution for smooth events."},
            {img: money, title: "Affordable Packages", desc: "Premium services within your budget."},
            {img: person, title: "Customer Satisfaction", desc: "Your happiness is our top priority."}
          ].map((item, index)=> (
            <div key={index} className='group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 '>
              <div className='w-20 h-20 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition'>
              <img src={item.img} className='w-10 h-10' alt={item.title} />

              </div>
              <h3 className='font-semibold text-xl mb-2'>{item.title}</h3>
              <p className='text-neutral text-sm'>{item.desc}</p>

            </div>

          ))
          
          
          }

        </div>

       </section>

       
        <section className='pt-8 md:pt-12 lg:pt-14 bg-gray-50 px-12'>
          <Heading center title="Meet Our Team"/>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-5'>
            {[
              {img: team1, name: "Rahat Haque", role: "Event Designer"},
              {img: team2, name: "Karim Mia", role: "Decorator"},
              {img: team3, name: "Raisa Rahman", role: "Planner"}
            ].map((member, index)=> (
              <div key={index} className='bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group'>
                <div className='overflow-hidden'>
                  <img src={member.img} alt={member.name} className='w-full h-72
                   object-cover group-hover:scale-110 transition duration-500' />

                </div>
                <div className='p-6 text-center'>
                  <h3 className='font-semibold text-xl'>{member.name}</h3>
                  <span className='inline-block mt-2
                   py-1 px-4  text-sm rounded-full bg-primary/10 text-primary'>{member.role}</span>

                </div>


              </div>
            ))
            }

          </div>
        </section>
        <section className='relative mt-8 md:mt-12 lg:mt-14 text-white text-center overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-95'>

          </div>
          <div className='relative z-10 max-w-3xl mx-auto py-8 md:py-12 lg:py-14'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>Ready to make your event unforgettable?</h2>
            <p className='text-[16px] lg:text-lg mb-10 opacity-90'>      Let Laxius Decor bring elegance, creativity and perfection to your special day.
</p>
<button className='px-10 py-4 bg-white text-primary font-semibold rounded-full hover:scale-105 transition duration-300 shadow-lg'>Book Your Event Now</button>
          </div>

        </section>
       
      

      
    </div>
  );
};

export default About;