import React from 'react';
// import DisplayCard from '../Tool/displayCard'; 
import Banner from '../Banner/Banner.js';
import bannerImage from '../../Assests/Image/Banner3.jpg'
import CardList from '../MyCard';
import WhyChooseBarbieLoan from '../Why';
import '../Why/WhyChooseBarbieLoan.css';
import LoanFAQSection from '../Faq/index.js';
import EMIcalculator from '../Emi'


const Home = () => {                
  return (
    
     <div>
      <Banner imageSrc={bannerImage} text="India's trusted plateform for loan" text1="Easy way to  take quick loan" />
      {/* <DisplayCard/> */}
      <CardList/>
      <EMIcalculator/>
      <WhyChooseBarbieLoan/>
      <LoanFAQSection/>
      </div>
      
      

    
  );
};

export default Home;
