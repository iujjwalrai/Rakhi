import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import MessagesPage from './components/MessagePage';
import SisterChat from './components/SisterChat';
import FestivalPage from './components/FestivalPage';
import CreativeCorner from './components/CreativeCorner';
import WishesGallery from './components/WishesGallery';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'messages':
        return <MessagesPage />;
      case 'sister-chat':
        return <SisterChat />;
      case 'festival':
        return <FestivalPage />;
      case 'creative':
        return <CreativeCorner />;
      case 'wishes':
        return <WishesGallery />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-x-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-300/30 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;