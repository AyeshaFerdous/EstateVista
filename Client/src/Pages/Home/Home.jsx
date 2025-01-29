import React from 'react';
import Slider from './Slider';
import GridLayout from './GridLayout';
import AdvertisementSection from './AdvertisementSection';
import LatestReviews from './LatestReviews';

const Home = () => {
    return (
        <div>
           <Slider/>
           <AdvertisementSection/>
           <LatestReviews/>
            <GridLayout/>
        </div>
    );
};

export default Home;