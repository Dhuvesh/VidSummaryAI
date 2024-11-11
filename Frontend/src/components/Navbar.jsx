// Navbar.js
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown,
  Menu,
  X,
  Settings,
  BookOpen,
  BarChart,
  HelpCircle,
  Users,
  Zap
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            VidSummaryAI
            </span>
          </a>
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
              Sign In
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        } overflow-hidden bg-gray-900`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          
          
          <div className="pt-4 border-t border-gray-800">
            <button className="w-full mb-2 p-2 text-gray-300 hover:text-blue-400 transition-colors">
              Sign In
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;