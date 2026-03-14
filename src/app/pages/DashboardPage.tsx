import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar as CalendarIcon, Clock, Plus, BookOpen, Brain, MoreVertical, CheckCircle2, User as UserIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';

const MOOD_DATA = [
  { id: 1, date: 'Mon', score: 6, note: 'Felt okay, a bit tired.' },
  { id: 2, date: 'Tue', score: 8, note: 'Had a great conversation.' },
  { id: 3, date: 'Wed', score: 4, note: 'Anxiety was high today.' },
  { id: 4, date: 'Thu', score: 7, note: 'Better. Used grounding tech.' },
  { id: 5, date: 'Fri', score: 7, note: 'Steady day at work.' },
  { id: 6, date: 'Sat', score: 9, note: 'Relaxing weekend.' },
  { id: 7, date: 'Sun', score: 8, note: 'Feeling prepared for the week.' },
];

const APPOINTMENTS = [
  { id: 1, doctor: 'Dr. Sarah Ndizeye', type: 'Video Therapy', date: 'Tomorrow, 10:00 AM', status: 'CONFIRMED' },
  { id: 2, doctor: 'Dr. Sarah Ndizeye', type: 'Voice Call', date: 'Oct 15, 2:30 PM', status: 'PENDING' },
  { id: 3, doctor: 'Dr. Eric M.', type: 'Chat Session', date: 'Oct 01, 11:00 AM', status: 'COMPLETED' },
];

export default function DashboardPage() {
  const [moodScore, setMoodScore] = useState(5);
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments'>('overview');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'CONFIRMED': return 'bg-emerald-100 text-emerald-800';
      case 'PENDING': return 'bg-amber-100 text-amber-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back. Here is your wellness summary.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'appointments' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Appointments
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Daily Mood Check-in */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Brain size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Daily Check-in</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling today? (1-10)</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={moodScore}
                      onChange={(e) => setMoodScore(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">
                      <span>Low</span>
                      <span className="text-emerald-600 text-lg">{moodScore}</span>
                      <span>Great</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Journal Note (Optional)</label>
                    <textarea 
                      rows={3} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                      placeholder="What's making you feel this way?"
                    ></textarea>
                  </div>

                  <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors">
                    Save Entry
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Need immediate support?</h3>
                  <p className="text-emerald-100 text-sm mb-6">Our AI companion is available 24/7 to listen and guide you through breathing exercises.</p>
                  <button className="bg-white text-emerald-800 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors w-full">
                    Start Chat
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
              </div>
            </div>

            {/* Mood History Chart */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full min-h-[400px]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <BookOpen size={20} />
                    </div>
                    <h2 className="text-xl font-bold">Mood History</h2>
                  </div>
                  <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOOD_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} dx={-10} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any, name: any, props: any) => [props.payload.note, `Score: ${value}`]}
                      />
                      <Line isAnimationActive={false} type="monotone" dataKey="score" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Upcoming Sessions</h2>
                </div>
                
                <div className="space-y-4">
                  {APPOINTMENTS.map(apt => (
                    <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-emerald-100 transition-colors bg-gray-50/50">
                      <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                          <UserIcon size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{apt.doctor}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><CalendarIcon size={14} /> {apt.date}</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {apt.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                        {apt.status === 'CONFIRMED' && (
                          <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Join Room</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <CalendarIcon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Book a Session</h3>
                <p className="text-gray-500 text-sm mb-6">Find an available therapist that matches your specific needs and schedule.</p>
                
                <div className="space-y-4">
                  <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                    <option>Any Specialization</option>
                    <option>Anxiety</option>
                    <option>Depression</option>
                    <option>Trauma</option>
                  </select>
                  
                  <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                    <option>Any Language</option>
                    <option>Kinyarwanda</option>
                    <option>English</option>
                    <option>French</option>
                  </select>

                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-md transition-colors">
                    <Plus size={18} />
                    Find Slots
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
