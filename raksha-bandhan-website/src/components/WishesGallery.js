import React from 'react';
import { Star } from 'lucide-react';

const WishesGallery = () => {
  const wishes = [
    "May your debates always be won with grace and wisdom ✨",
    "Wishing you endless opportunities to showcase your brilliant mind 🌟",
    "May every challenge become a stepping stone to your success 🚀",
    "Here's to more intellectual conversations and shared laughter 💫",
    "May your passion for learning never fade and always inspire others 🌸",
    "Wishing you happiness as boundless as your curiosity 🎉",
    "May you always find joy in the little victories and big dreams alike 💝"
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Wishes Gallery
          </h1>
          <p className="text-xl text-white/80">Beautiful wishes for a beautiful soul</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishes.map((wish, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-center">
                <div className="mb-4">
                  <Star className="w-8 h-8 mx-auto text-yellow-400 group-hover:animate-spin" />
                </div>
                <p className="text-white/90 leading-relaxed font-medium">{wish}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">Final Wish</h2>
            <p className="text-xl text-white/90 leading-relaxed mb-6">
              May this Raksha Bandhan bring you all the joy you deserve and remind you 
              that you have a brother who believes in your dreams, celebrates your achievements, 
              and will always be your biggest supporter.
            </p>
            <div className="text-4xl">🎊 Happy Raksha Bandhan, Mridula! 🎊</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishesGallery;