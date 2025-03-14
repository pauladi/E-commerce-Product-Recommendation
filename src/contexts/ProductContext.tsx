
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductService } from '../services/productService';
import { toast } from '@/components/ui/use-toast';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  recommendations: Product[];
  loading: boolean;
  error: string | null;
  getProduct: (id: string) => Promise<Product | null>;
  refreshRecommendations: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        
        // Load browsing history from localStorage if available
        ProductService.loadBrowsingHistory();
        
        // Fetch initial data
        const [allProducts, featured, recommended] = await Promise.all([
          ProductService.getProducts(),
          ProductService.getFeaturedProducts(),
          ProductService.getRecommendations()
        ]);
        
        setProducts(allProducts);
        setFeaturedProducts(featured);
        setRecommendations(recommended);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    initializeData();
  }, []);
  
  const getProduct = async (id: string): Promise<Product | null> => {
    try {
      setLoading(true);
      const product = await ProductService.getProductById(id);
      
      if (!product) {
        toast({
          title: "Product not found",
          description: "We couldn't find the product you're looking for.",
          variant: "destructive",
        });
        return null;
      }
      
      return product;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: "Failed to load product details. Please try again later.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const refreshRecommendations = async (): Promise<void> => {
    try {
      const newRecommendations = await ProductService.getRecommendations();
      setRecommendations(newRecommendations);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: "Failed to update recommendations. Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        recommendations,
        loading,
        error,
        getProduct,
        refreshRecommendations
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
