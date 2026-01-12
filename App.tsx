
import React, { useState } from 'react';
import { analyzeActivity } from './services/geminiService';
import { ActivityAnalysisResponse } from './types';
import InterventionCard from './components/InterventionCard';

const App: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ActivityAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || !context) return;

    setLoading(true);
    setError(null);
    try {
      const data = await analyzeActivity(goal, context);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate analysis. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExample = () => {
    setGoal("Increase bilateral upper extremity coordination and standing tolerance.");
    setContext("Patient is a 68-year-old retired baker with PD (Parkinson's Disease), tremors, and decreased balance. Interested in baking and family activities.");
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-hand-holding-heart text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">OT Activity Lab</h1>
              <p className="text-xs text-gray-500 font-medium">Activity Analysis Specialist</p>
            </div>
          </div>
          <button 
            onClick={handleExample}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Load Example Case
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Input Form Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-clipboard-list text-indigo-500"></i> Case Input
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Therapeutic Goal</label>
                  <textarea 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Improve dynamic standing balance and reach..."
                    className="w-full h-24 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Patient Context</label>
                  <textarea 
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Interests, deficits (e.g., hemiparesis, low vision), or environmental constraints..."
                    className="w-full h-32 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'}`}
                >
                  {loading ? (
                    <><i className="fa-solid fa-circle-notch animate-spin"></i> Analyzing...</>
                  ) : (
                    <><i className="fa-solid fa-wand-magic-sparkles"></i> Generate Grading</>
                  )}
                </button>
              </form>
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                  {error}
                </div>
              )}
            </div>

            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                <i className="fa-solid fa-info-circle"></i> OT Pro Tip
              </h3>
              <p className="text-indigo-700 text-sm leading-relaxed">
                When designing interventions, ensure the activity is <strong>Occupation-Based</strong>. Meaningful tasks drive neuroplasticity and patient engagement more than rote exercise.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            {!result && !loading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 p-8 border-2 border-dashed border-gray-200 rounded-3xl">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl">
                  <i className="fa-solid fa-stethoscope"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-600">No Analysis Yet</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">Fill out the patient details and goal to generate a tiered intervention plan.</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="space-y-6 animate-pulse">
                <div className="h-20 bg-gray-200 rounded-2xl w-3/4"></div>
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Goal Analysis</h2>
                  <p className="text-xl font-semibold text-gray-800">{result.goalSummary}</p>
                </div>

                <div className="space-y-6">
                  {result.interventions.sort((a, b) => {
                    const order = { DOWNGRADE: 0, TARGET: 1, UPGRADE: 2 };
                    return order[a.gradingType] - order[b.gradingType];
                  }).map((intervention, index) => (
                    <InterventionCard key={index} intervention={intervention} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 py-3 px-4 z-20">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <p className="text-xs text-gray-500 font-medium">Created for Clinicians & OT Students</p>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-indigo-600 transition-colors">
              <i className="fa-solid fa-share-nodes"></i>
            </button>
            <button className="text-gray-400 hover:text-indigo-600 transition-colors" onClick={() => window.print()}>
              <i className="fa-solid fa-print"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
