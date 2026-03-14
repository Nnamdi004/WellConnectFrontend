import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Flag, Send, EyeOff, X, HandHeart, Plus, Share2, Eye } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const STORIES = [
  {
    id: 1,
    author: 'Anonymous',
    avatar: null,
    title: 'Finding peace after graduation',
    content: "The transition from university to looking for a job in Kigali has been overwhelmingly stressful. I used to wake up with a tight chest every morning. Recently, I started practicing the grounding techniques shared here, and it's making a difference. Just wanted to share in case anyone else is feeling this pressure.",
    category: 'Anxiety',
    tags: ['career', 'post-grad', 'coping'],
    reactions: { heart: 24, hug: 12, strength: 5 },
    comments: 8,
    time: '2 hours ago'
  },
  {
    id: 2,
    author: 'Marie C.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    title: 'Navigating family expectations',
    content: "How do you explain the need for therapy to parents who don't believe mental health struggles are real? It's been a tough journey, but I finally had a breakthrough conversation with my mother yesterday.",
    category: 'Family',
    tags: ['boundaries', 'therapy', 'communication'],
    reactions: { heart: 45, hug: 30, strength: 18 },
    comments: 15,
    time: '5 hours ago'
  }
];

export default function ForumPage() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Community Hub</h1>
            <p className="text-gray-600 mt-1">A safe space to share, listen, and support each other.</p>
          </div>
          <button 
            onClick={() => setIsComposerOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus size={20} />
            Share Your Story
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="md:col-span-3 space-y-6">
            {STORIES.map(story => (
              <motion.div 
                key={story.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {story.avatar ? (
                       <ImageWithFallback src={story.avatar} alt={story.author} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <EyeOff className="text-emerald-600" size={20} />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900">{story.author}</h4>
                      <p className="text-xs text-gray-500">{story.time} • in <span className="text-emerald-600 font-medium">{story.category}</span></p>
                    </div>
                  </div>
                  <button onClick={() => setReportModalOpen(story.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2" title="Report Content">
                    <Flag size={18} />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{story.content}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {story.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors bg-gray-50 hover:bg-emerald-50 px-3 py-1.5 rounded-full">
                      <Heart size={18} />
                      <span className="text-sm font-medium">{story.reactions.heart}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-full">
                      <HandHeart size={18} />
                      <span className="text-sm font-medium">{story.reactions.hug}</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm">
                    <MessageCircle size={18} />
                    {story.comments} Comments
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="hidden md:block col-span-1 space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-2">Community Guidelines</h3>
              <ul className="text-sm text-emerald-800 space-y-2">
                <li>• Treat others with respect and empathy</li>
                <li>• No hate speech or harassment</li>
                <li>• Respect privacy and anonymity</li>
                <li>• Use trigger warnings for sensitive topics</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['Anxiety', 'Depression', 'Relationships', 'Grief', 'Work Stress', 'Self-Care'].map(topic => (
                  <span key={topic} className="px-3 py-1.5 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 cursor-pointer text-sm font-medium rounded-lg transition-colors border border-gray-100">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Story Composer Modal */}
      <AnimatePresence>
        {isComposerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Share Your Story</h2>
                <button onClick={() => setIsComposerOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <input 
                  type="text" 
                  placeholder="Give your story a title..." 
                  className="w-full text-lg font-bold border-0 border-b-2 border-gray-100 focus:border-emerald-500 focus:ring-0 px-0 py-2 placeholder-gray-400"
                />
                
                <div className="flex gap-4">
                  <select className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Select Category</option>
                    <option value="anxiety">Anxiety</option>
                    <option value="depression">Depression</option>
                    <option value="family">Family & Relationships</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Add tags (comma separated)" 
                    className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <textarea 
                  rows={6}
                  placeholder="What's on your mind? This is a safe space..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                ></textarea>

                <div className="flex items-center justify-between pt-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${isAnonymous ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2 group-hover:text-emerald-700 transition-colors">
                      {isAnonymous ? <EyeOff size={16} /> : <Eye size={16} />}
                      Post Anonymously
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-full transition-colors">
                      Save Draft
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-colors shadow-md">
                      Publish
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {reportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
             <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Report Content</h3>
              <p className="text-sm text-gray-600 mb-4">Please let us know why you are reporting this post. Our moderation team will review it shortly.</p>
              
              <div className="space-y-3 mb-6">
                {['Spam or spammy behavior', 'Hate speech or harassment', 'Self-harm intent', 'Inappropriate content'].map(reason => (
                  <label key={reason} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="report_reason" className="text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-sm font-medium text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
              
              <div className="flex justify-end gap-3">
                <button onClick={() => setReportModalOpen(null)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={() => setReportModalOpen(null)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors">
                  Submit Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
