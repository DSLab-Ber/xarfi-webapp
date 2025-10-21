import React from 'react'
import background from './../assets/Background.png'
import Header from '../components/header/Header'
import HeroSection from '../components/home/HeroSection'
import Categories from '../components/home/Categories'
import Salon from '../components/home/Salon'
import Business from '../components/home/Business'
import Testinomial from '../components/home/Testinomial'
import DownloadSection from '../components/home/DownloadSection'
import Footer from '../components/footer/Footer'

export default function Home() {
  return (
   <div className='min-h-screen bg-no-repeat bg-contain' style={{ backgroundImage: `url('${background}')` }}>
                <Header />
                <HeroSection />
                <Categories />
                <Salon />
                <Business />
                <Testinomial />
                <DownloadSection />
                <Footer />
            </div>
  );
}
