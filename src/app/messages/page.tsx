"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Phone, Video, X, ArrowLeft, Send, Activity } from "lucide-react";
import { chatService } from "@/services/chatService";

type Message = { id: number; messageText: string; senderType: "USER" | "THERAPIST"; timestamp: string };
type Session = { id: number; therapistName: string; status: string; moodBefore?: string };

// Demo sessions — shown when backend is offline
const DEMO_SESSIONS: Session[] = [
  { id: 1, therapistName: "Dr. Amara Nkosi", status: "ACTIVE" },
  { id: 2, therapistName: "Dr. Jean-Pierre Hakizimana", status: "ACTIVE", moodBefore: "6" },
];

const DEMO_MESSAGES: Message[] = [
  { id: 1, messageText: "Hello! Welcome to our session. How are you feeling today?", senderType: "THERAPIST", timestamp: new Date(Date.now() - 8 * 60000).toISOString() },
  { id: 2, messageText: "I'm feeling a bit anxious, but I'm glad we could meet.", senderType: "USER", timestamp: new Date(Date.now() - 7 * 60000).toISOString() },
  { id: 3, messageText: "That's completely understandable. Can you tell me more about what's been causing the anxiety this week?", senderType: "THERAPIST", timestamp: new Date(Date.now() - 6 * 60000).toISOString() },
  { id: 4, messageText: "Work has been really overwhelming. I've been struggling to sleep and keep worrying about deadlines.", senderType: "USER", timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: 5, messageText: "I hear you. Sleep disruption and work stress often feed into each other. Let's talk about some grounding techniques that may help. Have you tried the 5-4-3-2-1 method?", senderType: "THERAPIST", timestamp: new Date(Date.now() - 3 * 60000).toISOString() },
];

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessagesPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showMoodBefore, setShowMoodBefore] = useState(false);
  const [showMoodAfter, setShowMoodAfter] = useState(false);
  const [moodSlider, setMoodSlider] = useState(5);
  const [isDemoSession, setIsDemoSession] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    fetch(`${BASE}/api/chat/sessions`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setSessions(Array.isArray(data) && data.length > 0 ? data : DEMO_SESSIONS))
      .catch(() => setSessions(DEMO_SESSIONS));
  }, [BASE, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openSession = async (session: Session) => {
    setActiveSession(session);
    setMoodSlider(5);

    // Check if this is a demo session
    const isDemo = DEMO_SESSIONS.some(d => d.id === session.id);
    setIsDemoSession(isDemo);

    if (!session.moodBefore) {
      setShowMoodBefore(true);
      return;
    }

    if (isDemo) {
      setMessages(DEMO_MESSAGES);
      return;
    }

    try {
      const r = await chatService.getMessages(session.id);
      setMessages(r.data);
    } catch { setMessages([]); }

    if (wsRef.current) wsRef.current.close();
    const ws = chatService.createWebSocket(session.id, token);
    ws.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]);
    wsRef.current = ws;
  };

  const submitMoodBefore = async () => {
    if (!activeSession) return;
    if (!isDemoSession) {
      try {
        await chatService.updateMood(activeSession.id, { moodBefore: String(moodSlider) });
      } catch {}
    }
    setActiveSession(prev => prev ? { ...prev, moodBefore: String(moodSlider) } : prev);
    setShowMoodBefore(false);
    if (isDemoSession) {
      setMessages(DEMO_MESSAGES);
    } else {
      try {
        const r = await chatService.getMessages(activeSession.id);
        setMessages(r.data);
      } catch { setMessages([]); }
      if (wsRef.current) wsRef.current.close();
      const ws = chatService.createWebSocket(activeSession.id, token);
      ws.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]);
      wsRef.current = ws;
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const submitMoodAfter = async () => {
    if (!activeSession) return;
    if (!isDemoSession) {
      try {
        await chatService.updateMood(activeSession.id, { moodAfter: String(moodSlider) });
      } catch {}
    }
    if (wsRef.current) wsRef.current.close();
    setShowMoodAfter(false);
    setActiveSession(null);
    setMessages([]);
    setIsDemoSession(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeSession) return;
    setSending(true);
    const text = newMessage.trim();
    setNewMessage("");
    const optimistic: Message = { id: Date.now(), messageText: text, senderType: "USER", timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, optimistic]);
    if (!isDemoSession) {
      try {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ messageText: text, senderType: "USER" }));
        } else {
          await chatService.sendMessage(activeSession.id, text, "USER");
        }
      } catch {}
    }
    setSending(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const endSession = () => {
    setMoodSlider(5);
    setShowMoodAfter(true);
  };

  const closeSession = () => {
    if (wsRef.current) wsRef.current.close();
    setActiveSession(null);
    setShowMoodBefore(false);
    setShowMoodAfter(false);
    setMessages([]);
    setIsDemoSession(false);
  };

  // ── MOOD BEFORE ──
  if (activeSession && showMoodBefore) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <button onClick={closeSession} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">{activeSession.therapistName}</span>
          </div>
          <div className="w-9" />
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-5">
              <Activity size={28} className="text-[#10B981]" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight">Before we begin</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              How are you feeling right now? This helps your therapist understand where you are today.
            </p>
            <div className="mb-2">
              <div className="text-5xl font-extrabold text-[#10B981] mb-4">{moodSlider}</div>
              <input
                type="range" min="1" max="10" value={moodSlider}
                onChange={e => setMoodSlider(Number(e.target.value))}
                className="w-full accent-[#10B981] mb-1"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1 mb-6">
                <span>Not great (1)</span>
                <span>Excellent (10)</span>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              {["😔", "😐", "🙂", "😊", "😁"].map((emoji, i) => {
                const val = i * 2 + 1;
                const active = moodSlider >= val && moodSlider < val + 2;
                return (
                  <button key={i} onClick={() => setMoodSlider(val + 1)}
                    className={`flex-1 py-2 rounded-xl text-lg transition-all ${active ? "bg-[#ECFDF5] scale-110" : "hover:bg-gray-50"}`}>
                    {emoji}
                  </button>
                );
              })}
            </div>
            <button onClick={submitMoodBefore}
              className="w-full mt-4 py-3.5 bg-[#10B981] text-white font-bold rounded-2xl hover:bg-[#059669] active:scale-95 transition-all">
              Enter Session
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── MOOD AFTER ──
  if (activeSession && showMoodAfter) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <div className="w-9" />
          <span className="text-sm font-semibold text-gray-700">Session Complete</span>
          <div className="w-9" />
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-5">
              <Activity size={28} className="text-[#10B981]" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight">How do you feel now?</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Reflecting on how the session affected your mood helps track your progress over time.
            </p>
            <div className="text-5xl font-extrabold text-[#10B981] mb-4">{moodSlider}</div>
            <input
              type="range" min="1" max="10" value={moodSlider}
              onChange={e => setMoodSlider(Number(e.target.value))}
              className="w-full accent-[#10B981] mb-1"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1 mb-6">
              <span>Not great (1)</span>
              <span>Excellent (10)</span>
            </div>
            {activeSession.moodBefore && (
              <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5 flex items-center justify-between text-sm">
                <span className="text-gray-500">Mood before session</span>
                <span className="font-bold text-gray-700">{activeSession.moodBefore} / 10</span>
              </div>
            )}
            <button onClick={submitMoodAfter}
              className="w-full py-3.5 bg-[#10B981] text-white font-bold rounded-2xl hover:bg-[#059669] active:scale-95 transition-all">
              Save & Exit Session
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── ACTIVE CHAT ──
  if (activeSession) {
    return (
      <main className="min-h-screen flex flex-col bg-[#F8FAFB]">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={closeSession} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div className="w-10 h-10 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#10B981] font-bold text-sm">
                {activeSession.therapistName.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-tight">{activeSession.therapistName}</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                <span className="text-xs text-[#10B981] font-medium">In Session</span>
                {isDemoSession && <span className="text-xs text-gray-400">(Demo)</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Voice call">
              <Phone size={17} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Video call">
              <Video size={17} />
            </button>
            <button onClick={endSession}
              className="ml-1 px-4 py-1.5 border border-red-200 text-red-500 text-xs rounded-full hover:bg-red-50 font-semibold transition-colors">
              End Session
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
          <div className="flex justify-center mb-2">
            <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
              Session started · {formatTime(messages[0]?.timestamp || new Date().toISOString())}
            </span>
          </div>

          {messages.length === 0 && (
            <p className="text-center text-gray-400 text-sm pt-10">
              No messages yet. Say hello to start the conversation.
            </p>
          )}

          {messages.map((msg, i) => {
            const isUser = msg.senderType === "USER";
            const showAvatar = !isUser && (i === 0 || messages[i - 1].senderType !== "THERAPIST");
            return (
              <div key={msg.id} className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
                {!isUser && (
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${showAvatar ? "bg-[#ECFDF5]" : "opacity-0"}`}>
                    {showAvatar && <span className="text-[#10B981] font-bold text-xs">{activeSession.therapistName[0]}</span>}
                  </div>
                )}
                <div className={`max-w-xs lg:max-w-md ${isUser ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? "bg-[#10B981] text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                  }`}>
                    {msg.messageText}
                  </div>
                  <span className="text-[10px] text-gray-400 px-1">{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-[#10B981] transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !newMessage.trim()}
              className="w-9 h-9 bg-[#10B981] rounded-full flex items-center justify-center hover:bg-[#059669] disabled:opacity-40 active:scale-95 transition-all flex-shrink-0"
            >
              <Send size={14} className="text-white ml-0.5" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Messages in this session are private and confidential.
          </p>
        </div>
      </main>
    );
  }

  // ── SESSION LIST ──
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Sessions</h1>
          <p className="text-gray-500 text-sm mt-1">Connect with your assigned therapist</p>
        </div>

        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity size={28} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-semibold mb-1">No active sessions</p>
            <p className="text-gray-400 text-sm mb-5">
              Complete your mental health assessment to get matched with a therapist.
            </p>
            <Link href="/intake" className="px-6 py-2.5 bg-[#10B981] text-white rounded-full text-sm font-semibold hover:bg-[#059669] inline-block">
              Take Assessment
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map(s => (
              <button key={s.id} onClick={() => openSession(s)}
                className="w-full bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:border-[#10B981] hover:shadow-sm transition-all text-left group">
                <div className="w-12 h-12 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#10B981] font-extrabold text-sm">
                    {s.therapistName.split(" ").filter(w => w.length > 1).map(w => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 group-hover:text-[#10B981] transition-colors">{s.therapistName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      s.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {s.status}
                    </span>
                    {s.moodBefore && (
                      <span className="text-xs text-gray-400">Mood before: {s.moodBefore}/10</span>
                    )}
                  </div>
                </div>
                <svg width="18" height="18" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0 group-hover:stroke-[#10B981] transition-colors">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}

            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 mt-2">
              <p className="text-xs text-[#065F46] leading-relaxed">
                <strong>How sessions work:</strong> When you open a session, you will be asked to log your mood. After the session ends, you will log your mood again so you can track how therapy is helping over time.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
