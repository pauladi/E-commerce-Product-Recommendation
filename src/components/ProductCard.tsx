
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/services/productService';
import { useImageLoad } from '@/utils/animations';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isLoaded, isError] = useImageLoad(product.image);
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group hover-scale block overflow-hidden h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-secondary/30">
        {/* Loading state or error fallback */}
        {(!isLoaded || isError) && (
          <div className="absolute inset-0 animate-pulse-subtle bg-secondary flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        )}
        
        {/* Product image with loading effect */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? "eager" : "lazy"}
        />
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="space-y-1 px-1">
        <h3 className="font-medium text-base leading-tight group-hover:text-primary/80 transition-colors duration-200">
          {product.name}
        </h3>
        
        <div className="flex items-center text-sm space-x-2">
          <div className="flex items-center">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
          <span className="text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <p className="font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
