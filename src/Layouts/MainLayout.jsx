import React from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Shared/Footer/Footer';
import Loading from '../Components/Shared/Loading/Loading';
import ScrollTop from '../Components/Shared/Scrolltop/ScrollTop';

const MainLayout = () => {
    const navigation = useNavigation();
    return (
        <div>
            <header>
                <nav>
                    <Navbar/>
                </nav>
            </header>
            <main className='min-h-screen pt-20'>
                {
                    navigation.state === 'loading' && (<Loading/>)
                }
                <Outlet/>

                 <section>
                <ScrollTop/>
            </section>
            </main>
            <footer>
                <Footer/>
            </footer>
            
        </div>
    );
};

export default MainLayout;