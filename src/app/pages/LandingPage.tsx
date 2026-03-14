import { motion } from "motion/react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { FeatureCard } from "../components/FeatureCard";
import { Testimonial } from "../components/Testimonial";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Brain,
  MessageCircle,
  Stethoscope,
  Users,
  ArrowRight,
  Heart,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Stethoscope,
      title: "Therapist Matching",
      description: "Connect with licensed mental health professionals in Rwanda tailored to your specific needs, preferences, and cultural context.",
      delay: 0.1
    },
    {
      icon: Users,
      title: "Peer Support",
      description: "Join a safe, community-driven space to share experiences, find encouragement, and reduce stigma with people who understand.",
      delay: 0.2
    },
    {
      icon: Brain,
      title: "Mood Tracking",
      description: "Log your emotional well-being daily. Visualize patterns to help you and your therapist make informed care decisions.",
      delay: 0.3
    },
    {
      icon: MessageCircle,
      title: "AI Companion",
      description: "24/7 conversational support offering coping strategies and guidance whenever you need someone to talk to immediately.",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-gray-50 to-white"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Now available in Rwanda
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                Mental Health Support, <span className="text-emerald-500">Reimagined.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                WellConnect bridges the gap between you and professional care. From instant AI support to licensed therapists, we're here for your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth" className="inline-flex justify-center items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:-translate-y-1">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <button className="inline-flex justify-center items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-full font-bold text-lg transition-all hover:border-emerald-200">
                  Learn More
                </button>
              </div>
              
              <div className="mt-10 flex items-center gap-4 text-sm text-gray-500 font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                       <ImageWithFallback src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p>Join 2,000+ users today</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1771442843497-e69149f26fb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFmcmljYW4lMjB3b21hbiUyMGhvbGRpbmclMjBwaG9uZSUyMHNtaWxpbmclMjBvdXRkb29yc3xlbnwxfHx8fDE3NzIzOTUzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Happy woman using WellConnect"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating UI Card 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Brain size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Daily Mood</p>
                      <p className="text-gray-900 font-bold">Feeling hopeful today 🌿</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], x: [0, 20, 0], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-emerald-200 rounded-full blur-3xl mix-blend-multiply filter"
              ></motion.div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3], x: [0, -20, 0], y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -z-10 bottom-0 left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl mix-blend-multiply filter"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Ecosystem</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Comprehensive Care for Your Mind</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              We've built a holistic platform that adapts to your needs. Whether you need professional help, a friend to talk to, or tools to track your progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative z-10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1639436926668-2f8b4f32e15a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMG9mJTIwYWZyaWNhbiUyMHRlZW5hZ2VycyUyMGhhcHB5JTIwZ2F0aGVyaW5nJTIwZnJpZW5kcyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MjM5NjE1MHww&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Community Support" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full -z-0"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-50 rounded-full -z-0"></div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
                <Heart size={14} className="fill-current" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Breaking Barriers to Mental Healthcare in Rwanda
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  Mental health support should be accessible to everyone. In Rwanda, we face a shortage of professionals and a lingering stigma that prevents many from seeking help.
                </p>
                <p>
                  WellConnect is more than an app; it's a movement. By combining AI technology with human connection, we are democratizing access to care.
                </p>
              </div>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Culturally relevant therapy matching",
                  "Anonymous & safe peer environments",
                  "Data-driven insights for better treatment"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-24 bg-emerald-900 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Personal Mental Health Dashboard</h2>
               <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                 Experience the power of mood tracking and AI support directly in your browser. Our web platform is designed for accessibility, calmness, and ease of use on any device.
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center gap-3 bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                    Get Started Now
                  </button>
               </div>
             </div>
             <div className="relative flex justify-center">
                <div className="w-full max-w-lg aspect-video bg-gray-900 rounded-xl border-4 border-gray-800 shadow-2xl overflow-hidden relative">
                   <div className="h-8 bg-gray-800 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1633436245198-44bc17f86b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGNoYXRib3QlMjBzdXBwb3J0JTIwZnV0dXJpc3RpYyUyMGFic3RyYWN0JTIwZnJpZW5kbHl8ZW58MXx8fHwxNzcyMzk1MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Web Interface"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/50">
                      <MessageCircle className="text-white" />
                    </div>
                    <div className="bg-gray-800/80 backdrop-blur p-4 rounded-t-xl rounded-br-xl mb-2 self-start max-w-[85%]">
                      <p className="text-sm text-gray-300">Hello! I noticed your mood has been low today. Would you like to try a breathing exercise?</p>
                    </div>
                  </div>
                </div>
             </div>
           </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Voices from our Community</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial 
              quote="Finding a therapist who understands my culture was impossible before. WellConnect made it seamless."
              name="Grace M."
              role="Student, Kigali"
              avatar="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            />
             <Testimonial 
              quote="The mood tracker helped me realize my anxiety triggers. My therapist and I now work on them directly."
              name="Jean Paul K."
              role="Entrepreneur"
              avatar="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            />
             <Testimonial 
              quote="Sometimes you just need to talk at 2 AM. The AI chat is surprisingly comforting and helpful."
              name="Aline U."
              role="Teacher"
              avatar="https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your Wellness Journey Today</h2>
              <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
                Join a community that cares. Professional help and peer support are just a click away.
              </p>
              <Link to="/auth" className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Create Free Account
              </Link>
            </div>
            
            {/* Background circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <span className="font-bold text-xl text-gray-900">WellConnect</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed">
                Empowering mental wellness through technology and community connection in Rwanda.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Find a Therapist</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Peer Support</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Mood Tracking</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">AI Chatbot</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2"><Mail size={16} /> support@wellconnect.rw</li>
                <li className="flex items-center gap-2"><Phone size={16} /> +250 788 000 000</li>
                <li className="flex items-center gap-2"><MapPin size={16} /> Kigali, Rwanda</li>
              </ul>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors"><Facebook size={20} /></a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 text-center">
            <p className="text-sm text-gray-400">© 2026 WellConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
