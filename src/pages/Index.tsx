
import React from 'react';
import HeroSection from '@/components/HeroSection';
import RecommendationSection from '@/components/RecommendationSection';
import Navbar from '@/components/Navbar';
import { ProductProvider } from '@/contexts/ProductContext';

const Index: React.FC = () => {
  return (
    <ProductProvider>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <RecommendationSection />
      </div>
    </ProductProvider>
  );
};

export default Index;
