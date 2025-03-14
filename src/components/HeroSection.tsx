
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { useImageLoad } from '@/utils/animations';

const HeroSection: React.FC = () => {
  const { featuredProducts, loading } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Get the first featured product or a placeholder if loading
  const featuredProduct = featuredProducts[activeIndex] || {
    id: "loading",
    name: "Premium Product",
    description: "Discover our featured collection",
    price: 0,
    category: "",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1200",
    rating: 0,
    reviews: 0
  };
  
  const [isImageLoaded] = useImageLoad(featuredProduct.image);
  
  // Auto-rotate featured products every 6 seconds
  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [featuredProducts.length]);
  
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-black/10 z-0"
        style={{
          backgroundImage: `url(${featuredProduct.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isImageLoaded ? 0.9 : 0,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm">
              {loading ? "Loading..." : featuredProduct.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
              {featuredProduct.name}
            </h1>
            
            <p className="text-lg text-muted-foreground backdrop-blur-xs bg-white/5 inline-block">
              {featuredProduct.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={`/product/${featuredProduct.id}`} 
                className="btn-primary flex items-center gap-2 w-fit"
              >
                View Details <ArrowRight size={16} />
              </Link>
              
              <Link 
                to="/shop" 
                className="btn-secondary"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product navigator dots */}
      {featuredProducts.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-primary w-6' : 'bg-primary/30'
              }`}
              aria-label={`View product ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
