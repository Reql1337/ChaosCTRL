import React from 'react';
import Pricing from '../components/Landing/Pricing';
import FAQ from '../components/Landing/FAQ';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-12">
       <Pricing />
       <FAQ />
    </div>
  );
};

export default PricingPage;