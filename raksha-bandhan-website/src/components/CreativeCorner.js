import React, { useState, useEffect, useRef } from "react";
import {
  Lock,
  Unlock,
  Lightbulb,
  ArrowRight,
  Heart,
  BookOpen,
  Gamepad2,
  PenTool,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Gift,
} from "lucide-react";

const CreativeCorner = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const [currentSection, setCurrentSection] = useState("main");

  // Message Animation States
  const [isWriting, setIsWriting] = useState(false);
  const [writtenText, setWrittenText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showPen, setShowPen] = useState(false);

  // Scrapbook States
  const [currentPage, setCurrentPage] = useState(0);

  // Game States
  const [gameElements, setGameElements] = useState([
    { id: "heart", emoji: "❤️", name: "Love", placed: false, x: 0, y: 0 },
    { id: "rakhi", emoji: "🎗️", name: "Rakhi Bond", placed: false, x: 0, y: 0 },
    {
      id: "laughter",
      emoji: "😊",
      name: "Laughter",
      placed: false,
      x: 0,
      y: 0,
    },
    { id: "trust", emoji: "🤝", name: "Trust", placed: false, x: 0, y: 0 },
  ]);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Poem Generator States
  const [currentPoem, setCurrentPoem] = useState("");
  const [poemIndex, setPoemIndex] = useState(0);

  const personalMessage = `My Dearest Sister Mridula,

You are the most amazing person I know. Your brilliant mind, and your kind heart make you truly special.

I created this just for you because you deserve all the love and creativity in the world. You inspire me every day to be better. I just want a promise to never forget me.

Thank you for being the best sister anyone could ask for. You make life brighter with your presence.

With all my love,
Your Brother Ujjwal❤️`;

  const scrapbookPages = [
    {
      title: "For My Brilliant Sister",
      content:
        "🌟 You shine brighter than all the stars\n💭 Your thoughts are deeper than the ocean\n🎯 Your arguments are sharper than arrows\n❤️ Your heart is warmer than sunshine",
    },
    {
      title: "Our Beautiful Bond",
      content:
        "👫 Two hearts, one bond\n🎗️ Tied together by love\n😄 Sharing laughter and tears\n🤗 Always there for each other",
    },
    {
      title: "What Makes You Special",
      content:
        "🧠 Your incredible intelligence\n💪 Your strength in everything you do\n🌈 The way you see beauty everywhere\n✨ Your ability to make others smile",
    },
    {
      title: "My Promise to You",
      content:
        "🛡️ I'll always protect you\n🎯 I'll always support your dreams\n👂 I'll always listen when you need me\n💝 I'll always cherish our bond",
    },
  ];

  const poemLines = [
    "In your eyes, I see the stars that guide my way",
    "Your laughter is the melody that brightens every day",
    "Sister dear, your wisdom flows like rivers deep and true",
    "In debates you shine so bright, there's no one quite like you",
    "Your strength inspires me to reach for dreams up high",
    "With you beside me always, I can touch the endless sky",
    "Through every storm and sunshine, our bond will never break",
    "For you, my dearest sister, any sacrifice I'd make",
  ];

  useEffect(() => {
    if (isWriting) {
      const words = personalMessage.split(" ");
      let wordIndex = 0;
      let charIndex = 0;
      let currentText = "";

      const writeNextChar = () => {
        if (wordIndex < words.length) {
          const currentWord = words[wordIndex];

          if (charIndex < currentWord.length) {
            currentText += currentWord[charIndex];
            setWrittenText(currentText);
            charIndex++;

            // Variable speed for more natural handwriting
            const delay = Math.random() * 100 + 50; // 50-150ms
            setTimeout(writeNextChar, delay);
          } else {
            // Finished current word, add space and move to next
            if (wordIndex < words.length - 1) {
              currentText += " ";
              setWrittenText(currentText);
            }
            wordIndex++;
            charIndex = 0;
            setCurrentWordIndex(wordIndex);

            // Longer pause between words
            const wordPause = Math.random() * 200 + 100; // 100-300ms
            setTimeout(writeNextChar, wordPause);
          }
        } else {
          setIsWriting(false);
          setShowPen(false);
        }
      };

      setShowPen(true);
      setCurrentWordIndex(0);
      writeNextChar();
    }
  }, [isWriting]);

  const handleSubmit = () => {
    if (
      answer.toLowerCase().includes("shinta") &&
      answer.toLowerCase().includes("ma'am")
    ) {
      setIsUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const startMessageAnimation = () => {
    setCurrentSection("message");
    setIsWriting(true);
    setWrittenText("");
    setCurrentWordIndex(0);
  };

  const generatePoem = () => {
    const shuffled = [...poemLines].sort(() => Math.random() - 0.5);
    const selectedLines = shuffled.slice(0, 4);
    setCurrentPoem(selectedLines.join("\n\n"));
    setPoemIndex((prev) => prev + 1);
  };

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData("text/plain", element.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const elementId = e.dataTransfer.getData("text/plain");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGameElements((prev) =>
      prev.map((el) =>
        el.id === elementId ? { ...el, placed: true, x: x - 25, y: y - 25 } : el
      )
    );

    const allPlaced = gameElements.every((el) =>
      el.id === elementId ? true : el.placed
    );
    if (allPlaced) {
      setTimeout(() => setGameCompleted(true), 500);
    }
  };

  const resetGame = () => {
    setGameElements((prev) =>
      prev.map((el) => ({ ...el, placed: false, x: 0, y: 0 }))
    );
    setGameCompleted(false);
  };

  const debateTopics = [
    {
      topic: "Technology vs. Human Connection",
      description:
        "Has technology brought us closer or driven us apart? A classic debate that you'd probably have strong opinions about!",
    },
    {
      topic: "Education System Reform",
      description:
        "Should the education system focus more on creativity or standardized learning? Perfect for your analytical mind!",
    },
    {
      topic: "Social Media: Boon or Bane",
      description:
        "Does social media empower voices or create echo chambers? A contemporary debate for the modern thinker!",
    },
    {
      topic: "Climate Change Solutions",
      description:
        "Individual responsibility vs. corporate accountability - where should the focus be?",
    },
  ];

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <Lock className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Protected Section
            </h2>
            <p className="text-white/80 mb-6">
              This special creative corner is just for you! Answer this question
              to unlock:
            </p>
            <p className="text-lg text-white mb-4 font-medium">
              What was the name of the class teacher of 8th class?
            </p>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 mb-4"
              placeholder="Enter the answer..."
            />
            {showError && (
              <p className="text-red-400 mb-4">Incorrect answer! Try again.</p>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <Unlock className="w-5 h-5 mr-2" />
              Unlock Creative Corner
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === "message") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                A Personal Message
              </h2>
              <button
                onClick={() => setCurrentSection("main")}
                className="text-white/70 hover:text-white"
              >
                ← Back
              </button>
            </div>
            <div className="relative">
              <div className="text-white/90 text-2xl leading-relaxed font-serif min-h-96 whitespace-pre-line relative">
                <span className="handwriting-text">{writtenText}</span>
                {showPen && (
                  <span className="inline-block w-0.5 h-6 bg-blue-400 animate-pulse ml-1 relative">
                    <span className="absolute -top-2 -left-1 text-blue-400">
                      ✒️
                    </span>
                  </span>
                )}
              </div>
            </div>
            {!isWriting && writtenText && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsWriting(true);
                    setWrittenText("");
                    setCurrentWordIndex(0);
                  }}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
                >
                  Write Again ❤️
                </button>
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .handwriting-text {
            font-family: "Brush Script MT", "Lucida Handwriting", cursive;
            background: linear-gradient(45deg, #60a5fa, #a78bfa, #fb7185);
            background-size: 300% 300%;
            animation: gradient-flow 3s ease infinite;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
          }

          @keyframes gradient-flow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </div>
    );
  }

  if (currentSection === "scrapbook") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Digital Scrapbook
              </h2>
              <button
                onClick={() => setCurrentSection("main")}
                className="text-white/70 hover:text-white"
              >
                ← Back
              </button>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/20 to-white/5 p-8 mb-6 min-h-80">
              <h3 className="text-xl font-bold text-white mb-4">
                {scrapbookPages[currentPage].title}
              </h3>
              <div className="text-white/90 text-lg leading-relaxed whitespace-pre-line">
                {scrapbookPages[currentPage].content}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                ← Previous
              </button>
              <span className="text-white/70">
                Page {currentPage + 1} of {scrapbookPages.length}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(scrapbookPages.length - 1, prev + 1)
                  )
                }
                disabled={currentPage === scrapbookPages.length - 1}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === "game") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Gamepad2 className="w-6 h-6 mr-2" />
                Build-a-Bond Mini Game
              </h2>
              <button
                onClick={() => setCurrentSection("main")}
                className="text-white/70 hover:text-white"
              >
                ← Back
              </button>
            </div>

            <p className="text-white/90 mb-6 text-center">
              Drag and drop the elements to build our beautiful sibling bond! 💝
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Elements to Use:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {gameElements
                    .filter((el) => !el.placed)
                    .map((element) => (
                      <div
                        key={element.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, element)}
                        className="bg-white/20 rounded-lg p-4 text-center cursor-move hover:bg-white/30 transition-all duration-300"
                      >
                        <div className="text-3xl mb-2">{element.emoji}</div>
                        <div className="text-white text-sm">{element.name}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Bond Canvas:
                </h3>
                <div
                  className="relative bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg h-64 border-2 border-dashed border-white/30"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {gameElements
                    .filter((el) => el.placed)
                    .map((element) => (
                      <div
                        key={element.id}
                        className="absolute text-3xl animate-bounce"
                        style={{ left: element.x, top: element.y }}
                      >
                        {element.emoji}
                      </div>
                    ))}
                  {gameCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/20 rounded-lg">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎉</div>
                        <div className="text-white font-bold">
                          See? You built our bond, just like in real life ❤️
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={resetGame}
                  className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === "poems") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <PenTool className="w-6 h-6 mr-2" />
                Custom Poem Generator
              </h2>
              <button
                onClick={() => setCurrentSection("main")}
                className="text-white/70 hover:text-white"
              >
                ← Back
              </button>
            </div>

            <div className="text-center mb-8">
              <button
                onClick={generatePoem}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center mx-auto"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate New Poem
              </button>
            </div>

            {currentPoem && (
              <div className="bg-gradient-to-br from-white/20 to-white/5 rounded-xl p-8 mb-6">
                <h3 className="text-lg font-bold text-white mb-4 text-center">
                  Poem #{poemIndex} - Just For You ✨
                </h3>
                <div className="text-white/90 text-lg leading-relaxed text-center italic whitespace-pre-line">
                  {currentPoem}
                </div>
              </div>
            )}

            {!currentPoem && (
              <div className="text-center text-white/70 py-12">
                <Gift className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">
                  Click the button above to generate your first personalized
                  poem!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Creative Corner
          </h1>
          <p className="text-xl text-white/80">
            For my brilliant debater sister!
          </p>
        </div>

        {/* Special Features Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={startMessageAnimation}
            className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 text-left"
          >
            <Heart className="w-8 h-8 text-red-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">
              Personal Message
            </h3>
            <p className="text-white/90">
              A heartfelt letter written just for you with a beautiful typing
              animation
            </p>
          </button>

          <button
            onClick={() => setCurrentSection("scrapbook")}
            className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 text-left"
          >
            <BookOpen className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">
              Digital Scrapbook
            </h3>
            <p className="text-white/90">
              Flip through pages of poems and feelings I've written about our
              bond
            </p>
          </button>

          <button
            onClick={() => setCurrentSection("game")}
            className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 text-left"
          >
            <Gamepad2 className="w-8 h-8 text-orange-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">
              Build-a-Bond Game
            </h3>
            <p className="text-white/90">
              A fun mini-game where you build our sibling bond piece by piece
            </p>
          </button>

          <button
            onClick={() => setCurrentSection("poems")}
            className="bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 text-left"
          >
            <PenTool className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">
              Poem Generator
            </h3>
            <p className="text-white/90">
              Generate endless personalized poems with my pre-written verses
            </p>
          </button>
        </div>

        {/* Debate Topics Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-yellow-400" />
            Welcome to Your Debate Arena!
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            I know how much you love debates and intellectual discussions!
            Here's a collection of thought-provoking topics just for you. Each
            one is carefully chosen knowing your brilliant mind and passion for
            meaningful conversations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {debateTopics.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                {item.topic}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-4">
                <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors">
                  Start Thinking <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Your Debate Superpowers 🌟
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="text-white/90">
                <div className="text-3xl mb-2">🧠</div>
                <div className="font-semibold">Sharp Analysis</div>
              </div>
              <div className="text-white/90">
                <div className="text-3xl mb-2">💭</div>
                <div className="font-semibold">Creative Thinking</div>
              </div>
              <div className="text-white/90">
                <div className="text-3xl mb-2">🗣️</div>
                <div className="font-semibold">Compelling Arguments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeCorner;
