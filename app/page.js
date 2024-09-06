'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState('python');
  const [difficulty, setDifficulty] = useState('beginner');

  const startExercise = () => {
    router.push(`/exercise?language=${language}&difficulty=${difficulty}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      {/* Header Fix: Ensure the content doesn't overlap */}

      {/* Main Content */}
      <div className="pt-24 text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">Master Coding with Real-Time AI Feedback</h1>
        <p className="text-2xl mb-8">Select your preferred language and difficulty level to start practicing now.</p>
        <button className="bg-yellow-500 text-black py-2 px-6 rounded-lg text-lg hover:bg-yellow-600 mb-4">
          Sign Up for Pro Features
        </button>
        <p className="text-sm text-gray-400">Unlock additional content, challenges, and AI-driven insights.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="card bg-gray-800 p-6 rounded-lg text-center shadow-lg">
          <h3 className="text-xl mb-4">Select Language:</h3>
          <div className="space-y-2">
            <button className={`w-full py-2 px-4 rounded ${language === 'python' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('python')}>Python</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'javascript' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('javascript')}>JavaScript</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'java' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('java')}>Java</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'cpp' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('cpp')}>C++</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'ruby' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('ruby')}>Ruby</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'go' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('go')}>Go</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'rust' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('rust')}>Rust</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'swift' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('swift')}>Swift</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'php' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('php')}>PHP</button>
            <button className={`w-full py-2 px-4 rounded ${language === 'csharp' ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => setLanguage('csharp')}>C#</button>
          </div>
        </div>

        <div className="card bg-gray-800 p-6 rounded-lg text-center shadow-lg">
          <h3 className="text-xl mb-4">Select Difficulty:</h3>
          <div className="space-y-2">
            <button className={`w-full py-2 px-4 rounded ${difficulty === 'beginner' ? 'bg-green-500' : 'bg-green-900 hover:bg-green-600'}`} onClick={() => setDifficulty('beginner')}>Beginner</button>
            <button className={`w-full py-2 px-4 rounded ${difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-yellow-900 hover:bg-yellow-600'}`} onClick={() => setDifficulty('intermediate')}>Intermediate</button>
            <button className={`w-full py-2 px-4 rounded ${difficulty === 'advanced' ? 'bg-red-500' : 'bg-red-900 hover:bg-red-600'}`} onClick={() => setDifficulty('advanced')}>Advanced</button>
          </div>
        </div>
      </div>

      <button onClick={startExercise} className="bg-blue-500 text-white py-4 px-8 rounded-lg text-2xl hover:bg-blue-600">
        Start Coding Exercise
      </button>

      <div className="mt-12 text-center">
        <p className="text-lg text-gray-300 mb-2">Interested in personalized mentoring?</p>
        <button className="bg-purple-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-purple-600">
          Learn More About Premium Mentoring
        </button>
      </div>
    </div>
  );
}
