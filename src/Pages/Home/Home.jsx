import React from 'react';
import HeroBanner from '../../Components/Home/Banner/HeroBanner';
import LatestServices from '../../Components/Home/LatestService/LatestServices';
import HomeCoverage from '../../Components/Home/HomeCoverage/HomeCoverage';

const Home = () => {
    return (
        <div>
            <section>
                <HeroBanner/>
            </section>
            <section>
                <LatestServices/>
            </section>
            <section>
                <HomeCoverage/>
            </section>
            
        
            
        </div>
    );
};

export default Home;