import React from 'react';
import HeroBanner from '../../Components/Home/Banner/HeroBanner';
import LatestServices from '../../Components/Home/LatestService/LatestServices';
import HomeCoverage from '../../Components/Home/HomeCoverage/HomeCoverage';
import TopDecorators from '../../Components/Home/TopDecorators/TopDecorators';

const Home = () => {
    return (
        <div>
            <title>Laxius Decor || Home</title>
            <section>
                <HeroBanner/>
            </section>
            <section>
                <LatestServices/>
            </section>
            <section>
                <TopDecorators/>
            </section>
            <section>
                <HomeCoverage/>
            </section>
            
        
            
        </div>
    );
};

export default Home;