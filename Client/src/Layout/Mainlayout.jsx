import React from 'react';
import Navbar from '../Pages/Home/Shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Home/Shared/Footer';

const Mainlayout = () => {
    const {pathname} = useLocation()
    return (
        <div>
            <Navbar/>
            <div  className={pathname !== '/' ? 'mt-24 ' : "mt-0"}>
            <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default Mainlayout;