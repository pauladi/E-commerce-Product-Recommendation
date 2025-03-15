
import React, { useEffect } from 'react';
import { useProducts } from '@/contexts/ProductContext';
import ProductCard from './ProductCard';
import { RefreshCw } from 'lucide-react';

const RecommendationSection: React.FC = () => {
  const { recommendations, loading, refreshRecommendations } = useProducts();
  
  // Initial load of recommendations
  useEffect(() => {
    // This would typically happen when a user views a product
    // but we're doing it on component mount for demo purposes
    if (recommendations.length === 0 && !loading) {
      refreshRecommendations();
    }
  }, [recommendations.length, loading, refreshRecommendations]);
  
  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium">Loading recommendations...</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-secondary animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-sm font-medium text-muted-foreground block mb-1">
              Based on your browsing
            </span>
            <h2 className="text-2xl font-medium">Recommended for you</h2>
          </div>
          
          <button 
            onClick={() => refreshRecommendations()}
            className="btn-ghost flex items-center gap-2"
            aria-label="Refresh recommendations"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Using all available recommendations instead of limiting */}
          {recommendations.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
