import React from 'react';
import HeroBanner from '../../Components/Home/Banner/HeroBanner';
import LatestServices from '../../Components/Home/LatestService/LatestServices';
import HomeCoverage from '../../Components/Home/HomeCoverage/HomeCoverage';
import TopDecorators from '../../Components/Home/TopDecorators/TopDecorators';
import WhyChooseUs from '../../Components/Home/WhyCooseUs/WhyChooseUs';
import HowItWork from '../../Components/Home/HowItWork/HowItWork';
import FAQ from '../../Components/Home/FaqSection/FAQ';
import HomeReviews from '../../Components/Home/ReviewsSection/HomeReviews';

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
                <WhyChooseUs/>
            </section>
            <section>
                <HowItWork/>
            </section>
            <section>
                <HomeReviews/>
            </section>
            <section>
                <TopDecorators/>
            </section>
            <section>
                <FAQ/>
            </section>
            <section>
                <HomeCoverage/>
            </section>
            
        
            
        </div>
    );
};

export default Home;