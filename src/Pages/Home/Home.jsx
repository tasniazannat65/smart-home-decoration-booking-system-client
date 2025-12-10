import React from 'react';
import HeroBanner from '../../Components/Home/Banner/HeroBanner';
import LatestServices from '../../Components/Home/LatestService/LatestServices';

const Home = () => {
    return (
        <div>
            <section>
                <HeroBanner/>
            </section>
            <section>
                <LatestServices/>
            </section>
            
        
            
        </div>
    );
};

export default Home;