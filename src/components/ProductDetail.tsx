
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { Product } from '@/services/productService';
import { Star, ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import RecommendationSection from './RecommendationSection';
import { useImageLoad } from '@/utils/animations';
import { toast } from '@/components/ui/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, refreshRecommendations } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const [isImageLoaded] = useImageLoad(product?.image || '');
  
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const productData = await getProduct(id);
        setProduct(productData);
        
        // Refresh recommendations after viewing a product
        if (productData) {
          refreshRecommendations();
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id, getProduct, refreshRecommendations]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} (Qty: ${quantity}) has been added to your cart.`,
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-pulse-subtle">Loading product details...</div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-medium mb-4">Product not found</h2>
        <button onClick={handleGoBack} className="btn-primary flex items-center gap-2">
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen pt-20 pb-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button 
          onClick={handleGoBack}
          className="flex items-center text-sm mb-6 hover:text-primary/80 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-secondary/30 rounded-xl overflow-hidden">
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse-subtle bg-secondary flex items-center justify-center">
                <div className="text-muted-foreground">Loading image...</div>
              </div>
            )}
            
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-sm font-medium text-muted-foreground block mb-1">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-medium mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      } ${
                        i === Math.floor(product.rating) && 
                        product.rating % 1 > 0
                          ? 'fill-gradient-right'
                          : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-2xl font-medium mb-6">${product.price.toFixed(2)}</p>
              
              <p className="text-muted-foreground mb-8">
                {product.description}
              </p>
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center h-10 w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-full w-10 flex items-center justify-center border border-input rounded-l-md bg-transparent text-lg"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-full w-12 border-y border-input bg-transparent text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-full w-10 flex items-center justify-center border border-input rounded-r-md bg-transparent text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex items-center justify-center gap-2 flex-1"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              
              <button
                className="btn-secondary flex items-center justify-center gap-2"
                aria-label="Save to favorites"
              >
                <Heart size={16} />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="mt-20">
        <RecommendationSection />
      </div>
    </main>
  );
};

export default ProductDetail;
