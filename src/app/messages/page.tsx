"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type Message = { id: number; messageText: string; senderType: "USER"|"THERAPIST"; timestamp: string };
type Session = { id: number; therapistName: string; status: string; moodBefore?: string };

export default function MessagesPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session|null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showMoodBefore, setShowMoodBefore] = useState(false);
  const [showMoodAfter, setShowMoodAfter] = useState(false);
  const [moodSlider, setMoodSlider] = useState(5);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket|null>(null);
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    fetch(`${BASE}/api/chat/sessions`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setSessions).catch(() => setSessions([]));
  }, [BASE, token]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const openSession = async (session: Session) => {
    setActiveSession(session);
    if (!session.moodBefore) setShowMoodBefore(true);
    try {
      const r = await fetch(`${BASE}/api/chat/sessions/${session.id}/messages`, { headers: { Authorization: `Bearer ${token}` } });
      setMessages(await r.json());
    } catch { setMessages([]); }
    if (wsRef.current) wsRef.current.close();
    const ws = new WebSocket(`${BASE.replace("http","ws")}/ws/chat/${session.id}?token=${token}`);
    ws.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]);
    wsRef.current = ws;
  };

  const submitMoodBefore = async () => {
    if (!activeSession) return;
    try {
      await fetch(`${BASE}/api/chat/sessions/${activeSession.id}/mood`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ moodBefore: String(moodSlider) }) });
    } catch {}
    setShowMoodBefore(false);
  };

  const submitMoodAfter = async () => {
    if (!activeSession) return;
    try {
      await fetch(`${BASE}/api/chat/sessions/${activeSession.id}/mood`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ moodAfter: String(moodSlider) }) });
    } catch {}
    setShowMoodAfter(false);
    setActiveSession(null);
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeSession) return;
    setSending(true);
    const text = newMessage;
    setNewMessage("");
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ messageText: text, senderType: "USER" }));
      } else {
        await fetch(`${BASE}/api/chat/sessions/${activeSession.id}/messages`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ messageText: text, senderType: "USER" }) });
        setMessages(prev => [...prev, { id: Date.now(), messageText: text, senderType: "USER", timestamp: new Date().toISOString() }]);
      }
    } catch { alert("Failed to send."); }
    finally { setSending(false); }
  };

  const SessionHeader = ({ onEnd }: { onEnd: () => void }) => (
    <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        <button onClick={() => { setActiveSession(null); setShowMoodBefore(false); setShowMoodAfter(false); }} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div className="w-10 h-10 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{activeSession?.therapistName}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
            <span className="text-xs text-[#10B981] font-medium">In Session</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </button>
        <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        </button>
        <button onClick={onEnd} className="px-4 py-1.5 border border-red-200 text-red-500 text-xs rounded-full hover:bg-red-50 font-medium transition-colors">
          End Session
        </button>
      </div>
    </div>
  );

  const MoodCard = ({ title, subtitle, buttonText, onSubmit }: { title: string; subtitle: string; buttonText: string; onSubmit: () => void }) => (
    <div className="flex-1 flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-sm border border-gray-100 text-center">
        <div className="w-14 h-14 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm mb-8">{subtitle}</p>
        <input type="range" min="1" max="10" value={moodSlider} onChange={e => setMoodSlider(Number(e.target.value))} className="w-full accent-[#10B981] mb-2" />
        <div className="flex justify-between text-xs text-gray-400 mb-6">
          <span>Low (1)</span>
          <span className="text-2xl font-extrabold text-[#10B981]">{moodSlider}</span>
          <span>Great (10)</span>
        </div>
        <button onClick={onSubmit} className="w-full py-3.5 bg-[#10B981] text-white font-bold rounded-2xl hover:bg-[#059669] active:scale-95 transition-all">
          {buttonText}
        </button>
      </div>
    </div>
  );

  // MOOD BEFORE
  if (activeSession && showMoodBefore) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <SessionHeader onEnd={() => setShowMoodBefore(false)} />
        <MoodCard title="Before we begin" subtitle="How are you feeling right now on a scale of 1 to 10?" buttonText="Enter Waiting Room" onSubmit={submitMoodBefore} />
      </main>
    );
  }

  // MOOD AFTER
  if (activeSession && showMoodAfter) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <SessionHeader onEnd={submitMoodAfter} />
        <MoodCard title="Session Complete" subtitle="How are you feeling after this session?" buttonText="Save and Exit" onSubmit={submitMoodAfter} />
      </main>
    );
  }

  // ACTIVE CHAT
  if (activeSession) {
    return (
      <main className="min-h-screen flex flex-col" style={{ background: "#F8FAFB" }}>
        <SessionHeader onEnd={() => { setMoodSlider(5); setShowMoodAfter(true); }} />
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <div className="text-center">
            <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
              Session Started — {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          {messages.length === 0 && (
            <p className="text-center text-gray-400 text-sm pt-8">No messages yet. Say hello to start the conversation.</p>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.senderType === "USER" ? "justify-end" : "justify-start"}`}>
              {msg.senderType === "THERAPIST" && (
                <div className="w-8 h-8 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <svg width="14" height="14" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
              <div className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.senderType === "USER"
                  ? "bg-[#10B981] text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100"
              }`}>
                {msg.messageText}
                <p className={`text-xs mt-1 ${msg.senderType==="USER"?"text-green-100":"text-gray-400"}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-4 py-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-[#10B981] transition-colors">
            <input
              type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key==="Enter" && !e.shiftKey && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 placeholder-gray-400"
            />
            <button onClick={sendMessage} disabled={sending||!newMessage.trim()}
              className="w-9 h-9 bg-[#10B981] rounded-full flex items-center justify-center hover:bg-[#059669] disabled:opacity-50 active:scale-95 transition-all flex-shrink-0">
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // SESSION LIST
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">My Sessions</h1>
          <p className="text-gray-500 text-sm mt-1">Connect with your assigned therapist</p>
        </div>
        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-gray-500 font-medium mb-1">No active sessions</p>
            <p className="text-gray-400 text-sm mb-5">Book an appointment with a therapist to get started.</p>
            <Link href="/dashboard" className="px-6 py-2.5 bg-[#10B981] text-white rounded-full text-sm font-semibold hover:bg-[#059669]">Go to Dashboard</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map(s => (
              <button key={s.id} onClick={() => openSession(s)}
                className="w-full bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:border-[#10B981] hover:shadow-sm transition-all text-left">
                <div className="w-12 h-12 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{s.therapistName}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status==="ACTIVE"?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>{s.status}</span>
                </div>
                <svg width="18" height="18" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
