
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Update scroll state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 smooth-transition"
          >
            <span className="text-xl font-medium tracking-tight">Curated</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="nav-link text-sm font-medium">
              Home
            </Link>
            <Link to="/shop" className="nav-link text-sm font-medium">
              Shop
            </Link>
            <Link to="/collections" className="nav-link text-sm font-medium">
              Collections
            </Link>
            <Link to="/about" className="nav-link text-sm font-medium">
              About
            </Link>
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={20} />
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className={`
            absolute top-16 left-0 right-0 bottom-0 h-[calc(100vh-4rem)]
            bg-white dark:bg-gray-900 
            animate-slide-in
            z-50
          `}>
            <div className="flex flex-col px-4 pt-8 space-y-8 text-center">
              <Link 
                to="/"
                className="text-lg font-medium py-2 hover:bg-secondary/50 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/shop"
                className="text-lg font-medium py-2 hover:bg-secondary/50 rounded-md transition-colors"
              >
                Shop
              </Link>
              <Link 
                to="/collections"
                className="text-lg font-medium py-2 hover:bg-secondary/50 rounded-md transition-colors"
              >
                Collections
              </Link>
              <Link 
                to="/about"
                className="text-lg font-medium py-2 hover:bg-secondary/50 rounded-md transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
