import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, Video, MoreVertical, X, CheckCircle2, User, Activity } from 'lucide-react';
import { Link } from 'react-router';

type MoodBookend = 'PENDING_START' | 'ACTIVE' | 'PENDING_END' | 'COMPLETED';

export default function ChatPage() {
  const [sessionState, setSessionState] = useState<MoodBookend>('PENDING_START');
  const [moodBefore, setMoodBefore] = useState<number>(5);
  const [moodAfter, setMoodAfter] = useState<number>(5);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm here. How has your week been since we last spoke?", sender: 'therapist', time: '10:00 AM' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: message, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setMessage('');
    
    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text: "I'm listening. Tell me more about that feeling.", sender: 'therapist', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    }, 1500);
  };

  const endSession = () => {
    setSessionState('PENDING_END');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 relative shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">
            <X size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <User size={20} />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Dr. Sarah Ndizeye</h2>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                In Session
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full flex items-center justify-center transition-colors">
            <Phone size={18} />
          </button>
          <button className="w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full flex items-center justify-center transition-colors">
            <Video size={18} />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-2"></div>
          <button 
            onClick={endSession}
            disabled={sessionState !== 'ACTIVE'}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
              sessionState === 'ACTIVE' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-400'
            }`}
          >
            End Session
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col justify-end">
        {sessionState === 'ACTIVE' ? (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="text-center">
                <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">Session Started - 10:00 AM</span>
              </div>
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-4 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-500/20' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                    }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                    <p className={`text-xs mt-1 text-gray-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-100 p-4">
              <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..." 
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-6 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-white z-20 flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
              {sessionState === 'PENDING_START' && (
                <motion.div 
                  key="start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-md w-full bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-xl text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                    <Activity size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Before we begin</h2>
                  <p className="text-gray-600 mb-8">How are you feeling right now on a scale of 1-10?</p>
                  
                  <div className="mb-8">
                    <input 
                      type="range" min="1" max="10" 
                      value={moodBefore} 
                      onChange={(e) => setMoodBefore(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="flex justify-between mt-3">
                      <span className="text-sm font-bold text-gray-400">Low (1)</span>
                      <span className="text-3xl font-extrabold text-emerald-600">{moodBefore}</span>
                      <span className="text-sm font-bold text-gray-400">Great (10)</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSessionState('ACTIVE')}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-all"
                  >
                    Enter Waiting Room
                  </button>
                </motion.div>
              )}

              {sessionState === 'PENDING_END' && (
                <motion.div 
                  key="end"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-md w-full bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-xl text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
                    <CheckCircle2 size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Complete</h2>
                  <p className="text-gray-600 mb-8">How are you feeling after talking with Dr. Sarah?</p>
                  
                  <div className="mb-8">
                    <input 
                      type="range" min="1" max="10" 
                      value={moodAfter} 
                      onChange={(e) => setMoodAfter(parseInt(e.target.value))}
                      className="w-full accent-blue-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="flex justify-between mt-3">
                      <span className="text-sm font-bold text-gray-400">Low (1)</span>
                      <span className="text-3xl font-extrabold text-blue-600">{moodAfter}</span>
                      <span className="text-sm font-bold text-gray-400">Great (10)</span>
                    </div>
                  </div>

                  <Link 
                    to="/dashboard"
                    className="block w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold shadow-lg transition-all"
                  >
                    Finish & Return to Dashboard
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
