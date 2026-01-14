import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Bot, Send, Sparkles, User, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { askIndiBot } from '../services/indibotService';

export default function IndiBotApp() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Namaste! I'm IndiBot, your AI travel companion for discovering Bharat. I can help you find heritage sites, nature escapes, spiritual centers, or adventure spots. \n\nWhat are you in the mood for today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { type: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const data = await askIndiBot(currentInput);

      let botResponse;
      if (data.results && data.results.length > 0) {
        botResponse = {
          type: 'bot',
          content: data.message || `I've analyzed your request for "${currentInput}". Here are some recommendations:`,
          results: data.results,
          isAiGenerated: data.aiFallback
        };
      } else {
        botResponse = {
          type: 'bot',
          content: `I'm sorry, I couldn't find any recommendations, even from my external knowledge base. Try searching for something else like "Heritage in Rajasthan".`
        };
      }

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("IndiBot Error:", error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { label: 'Heritage in Agra', query: 'Show me heritage places in Agra' },
    { label: 'Nature in Kerala', query: 'Best nature spots in Kerala' },
    { label: 'Spiritual Sites', query: 'Recommend spiritual destinations' },
    { label: 'Adventure', query: 'Find adventure trips' }
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="bg-orange-100 p-3 rounded-xl">
          <Bot className="h-8 w-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IndiBot Assistant</h1>
          <p className="text-sm text-gray-500">AI-powered travel recommendations for Bharat</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Online</span>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar"
      >
        {messages.map((message, idx) => (
          <div key={idx} className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} gap-2`}>
            <div className={`flex items-start gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`mt-1 p-2 rounded-lg shrink-0 ${message.type === 'user' ? 'bg-orange-600 text-white' : 'bg-white border border-gray-100 shadow-sm text-orange-600'}`}>
                {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${message.type === 'user'
                ? 'bg-orange-600 text-white'
                : 'bg-white border border-gray-100 text-gray-800'
                }`}>
                {message.content}
              </div>
            </div>

            {/* AI Results */}
            {message.results && message.results.length > 0 && (
              <div className="grid gap-3 w-full max-w-[85%] ml-11">
                {message.results.map((dest) => (
                  <Card key={dest._id || dest.id} className="overflow-hidden border-orange-100 hover:border-orange-300 transition-colors shadow-sm relative">
                    {message.isAiGenerated && (
                      <div className="absolute top-2 right-2 z-10">
                        <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-600 border-blue-200">AI Suggestion</Badge>
                      </div>
                    )}
                    <CardContent className="p-0 flex flex-col sm:flex-row items-stretch">
                      <div className="w-full sm:w-32 h-24 bg-gray-100 shrink-0">
                        <img
                          src={dest.images?.[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523'}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-gray-900">{dest.name}</h4>
                            <Badge variant="secondary" className="text-[10px] h-4 bg-orange-50 text-orange-600 border-none">{dest.category?.[0] || dest.category}</Badge>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            {dest.city}, {dest.state}
                          </div>
                        </div>
                        <Button asChild size="sm" variant="outline" className="h-8 text-xs w-fit">
                          <Link to={`/app/place/${dest._id || dest.id}`} className="flex items-center gap-1">
                            Explore <ChevronRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="bg-white border border-gray-100 shadow-sm p-2 rounded-lg text-orange-600">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="h-1.5 w-1.5 bg-orange-600 rounded-full animate-bounce"></div>
                <div className="h-1.5 w-1.5 bg-orange-600 rounded-full animate-bounce delay-100"></div>
                <div className="h-1.5 w-1.5 bg-orange-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-lg space-y-4">
        {messages.length < 3 && !loading && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <Sparkles className="h-4 w-4 text-orange-400 shrink-0" />
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => setInput(p.query)}
                className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-100 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question about India..."
            className="h-12 border-none bg-gray-50 focus:ring-2 focus:ring-orange-600/20"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-12 w-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white border-none shadow-md shadow-orange-600/20"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
