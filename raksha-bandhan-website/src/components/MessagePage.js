import React from 'react';
import { Heart, Star, Gift, Lightbulb } from 'lucide-react';

const MessagesPage = () => {
  const messages = [
    {
      title: "My Brilliant Sister",
      content: "Your sharp mind and quick wit never cease to amaze me. The way you approach every thought with passion and clarity is truly inspiring.",
      icon: Lightbulb
    },
    {
      title: "Forever Grateful",
      content: "Thank you for being my constant support, my friend, and most importantly, my beloved sister.",
      icon: Heart
    },
    {
      title: "Special Bond",
      content: "No distance can ever break the bond we share. You're not just my sister, you're my inspiration and my pride.",
      icon: Star
    },
    {
      title: "Wishes for You",
      content: "May your life be filled with endless opportunities to shine, debate, learn, and grow. You deserve all the happiness in the world.",
      icon: Gift
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Heartfelt Messages
          </h1>
          <p className="text-xl text-white/80">Words from the heart for my dearest sister</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {messages.map((message, index) => {
            const Icon = message.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full mr-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{message.title}</h3>
                </div>
                <p className="text-white/90 leading-relaxed text-lg">{message.content}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">A Promise</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              No matter where life takes us, in every joy and every challenge,
I promise to always be there for you, to support your dreams,
and to celebrate every achievement. You're my sister, my friend, and my inspiration.
            </p>
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;