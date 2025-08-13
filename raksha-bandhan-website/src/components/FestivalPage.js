import React from "react";
import { Gift, Star, Heart, Sparkles } from "lucide-react";

const FestivalPage = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
            Raksha Bandhan
          </h1>
          <p className="text-xl text-white/80">
            Celebrating the beautiful bond between siblings
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
              <Gift className="w-8 h-8 mr-3 text-pink-400" />
              The Sacred Thread
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Raksha Bandhan is more than just a festival - it's a celebration
              of the unconditional love, protection, and bond between siblings.
              The sacred thread (rakhi) symbolizes the sister's love and prayers
              for her brother's well-being, and the brother's lifelong promise
              to protect his sister.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Star className="w-6 h-6 mr-3 text-yellow-400" />
                Our Special Bond
              </h3>
              <p className="text-white/90 leading-relaxed">
                While tradition speaks of protection, our bond goes beyond -
                it's about mutual respect, endless support, intellectual
                debates, and the joy of having someone who truly understands
                you.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-red-400" />
                Beyond Distance
              </h3>
              <p className="text-white/90 leading-relaxed">
                Even when we're apart, this festival reminds us that love knows
                no boundaries. Our connection transcends physical distance and
                grows stronger with time.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-500/20 to-violet-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              My Heartfelt Promise
            </h2>
            <div className="text-center">
              <p className="text-2xl text-white/90 mb-4 font-medium italic">
                "Your laughter is my favorite melody, and I promise to protect
                it always."
              </p>
              <p className="text-lg text-white/80 mb-6">
                May your days be wrapped in warmth, your nights lit with hope,
                and every dream you chase find its wings.
              </p>
              <div className="flex justify-center space-x-4">
                <Heart className="w-8 h-8 text-pink-400 animate-bounce" />
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                <Star className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalPage;
