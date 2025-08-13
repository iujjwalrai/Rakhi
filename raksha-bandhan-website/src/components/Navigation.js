import React, { useState, useEffect } from 'react';
import { Heart, Star, Gift, Sparkles, Lock, Unlock, ArrowRight, Home, MessageCircle, Calendar, Lightbulb, Menu, X } from 'lucide-react';

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'festival', label: 'Festival', icon: Calendar },
    { id: 'creative', label: 'Creative Corner', icon: Lightbulb },
    { id: 'wishes', label: 'Wishes', icon: Star }
  ];

  const handleMobileNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">For Mridula</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-white/20 shadow-2xl">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileNavClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 text-left ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white border border-pink-500/30'
                        : 'text-white/90 hover:text-white hover:bg-white/15 hover:scale-105'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-base font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Bottom accent */}
            <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;