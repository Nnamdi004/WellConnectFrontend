"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-3">Therapist Matching</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">How We Connect You with a Therapist</h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">
            WellConnect matches you with verified mental health professionals based on your needs,
            your intake assessment, and therapist availability.
          </p>
        </div>
        <div className="space-y-4 mb-12">
          {[
            { step: "1", title: "Create your account", desc: "Sign up with Google. Your identity stays private — you control what others see." },
            { step: "2", title: "Complete the intake assessment", desc: "Answer the PHQ-9 and GAD-7 questionnaires. This takes about 3 minutes and helps us understand your needs." },
            { step: "3", title: "Get matched", desc: "Based on your assessment results, we suggest therapists who specialise in areas most relevant to you." },
            { step: "4", title: "Book a session", desc: "Browse available slots and book directly through the platform. Sessions are conducted via secure in-app chat." },
            { step: "5", title: "Start your journey", desc: "Connect with your therapist, track your mood over time, and access community support alongside professional care." },
          ].map(item => (
            <div key={item.step} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-5">
              <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-white font-extrabold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-[#065F46] mb-2">All therapists are verified</h3>
          <p className="text-sm text-[#065F46] leading-relaxed">
            Every therapist on WellConnect has been manually vetted by our administration team.
            You will never be connected to an unqualified practitioner.
          </p>
        </div>
        <div className="text-center">
          <Link href="/register" className="inline-block px-10 py-4 bg-[#10B981] text-white font-bold rounded-full hover:bg-[#059669] active:scale-95 transition-all text-lg">
            Get Started Free
          </Link>
          <p className="text-gray-400 text-sm mt-3">No cost to create an account</p>
        </div>
      </div>
    </main>
  );
}
