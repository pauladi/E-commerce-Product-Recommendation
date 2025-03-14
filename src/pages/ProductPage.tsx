
import React from 'react';
import ProductDetail from '@/components/ProductDetail';
import Navbar from '@/components/Navbar';
import { ProductProvider } from '@/contexts/ProductContext';

const ProductPage: React.FC = () => {
  return (
    <ProductProvider>
      <div className="min-h-screen">
        <Navbar />
        <ProductDetail />
      </div>
    </ProductProvider>
  );
};

export default ProductPage;
