import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const mockAIResponse = [
  {
    id: 1,
    name: "Taj Mahal",
    category: "Heritage",
    location: "Agra, Uttar Pradesh",
    description: "Iconic marble mausoleum and symbol of love.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Varanasi",
    category: "Spiritual",
    location: "Uttar Pradesh",
    description: "One of the oldest living cities in the world.",
    image: "https://images.unsplash.com/photo-1561361513-35e6e9c9bea2?q=80&w=1000&auto=format&fit=crop"
  },
];

const IndiBotApp = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Namaste! I am IndiBot 🤖. Ask me anything about traveling in India!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        type: "bot",
        text: "Here are some top recommendations for you:",
        data: mockAIResponse
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in">
      {/* HEADER */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold mb-2">IndiBot AI 🇮🇳</h2>
        <p className="text-gray-400">Your personal travel companion</p>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 glass-card rounded-2xl p-6 overflow-y-auto mb-6 flex flex-col gap-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.type === "user" ? "bg-orange-600 text-white rounded-tr-sm" : "bg-white/10 text-gray-200 rounded-tl-sm"}`}>
              <p className="leading-relaxed">{msg.text}</p>

              {/* RENDER PLACES IF DATA EXISTS */}
              {msg.data && (
                <div className="mt-4 grid gap-4">
                  {msg.data.map(place => (
                    <div key={place.id} className="bg-black/40 p-3 rounded-xl flex gap-4 hover:bg-black/60 transition cursor-pointer">
                      <img src={place.image} alt={place.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-bold text-orange-400">{place.name}</h4>
                        <p className="text-xs text-gray-400 mb-1">{place.location}</p>
                        <Link to={`/app/place/${place.id}`} className="text-xs underline text-white">View Details</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-gray-400 px-4 py-3 rounded-2xl rounded-tl-sm text-sm italic">
              IndiBot is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="glass-panel p-2 rounded-full flex items-center gap-2">
        <input
          className="flex-1 bg-transparent border-none text-white px-6 py-3 focus:outline-none placeholder:text-gray-500"
          placeholder="Ask me e.g. 'Best places to visit in Kerala in December'..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IndiBotApp;
