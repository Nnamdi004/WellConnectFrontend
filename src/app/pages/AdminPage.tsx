import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Tag, AlertTriangle, Plus, Check, X, Search, MoreVertical } from 'lucide-react';
import { Link } from 'react-router';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'provisioning' | 'taxonomy' | 'moderation'>('provisioning');

  const MOCK_REPORTS = [
    { id: 1, type: 'Story', content: "Excerpt from the reported story...", reason: 'Inappropriate content', status: 'PENDING', author: 'User123', reportedBy: 'Anon456' },
    { id: 2, type: 'Comment', content: "I think you should just...", reason: 'Harassment', status: 'PENDING', author: 'Anon789', reportedBy: 'User001' }
  ];

  const MOCK_TAGS = ['anxiety', 'depression', 'family', 'work', 'relationships', 'student-life'];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 fixed h-full z-10 flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Admin Console</span>
        </Link>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('provisioning')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
              activeTab === 'provisioning' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Users size={20} />
            Therapist Access
          </button>
          <button 
            onClick={() => setActiveTab('taxonomy')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
              activeTab === 'taxonomy' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Tag size={20} />
            Taxonomy
          </button>
          <button 
            onClick={() => setActiveTab('moderation')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
              activeTab === 'moderation' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <AlertTriangle size={20} />
            Moderation Queue
            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">2</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">AD</span>
            </div>
            <div>
              <p className="font-bold text-sm">System Admin</p>
              <Link to="/auth" className="text-xs text-gray-400 hover:text-purple-400 transition-colors">Sign out</Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl"
        >
          {activeTab === 'provisioning' && (
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Therapist Provisioning</h2>
              <p className="text-gray-600 mb-8">Securely create and manage professional accounts.</p>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold mb-6 border-b border-gray-100 pb-4">Create New Account</h3>
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Dr. Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professional Email</label>
                      <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-purple-500 focus:border-purple-500" placeholder="jane.doe@wellconnect.rw" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-purple-500 focus:border-purple-500">
                        <option>Clinical Psychologist</option>
                        <option>Psychiatrist</option>
                        <option>Counselor</option>
                        <option>Social Worker</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-purple-500 focus:border-purple-500" placeholder="RWA-LIC-0000" />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button type="button" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-2">
                      <Plus size={18} />
                      Provision Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'taxonomy' && (
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Taxonomy Management</h2>
              <p className="text-gray-600 mb-8">Manage the categories and tags available in the Community Forum.</p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Categories */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-bold">Categories</h3>
                    <button className="text-purple-600 hover:bg-purple-50 p-1.5 rounded-lg transition-colors">
                      <Plus size={20} />
                    </button>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {['Anxiety', 'Depression', 'Relationships', 'Grief', 'Work & Career'].map(cat => (
                      <li key={cat} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                        <span className="font-medium text-gray-700">{cat}</span>
                        <button className="text-gray-400 hover:text-red-500 transition-colors"><X size={16} /></button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-bold">Tags</h3>
                    <button className="text-purple-600 hover:bg-purple-50 p-1.5 rounded-lg transition-colors">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_TAGS.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg group">
                        #{tag}
                        <button className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'moderation' && (
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Moderation Queue</h2>
              <p className="text-gray-600 mb-8">Review flagged content from the community to ensure a safe environment.</p>

              <div className="space-y-4">
                {MOCK_REPORTS.map(report => (
                  <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 border-l-4 border-l-red-500">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-md tracking-wider">
                          {report.reason}
                        </span>
                        <span className="text-sm text-gray-500">Reported by {report.reportedBy}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">{report.status}</span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-100">
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">{report.type} by {report.author}</p>
                      <p className="text-gray-800 italic">"{report.content}"</p>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 py-2 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                        <Check size={18} className="text-emerald-500" />
                        Dismiss Report
                      </button>
                      <button className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                        <X size={18} />
                        Remove Content
                      </button>
                    </div>
                  </div>
                ))}
            
                {MOCK_REPORTS.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg">Queue is empty</h3>
                    <p className="text-gray-500 text-sm">No pending reports to review.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
