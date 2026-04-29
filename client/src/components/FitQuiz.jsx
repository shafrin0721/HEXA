import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function FitQuiz({ isOpen, onClose, onFinish }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ height: '', weight: '', fit: '' });

  const calculateSize = () => {
    // සරල Logic එකක්: බර සහ උස අනුව Size එක තීරණය කිරීම
    const weight = parseInt(data.weight);
    if (weight < 50) return 'S';
    if (weight < 70) return 'M';
    if (weight < 85) return 'L';
    return 'XL';
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onFinish(calculateSize());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] w-full max-w-md rounded-3xl p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white">
          <X size={24} />
        </button>

        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-[#d4af37]' : 'bg-white/10'}`} />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-white">Find Your Perfect Fit</h2>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <label className="text-gray-400">What is your height? (cm)</label>
            <input 
              type="number" 
              placeholder="e.g. 170"
              className="w-full bg-white/5 border border-[#2a2a2a] p-4 rounded-xl text-white outline-none focus:border-[#d4af37]"
              onChange={(e) => setData({...data, height: e.target.value})}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="text-gray-400">What is your weight? (kg)</label>
            <input 
              type="number" 
              placeholder="e.g. 65"
              className="w-full bg-white/5 border border-[#2a2a2a] p-4 rounded-xl text-white outline-none focus:border-[#d4af37]"
              onChange={(e) => setData({...data, weight: e.target.value})}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="text-gray-400">How do you prefer your clothes?</label>
            {['Slim Fit', 'Regular Fit', 'Oversized'].map(f => (
              <button 
                key={f}
                onClick={() => setData({...data, fit: f})}
                className={`w-full p-4 rounded-xl border text-left transition-all ${data.fit === f ? 'border-[#d4af37] bg-[#d4af37]/10 text-white' : 'border-[#2a2a2a] text-gray-400'}`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <button 
          onClick={handleNext}
          className="w-full mt-8 h-14 bg-[#d4af37] text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {step === 3 ? 'Show My Size' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}