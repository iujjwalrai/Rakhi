import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const LandingPage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-4xl mx-auto">
        <div className={`transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
              Happy
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Raksha Bandhan
            </h1>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dearest Mridula Tripathi
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              To my amazing sister who fills every moment with joy, laughter, and endless debates! 
              This special day reminds me how blessed I am to have you in my life. 
              Your intelligence, your passion for discussions, and your beautiful heart make you truly special.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`animate-bounce bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Star className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>

          <div className="text-2xl text-white/80 mb-8">
            Made with ❤️ by Ujjwal Rai for the most wonderful sister
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;