"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const FAQS = [
  {
    category: "Getting Started",
    color: "#10B981",
    questions: [
      {
        q: "What is WellConnect?",
        a: "WellConnect is a digital mental health platform built for communities in Rwanda. It provides a safe space for anonymous story sharing, peer support, mood tracking, and access to verified licensed therapists — all in one place.",
      },
      {
        q: "Who can use WellConnect?",
        a: "WellConnect is open to anyone in Rwanda seeking emotional support or mental health resources. Community members can sign up for free using their Google account. Therapist accounts are created by our administration team for verified mental health professionals.",
      },
      {
        q: "Is WellConnect free to use?",
        a: "Yes. Creating a community account, reading and sharing stories, logging your mood, and accessing emergency resources are all completely free. Sessions with therapists may involve a fee depending on the therapist and your arrangement.",
      },
      {
        q: "How do I create an account?",
        a: "Click Get Started on the homepage and sign up using your Google account. No passwords to remember. Your Google account is only used to secure your login and will never be displayed publicly on the platform.",
      },
    ],
  },
  {
    category: "Privacy and Anonymity",
    color: "#3B82F6",
    questions: [
      {
        q: "Can I post stories anonymously?",
        a: "Yes. Every story and comment has an anonymous toggle. When enabled, your name is replaced with the word Anonymous and your identity is never revealed to other users. The backend strips your identity before sending the data to any page.",
      },
      {
        q: "Who can see my personal information?",
        a: "Your personal information is only used to manage your account securely. It is never sold, shared with advertisers, or displayed publicly. Mood logs, intake results, and chat messages are only visible to you and your assigned therapist.",
      },
      {
        q: "Is my chat with a therapist private?",
        a: "Yes. All chat sessions between you and your therapist are private and encrypted. No other users or staff members can read your conversation. Our platform complies with healthcare data privacy standards.",
      },
    ],
  },
  {
    category: "Therapist Matching",
    color: "#8B5CF6",
    questions: [
      {
        q: "How does therapist matching work?",
        a: "After you complete the intake questionnaire (PHQ-9 and GAD-7), the platform uses your results to suggest therapists whose specialisations best match your needs. You then browse their profiles and book a session at a time that suits you.",
      },
      {
        q: "Are therapists on WellConnect qualified?",
        a: "Yes. Every therapist on WellConnect has been manually vetted and provisioned by our administration team. Unqualified practitioners cannot create their own accounts — therapist access is granted only after verification.",
      },
      {
        q: "How do I book a session with a therapist?",
        a: "Once you have completed your intake assessment, go to your Dashboard and click Book Session with Therapist. You will see available therapists and their open time slots. Select a slot and confirm your booking. You will be notified when the therapist confirms.",
      },
      {
        q: "What happens during a session?",
        a: "Sessions take place through our secure in-app chat. Before the session begins you will be asked to rate your current mood on a scale of 1 to 10. After the session ends you will be asked to rate your mood again so you and your therapist can track your progress.",
      },
    ],
  },
  {
    category: "Community Forum",
    color: "#F59E0B",
    questions: [
      {
        q: "What kinds of stories can I share?",
        a: "You can share personal experiences related to mental health, stress, relationships, grief, anxiety, depression, family, work, or any emotional challenge you face. Stories are organized into categories and tags to help others find relevant content.",
      },
      {
        q: "What are the community guidelines?",
        a: "We ask all members to treat others with respect and empathy, avoid hate speech or harassment, respect privacy and anonymity, and use trigger warnings for sensitive topics. Content that violates these guidelines will be reviewed and removed.",
      },
      {
        q: "How do I report inappropriate content?",
        a: "Every story has a Report button. Click it, describe your concern, and submit. Our moderation team reviews all reports and takes appropriate action. Reports are anonymous.",
      },
    ],
  },
  {
    category: "Mood Tracking",
    color: "#EF4444",
    questions: [
      {
        q: "What is the mood tracker?",
        a: "The mood tracker is a daily check-in tool on your Dashboard. You rate your mood on a scale of 1 to 10, add an optional journal note, and save the entry. Over time your entries appear as a chart so you can see patterns and share progress with your therapist.",
      },
      {
        q: "Do I need to be logged in to track my mood?",
        a: "Yes. Mood entries are saved to your account so you can view your history over time. You can preview the dashboard without logging in, but saving entries requires a free account.",
      },
    ],
  },
  {
    category: "Emergency Support",
    color: "#EC4899",
    questions: [
      {
        q: "What should I do if I am in crisis?",
        a: "If you or someone you know is in immediate danger, please contact emergency services. For mental health crises in Rwanda, call the Rwanda Crisis Line on 3026 — available 24 hours a day. You can also reach the Mental Health Helpline on +250 788 386 909.",
      },
      {
        q: "Does WellConnect replace emergency services?",
        a: "No. WellConnect is a support and connection platform, not an emergency service. If you are in immediate danger or experiencing a psychiatric emergency, please call emergency services or go to your nearest hospital immediately.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors group"
      >
        <span className="text-sm font-semibold text-gray-900 pr-4">{q}</span>
        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${open ? "border-[#10B981] bg-[#10B981]" : "border-gray-200 group-hover:border-[#10B981]"}`}>
          <svg
            width="12" height="12" fill="none" stroke={open ? "white" : "#10B981"} strokeWidth="2.5"
            viewBox="0 0 24 24"
            className={`transition-transform duration-200 ${open ? "rotate-45" : ""}`}
          >
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-4 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-14">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-3">Help Center</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Find answers to the most common questions about WellConnect, your privacy, therapist sessions, and more.
          </p>
        </div>

        {/* Emergency banner */}
        <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-red-700 mb-0.5">In immediate crisis?</p>
            <p className="text-xs text-red-600">Rwanda Crisis Line is available 24 hours a day.</p>
          </div>
          <a href="tel:3026" className="px-5 py-2 bg-red-500 text-white font-bold rounded-full text-sm hover:bg-red-600 active:scale-95 transition-all flex-shrink-0">
            Call 3026
          </a>
        </div>

        {/* FAQ sections */}
        <div className="space-y-10">
          {FAQS.map(section => (
            <div key={section.category}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: section.color }}></div>
                <h2 className="text-lg font-extrabold text-gray-900">{section.category}</h2>
              </div>
              <div className="space-y-2">
                {section.questions.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-14 bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-5">
            Our support team is here to help. Reach out and we will get back to you as soon as possible.
          </p>
          <a href="mailto:support@wellconnect.rw" className="inline-block px-8 py-3 bg-[#10B981] text-white font-bold rounded-full hover:bg-[#059669] active:scale-95 transition-all">Contact Support</a>
        </div>

      </div>
    </main>
  );
}
