import React from 'react';
// import DisplayCard from '../Tool/displayCard'; 
import Banner from '../Banner/Banner.js';
import bannerImage from '../../Assests/Image/Banner3.jpg'
import CardList from '../MyCard';
import WhyChooseBarbieLoan from '../Why';
import '../Why/WhyChooseBarbieLoan.css';
import LoanFAQSection from '../Faq/index.js';


const Home = () => {
  return (
    
     <div>
      <Banner imageSrc={bannerImage} text="Easy way to take loan" text1="Fast Loan" />
      {/* <DisplayCard/> */}
      <CardList/>
      <WhyChooseBarbieLoan/>
      <LoanFAQSection/>
      </div>
      
      

    
  );
};

export default Home;
