export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
}

// Mock data to simulate API responses
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Minimalist Smartwatch",
    description: "A beautifully crafted smartwatch with a minimalist design. Features heart rate monitoring, sleep tracking, and notifications.",
    price: 349.99,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=1000",
    rating: 4.8,
    reviews: 120,
    featured: true
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    description: "Premium sound quality with active noise cancellation. Seamless connectivity and long battery life.",
    price: 199.99,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=1000",
    rating: 4.6,
    reviews: 215
  },
  {
    id: "3",
    name: "Minimalist Desk Lamp",
    description: "Elegant desk lamp with adjustable brightness and color temperature. Perfect for your workspace.",
    price: 129.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1000",
    rating: 4.5,
    reviews: 86
  },
  {
    id: "4",
    name: "Ultra-Thin Laptop",
    description: "Powerful and sleek laptop with all-day battery life. Featuring a stunning display and backlit keyboard.",
    price: 1299.99,
    category: "Computers",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000",
    rating: 4.9,
    reviews: 342,
    featured: true
  },
  {
    id: "5",
    name: "Smart Home Hub",
    description: "Control all your smart home devices with this simple, elegant hub. Voice controlled and easy to set up.",
    price: 149.99,
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000",
    rating: 4.4,
    reviews: 178
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "Crisp, balanced sound with deep bass. Waterproof and dustproof with 24-hour battery life.",
    price: 89.99,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=1000",
    rating: 4.7,
    reviews: 203
  },
  {
    id: "7",
    name: "Premium Notebook Set",
    description: "Set of 3 high-quality notebooks with premium paper. Perfect for journaling or sketching.",
    price: 24.99,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=1000",
    rating: 4.3,
    reviews: 59
  },
  {
    id: "8",
    name: "Mechanical Keyboard",
    description: "Professional-grade mechanical keyboard with customizable backlighting. Precise tactile feedback for an enhanced typing experience.",
    price: 159.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1000",
    rating: 4.8,
    reviews: 127
  }
];

// Simulated browsing history
let userBrowsingHistory: string[] = [];

// Product service class with methods to fetch data
export class ProductService {
  // Method to get all products
  static async getProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockProducts;
  }
  
  // Method to get single product by id
  static async getProductById(id: string): Promise<Product | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    const product = mockProducts.find(p => p.id === id);
    
    if (product) {
      // Add to browsing history when viewing a product
      this.addToBrowsingHistory(id);
      return product;
    }
    
    return null;
  }
  
  // Method to get featured products
  static async getFeaturedProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockProducts.filter(p => p.featured);
  }
  
  // Add product ID to browsing history
  static addToBrowsingHistory(productId: string): void {
    // Remove if already exists (to avoid duplicates)
    userBrowsingHistory = userBrowsingHistory.filter(id => id !== productId);
    
    // Add to the beginning of the array
    userBrowsingHistory.unshift(productId);
    
    // Keep only the last 10 items
    userBrowsingHistory = userBrowsingHistory.slice(0, 10);
    
    // Optionally save to localStorage for persistence
    localStorage.setItem('browsingHistory', JSON.stringify(userBrowsingHistory));
  }
  
  // Load browsing history from localStorage if available
  static loadBrowsingHistory(): void {
    const savedHistory = localStorage.getItem('browsingHistory');
    if (savedHistory) {
      userBrowsingHistory = JSON.parse(savedHistory);
    }
  }
  
  // Get recommendations based on browsing history
  static async getRecommendations(): Promise<Product[]> {
    // Load browsing history if not already loaded
    if (userBrowsingHistory.length === 0) {
      this.loadBrowsingHistory();
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (userBrowsingHistory.length === 0) {
      // If no browsing history, return featured products
      return mockProducts.filter(p => p.featured);
    }
    
    // Get the most recent browsed product
    const lastViewedId = userBrowsingHistory[0];
    const lastViewed = mockProducts.find(p => p.id === lastViewedId);
    
    if (!lastViewed) {
      return mockProducts.slice(0, 4);
    }
    
    // Get products in the same category
    const sameCategory = mockProducts.filter(
      p => p.category === lastViewed.category && p.id !== lastViewedId
    );
    
    // If we have enough in the same category, return those
    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }
    
    // Otherwise, add some products from other categories
    const otherProducts = mockProducts.filter(
      p => p.category !== lastViewed.category && !userBrowsingHistory.includes(p.id)
    );
    
    return [...sameCategory, ...otherProducts].slice(0, 4);
  }
}
