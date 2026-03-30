"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { therapistService } from "@/services/therapistService";
import { chatService } from "@/services/chatService";

type Appointment = { id: number; userName: string; scheduledAt: string; status: string; sessionType: string; notes?: string };
type Client = { id: number; name: string; lastSession?: string; moodTrend?: number };
type ChatMessage = { id: number; content: string; senderType: "USER" | "THERAPIST"; sentAt: string };

export default function TherapistPortalPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [activeTab, setActiveTab] = useState<"appointments" | "clients" | "messages">("appointments");
  const [activeSession, setActiveSession] = useState<{ id: number; userName: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
  const token = typeof window !== "undefined" ? localStorage.getItem("therapist_token") || "" : "";

  useEffect(() => {
    therapistService.getAppointments(token).then(r => setAppointments(r.data)).catch(() => {});
    fetch(`${BASE}/api/therapist/clients`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(setClients).catch(() => {});
  }, [BASE, token]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`${BASE}/api/therapist/appointments/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch { alert("Failed to update appointment."); }
  };

  const openChat = async (sessionId: number, userName: string) => {
    setActiveSession({ id: sessionId, userName });
    setActiveTab("messages");
    try {
      const r = await chatService.getMessages(sessionId);
      setChatMessages(r.data);
    } catch { setChatMessages([]); }
    if (wsRef.current) wsRef.current.close();
    const ws = chatService.createWebSocket(sessionId, token);
    ws.onmessage = (e) => setChatMessages(prev => [...prev, JSON.parse(e.data)]);
    wsRef.current = ws;
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeSession) return;
    setSending(true);
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ messageText: newMessage, senderType: "THERAPIST" }));
      } else {
        await chatService.sendMessage(activeSession.id, newMessage, "THERAPIST");
        setChatMessages(prev => [...prev, { id: Date.now(), content: newMessage, senderType: "THERAPIST", sentAt: new Date().toISOString() }]);
      }
      setNewMessage("");
    } catch { alert("Failed to send."); }
    finally { setSending(false); }
  };

  const statusColors: Record<string, string> = { PENDING: "bg-yellow-100 text-yellow-700", CONFIRMED: "bg-green-100 text-green-700", COMPLETED: "bg-gray-100 text-gray-500", CANCELLED: "bg-red-100 text-red-600" };
  const pendingCount = appointments.filter(a => a.status === "PENDING").length;

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-[#0D5C3D] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><span className="text-white font-black">W</span></div><span className="font-bold text-white">WellConnect</span><span className="ml-2 px-2 py-0.5 bg-white/20 text-white text-xs rounded-full font-medium">Therapist Portal</span></div>
        <Link href="/" className="text-white/70 text-sm hover:text-white transition-colors">Sign Out</Link>
      </nav>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8"><h1 className="text-2xl font-extrabold text-gray-900">Therapist Dashboard</h1><p className="text-gray-500 text-sm mt-1">Manage your appointments and client sessions</p></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{label:"Pending Requests",value:pendingCount,color:"#F59E0B"},{label:"Confirmed Sessions",value:appointments.filter(a=>a.status==="CONFIRMED").length,color:"#10B981"},{label:"Total Clients",value:clients.length,color:"#3B82F6"},{label:"Total Appointments",value:appointments.length,color:"#8B5CF6"}].map(s => <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5"><p className="text-2xl font-extrabold" style={{color:s.color}}>{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.label}</p></div>)}
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {(["appointments","clients","messages"] as const).map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${activeTab===tab?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{tab}{tab==="appointments"&&pendingCount>0&&<span className="ml-1.5 px-1.5 py-0.5 bg-yellow-400 text-white text-xs rounded-full">{pendingCount}</span>}</button>)}
        </div>

        {activeTab === "appointments" && (
          <div className="space-y-3">
            {appointments.length === 0 ? <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center"><p className="text-gray-400">No appointments yet.</p></div> : appointments.map(apt => (
              <div key={apt.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0"><svg width="20" height="20" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div className="flex-1"><div className="flex items-center justify-between mb-1"><p className="font-semibold text-gray-900">{apt.userName}</p><span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[apt.status]}`}>{apt.status}</span></div><p className="text-sm text-gray-500">{new Date(apt.scheduledAt).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>{apt.notes&&<p className="text-xs text-gray-400 mt-1">{apt.notes}</p>}</div>
                </div>
                {apt.status === "PENDING" && <div className="flex gap-2 mt-4 pl-16"><button onClick={() => updateStatus(apt.id,"CONFIRMED")} className="px-4 py-1.5 bg-[#10B981] text-white text-xs rounded-full font-semibold hover:bg-[#059669]">Confirm</button><button onClick={() => updateStatus(apt.id,"CANCELLED")} className="px-4 py-1.5 border border-red-200 text-red-500 text-xs rounded-full font-semibold hover:bg-red-50">Decline</button></div>}
                {apt.status === "CONFIRMED" && <div className="flex gap-2 mt-4 pl-16"><button onClick={() => openChat(apt.id,apt.userName)} className="px-4 py-1.5 bg-[#10B981] text-white text-xs rounded-full font-semibold hover:bg-[#059669]">Open Chat</button><button onClick={() => updateStatus(apt.id,"COMPLETED")} className="px-4 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-full font-semibold hover:bg-gray-50">Mark Complete</button></div>}
              </div>
            ))}
          </div>
        )}

        {activeTab === "clients" && (
          <div className="space-y-3">
            {clients.length === 0 ? <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center"><p className="text-gray-400">No clients yet.</p></div> : clients.map(client => (
              <div key={client.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"><svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div className="flex-1"><p className="font-semibold text-gray-900">{client.name}</p>{client.lastSession&&<p className="text-xs text-gray-500">Last session: {new Date(client.lastSession).toLocaleDateString()}</p>}</div>
                {client.moodTrend !== undefined && <div className="text-right"><p className="text-xs text-gray-400">Avg Mood</p><p className="text-lg font-bold text-[#10B981]">{client.moodTrend}</p></div>}
              </div>
            ))}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{height:"500px"}}>
            {!activeSession ? (
              <div className="h-full flex items-center justify-center"><div className="text-center"><p className="text-gray-400 text-sm mb-2">No active chat selected.</p><p className="text-xs text-gray-300">Confirm an appointment and click Open Chat to start messaging.</p></div></div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3"><div className="w-9 h-9 bg-[#ECFDF5] rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><p className="font-semibold text-gray-900 text-sm">{activeSession.userName}</p><p className="text-xs text-[#10B981]">Active session</p></div></div>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  {chatMessages.length === 0 && <p className="text-center text-gray-400 text-sm py-8">No messages yet.</p>}
                  {chatMessages.map(msg => <div key={msg.id} className={`flex ${msg.senderType === "THERAPIST" ? "justify-end" : "justify-start"}`}><div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${msg.senderType === "THERAPIST" ? "bg-[#0D5C3D] text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`}>{msg.content}<p className={`text-xs mt-1 ${msg.senderType === "THERAPIST" ? "text-green-200" : "text-gray-400"}`}>{new Date(msg.sentAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p></div></div>)}
                  <div ref={messagesEndRef} />
                </div>
                <div className="px-4 py-3 border-t border-gray-100 flex gap-3">
                  <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message..." className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981]" />
                  <button onClick={sendMessage} disabled={sending || !newMessage.trim()} className="px-5 py-2.5 bg-[#0D5C3D] text-white rounded-xl font-semibold text-sm hover:bg-[#0a4a30] disabled:opacity-50">Send</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
