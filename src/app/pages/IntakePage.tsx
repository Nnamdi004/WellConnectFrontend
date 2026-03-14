import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, CheckCircle2, Heart } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'phq1',
    category: 'PHQ-9',
    text: 'Little interest or pleasure in doing things?',
  },
  {
    id: 'phq2',
    category: 'PHQ-9',
    text: 'Feeling down, depressed, or hopeless?',
  },
  {
    id: 'gad1',
    category: 'GAD-7',
    text: 'Feeling nervous, anxious, or on edge?',
  },
  {
    id: 'gad2',
    category: 'GAD-7',
    text: 'Not being able to stop or control worrying?',
  },
];

const OPTIONS = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

export default function IntakePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  const handleSelect = (value: number) => {
    setAnswers({ ...answers, [QUESTIONS[currentStep].id]: value });
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
               <Heart className="text-white fill-current" size={16} />
            </div>
            <span className="font-bold text-lg text-gray-900">WellConnect</span>
          </Link>
          <div className="text-sm font-medium text-gray-500">
            Initial Assessment
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2">
        <motion.div 
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {currentStep < QUESTIONS.length ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                {QUESTIONS[currentStep].category}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                Over the last 2 weeks, how often have you been bothered by the following problems?
              </h1>
              <p className="text-xl text-gray-600 mt-6 font-medium">
                "{QUESTIONS[currentStep].text}"
              </p>
            </div>

            <div className="space-y-3">
              {OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    answers[QUESTIONS[currentStep].id] === option.value
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-gray-200 bg-white hover:border-emerald-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-lg font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center text-gray-500 hover:text-gray-900 font-medium ${
                  currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={answers[QUESTIONS[currentStep].id] === undefined}
                className={`flex items-center px-8 py-3 rounded-full font-bold text-white transition-all ${
                  answers[QUESTIONS[currentStep].id] !== undefined
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {currentStep === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Assessment Complete</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Thank you for sharing. We've used your responses to tailor your WellConnect experience.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Go to my Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}
