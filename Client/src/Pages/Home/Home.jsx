import React from 'react';
import Slider from './Slider';
import GridLayout from './GridLayout';
import AdvertisementSection from './AdvertisementSection';
import LatestReviews from './LatestReviews';
import Featured from './Shared/Featured';
import Premium from './Premium';
import Newsletter from './Newsletter';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
           <Slider/>
           <AdvertisementSection/>
           <LatestReviews/>
           <Featured/>
           <Premium/>
            <GridLayout/>
            <Newsletter/>
            <FAQ/>
        </div>
    );
};

export default Home;