"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { intakeService } from "@/services/intakeService";

const PHQ9 = ["Little interest or pleasure in doing things","Feeling down, depressed, or hopeless","Trouble falling or staying asleep, or sleeping too much","Feeling tired or having little energy","Poor appetite or overeating","Feeling bad about yourself or that you are a failure","Trouble concentrating on things","Moving or speaking so slowly others noticed, or being fidgety and restless","Thoughts that you would be better off dead or of hurting yourself"];
const GAD7 = ["Feeling nervous, anxious, or on edge","Not being able to stop or control worrying","Worrying too much about different things","Trouble relaxing","Being so restless that it is hard to sit still","Becoming easily annoyed or irritable","Feeling afraid as if something awful might happen"];
const OPTIONS = [{ value: 0, label: "Not at all" }, { value: 1, label: "Several days" }, { value: 2, label: "More than half the days" }, { value: 3, label: "Nearly every day" }];

function severity(score: number, max: number) {
  const pct = score / max;
  if (pct < 0.2) return { label: "Minimal", color: "#10B981", bg: "#ECFDF5" };
  if (pct < 0.4) return { label: "Mild", color: "#F59E0B", bg: "#FFFBEB" };
  if (pct < 0.6) return { label: "Moderate", color: "#F97316", bg: "#FFF7ED" };
  return { label: "Severe", color: "#EF4444", bg: "#FEF2F2" };
}

export default function IntakePage() {
  const [step, setStep] = useState<"auth-gate"|"welcome"|"phq9"|"gad7"|"results">("auth-gate");
  const [phq9, setPhq9] = useState<Record<number,number>>({});
  const [gad7, setGad7] = useState<Record<number,number>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setStep("welcome");
  }, []);
  const phq9Score = Object.values(phq9).reduce((a,b) => a+b, 0);
  const gad7Score = Object.values(gad7).reduce((a,b) => a+b, 0);

  const answer = (set: typeof setPhq9, questions: string[], i: number, v: number) => {
    set(prev => { const n = {...prev, [i]: v}; if (i === questions.length - 1) setTimeout(() => {}, 300); return n; });
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      await intakeService.submit(phq9Score, gad7Score);
    } catch { } finally { setSubmitting(false); setStep("results"); }
  };

  if (step === "auth-gate") return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="#10B981"/>
              <path d="M18 27s-9-5.5-9-12a6 6 0 0 1 9-5.196A6 6 0 0 1 27 15c0 6.5-9 12-9 12z" fill="white" opacity="0.9"/>
              <path d="M13 18.5 l2.5 2.5 l5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold text-gray-900 tracking-tight">WellConnect</span>
          </Link>
        </div>

        {/* Gate card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          {/* Top banner */}
          <div className="bg-gradient-to-r from-[#0D5C3D] to-[#059669] px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">Mental Health Assessment</h1>
            <p className="text-[#A7F3D0] text-sm leading-relaxed">A free, confidential questionnaire to help us match you with the right support.</p>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            <p className="text-gray-700 font-semibold text-sm mb-4">Why do I need an account?</p>
            <div className="space-y-3 mb-7">
              {[
                { icon: "🔒", text: "Your results are saved securely to your profile" },
                { icon: "🎯", text: "We use your results to match you with the right therapist" },
                { icon: "📈", text: "Track how your scores change over time" },
                { icon: "🤝", text: "Share your results with your therapist directly" },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">{item.icon}</span>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/register"
                className="w-full py-3.5 bg-[#10B981] text-white font-bold rounded-2xl hover:bg-[#059669] active:scale-95 transition-all text-center text-sm"
              >
                Create a Free Account
              </Link>
              <Link
                href="/login"
                className="w-full py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-[#10B981] hover:text-[#10B981] active:scale-95 transition-all text-center text-sm"
              >
                Sign In to Existing Account
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Already signed in?{" "}
          <button onClick={() => setStep("welcome")} className="text-[#10B981] font-semibold hover:underline">
            Continue to assessment
          </button>
        </p>
      </div>
    </main>
  );

  if (step === "welcome") return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="#10B981"/>
              <path d="M18 27s-9-5.5-9-12a6 6 0 0 1 9-5.196A6 6 0 0 1 27 15c0 6.5-9 12-9 12z" fill="white" opacity="0.9"/>
              <path d="M13 18.5 l2.5 2.5 l5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold text-gray-900 tracking-tight">WellConnect</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Welcome. Let us get to know you.</h1>
          <p className="text-gray-500 leading-relaxed">This short questionnaire helps us understand how you have been feeling so we can connect you with the right support. It takes about 3 minutes.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3 mb-6">
          {[{t:"Part 1 — PHQ-9",d:"9 questions about depression",time:"~2 min"},{t:"Part 2 — GAD-7",d:"7 questions about anxiety",time:"~1 min"}].map(p => (
            <div key={p.t} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-[#ECFDF5] rounded-full flex items-center justify-center flex-shrink-0"><svg width="18" height="18" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="flex-1"><p className="font-semibold text-gray-900 text-sm">{p.t}</p><p className="text-gray-500 text-xs">{p.d}</p></div>
              <span className="text-xs text-[#10B981] font-medium bg-[#ECFDF5] px-2 py-1 rounded-full">{p.time}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-4 mb-6"><p className="text-sm text-[#065F46]"><strong>Privacy note:</strong> Your answers are confidential and used only to personalise your experience. This is not a clinical diagnosis.</p></div>
        <button onClick={() => setStep("phq9")} className="w-full py-4 bg-[#10B981] text-white font-bold rounded-2xl hover:bg-[#059669] text-lg">Begin Assessment</button>
      </div>
    </main>
  );

  const renderQuestions = (questions: string[], answers: Record<number,number>, setAnswers: typeof setPhq9, part: string, onComplete: () => void) => {
    const answered = Object.keys(answers).length;
    const progress = (answered / questions.length) * 100;
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-4"><p className="text-xs font-bold text-[#10B981] uppercase tracking-widest">{part}</p><span className="text-sm font-semibold text-gray-500">{answered}/{questions.length}</span></div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8"><div className="bg-[#10B981] h-2 rounded-full transition-all duration-500" style={{width:`${progress}%`}}></div></div>
          <p className="text-xs text-gray-400 mb-6 text-center">Over the last 2 weeks, how often have you been bothered by the following?</p>
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className={`bg-white rounded-2xl border p-5 transition-all ${answers[i] !== undefined ? "border-gray-100" : "border-gray-200"}`}>
                <p className="text-sm font-semibold text-gray-800 mb-4"><span className="text-[#10B981] mr-2">{i+1}.</span>{q}</p>
                <div className="grid grid-cols-2 gap-2">
                  {OPTIONS.map(opt => <button key={opt.value} onClick={() => answer(setAnswers, questions, i, opt.value)} className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${answers[i] === opt.value ? "bg-[#10B981] text-white border-[#10B981]" : "border-gray-200 text-gray-500 hover:border-[#10B981]"}`}>{opt.label}</button>)}
                </div>
              </div>
            ))}
          </div>
          {answered === questions.length && <button onClick={onComplete} className="w-full mt-8 py-4 bg-[#10B981] text-white font-bold rounded-2xl hover:bg-[#059669]">Continue</button>}
        </div>
      </main>
    );
  };

  if (step === "phq9") return renderQuestions(PHQ9, phq9, setPhq9, "Part 1 of 2 — PHQ-9 Depression Screening", () => setStep("gad7"));
  if (step === "gad7") return renderQuestions(GAD7, gad7, setGad7, "Part 2 of 2 — GAD-7 Anxiety Screening", submit);

  const phqS = severity(phq9Score, 27);
  const gadS = severity(gad7Score, 21);
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4"><svg width="32" height="32" fill="none" stroke="#10B981" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Assessment Complete</h1>
          <p className="text-gray-500 text-sm">Here is a summary. Remember, this is a screening tool, not a diagnosis.</p>
        </div>
        <div className="space-y-4 mb-8">
          {[{label:"Depression (PHQ-9)",score:phq9Score,max:27,s:phqS},{label:"Anxiety (GAD-7)",score:gad7Score,max:21,s:gadS}].map(r => (
            <div key={r.label} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3"><p className="font-bold text-gray-900">{r.label}</p><span className="px-3 py-1 rounded-full text-xs font-bold" style={{color:r.s.color,backgroundColor:r.s.bg}}>{r.s.label}</span></div>
              <div className="flex items-center gap-3"><div className="flex-1 bg-gray-100 rounded-full h-3"><div className="h-3 rounded-full" style={{width:`${(r.score/r.max)*100}%`,backgroundColor:r.s.color}}></div></div><span className="text-sm font-bold text-gray-700">{r.score}/{r.max}</span></div>
            </div>
          ))}
        </div>
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-5 mb-6"><p className="text-sm font-bold text-[#065F46] mb-1">What happens next?</p><p className="text-sm text-[#065F46]">Based on your results we will suggest therapists and resources that best match your needs.</p></div>
        <div className="flex gap-3"><Link href="/dashboard" className="flex-1 py-3 bg-[#10B981] text-white font-bold rounded-2xl hover:bg-[#059669] text-center">Go to Dashboard</Link><Link href="/feed" className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-gray-300 text-center">Browse Community</Link></div>
      </div>
    </main>
  );
}
