"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef, Suspense } from 'react'; // Import Suspense
import dynamic from 'next/dynamic';
import { lineNumbers } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { supabase } from '../lib/supabase';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Script from 'next/script';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });

const saveStateToLocalStorage = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

const loadStateFromLocalStorage = (key) => {
  const state = localStorage.getItem(key);
  return state ? JSON.parse(state) : null;
};

const extractStarterFunction = (text) => {
  const functionMatch = text.match(/def\s+\w+\s*\(.*?\)\s*(->\s*\w+\s*)?:/);
  return functionMatch ? functionMatch[0] + '\n' : '';
};

const fetchQuestion = async (language, difficulty, setQuestion, setCode, setError, setLoading) => {
  if (language && difficulty) {
    setLoading(true);
    try {
      const response = await fetch(`/api/generate_question?language=${language}&difficulty=${difficulty}`);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setQuestion(data.question);

      const starterFunction = extractStarterFunction(data.question);
      if (starterFunction) {
        setCode(starterFunction);
        starterFunctionSet.current = true;
      } else {
        setCode('');
      }
    } catch (err) {
      setError(`Failed to generate question: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }
};

export default function Exercise() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const language = searchParams.get('language');
  const difficulty = searchParams.get('difficulty');
  const [question, setQuestion] = useState('');
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [error, setError] = useState('');
  const [helpQuery, setHelpQuery] = useState('');
  const [helpResponse, setHelpResponse] = useState('');
  const [activeTab, setActiveTab] = useState('question');
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [personalizedFeedback, setPersonalizedFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  const starterFunctionSet = useRef(false);

  useEffect(() => {
    const loadState = async () => {
      const savedQuestion = loadStateFromLocalStorage('question');
      const savedCode = loadStateFromLocalStorage('code');

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);

        if (data && data.length > 0) {
          const userProgress = data[0];
          setPoints(userProgress.points);
          setLevel(userProgress.level);
          setAchievements(userProgress.achievements || []);

          if (userProgress.question && userProgress.code) {
            setQuestion(userProgress.question);
            setCode(userProgress.code);
            return;
          }
        }
      }

      if (savedQuestion && savedCode) {
        setQuestion(savedQuestion);
        setCode(savedCode);
      } else {
        fetchQuestion(language, difficulty, setQuestion, setCode, setError, setLoading);
      }
    };

    loadState();
  }, [language, difficulty]);

  useEffect(() => {
    saveStateToLocalStorage('question', question);
    saveStateToLocalStorage('code', code);
  }, [question, code]);

  const runCode = async () => {
    try {
      const response = await fetch('/api/check_code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, question }),
      });
      const data = await response.json();
      setIsCorrect(data.correct);
      setFeedback(data.feedback);

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw new Error(userError.message);
      }

      if (user) {
        const pointsEarned = data.correct ? 1 : 0;
        const newPoints = points + pointsEarned;
        const newLevel = Math.floor(newPoints / 100) + 1;
        setPoints(newPoints);
        setLevel(newLevel);

        const { error } = await supabase
          .from('user_progress')
          .upsert([
            { user_id: user.id, question_id: 1, points: newPoints, correct: data.correct, feedback: data.feedback, question, code }
          ]);

        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (err) {
      setError(`Failed to run code: ${err.message}`);
    }
  };

  const getNextQuestion = async () => {
    setFeedback('');
    setIsCorrect(null);
    setError('');
    starterFunctionSet.current = false;
    setCode('');
    await fetchQuestion(language, difficulty, setQuestion, setCode, setError, setLoading);
  };

  const askForHelp = () => {
    fetch('/api/ask_for_help', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, helpQuery }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setHelpResponse(data.response);
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
        <div className="w-full md:w-1/2 p-4 h-full">
          <div className="border rounded-lg overflow-hidden shadow-sm h-full">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[lineNumbers(), python()]}
              theme={oneDark}
              onChange={(value) => setCode(value)}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg text-black overflow-auto">
          <div className="flex justify-between mb-4">
            <h3
              className={`text-2xl font-semibold cursor-pointer ${
                activeTab === 'question' ? 'text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('question')}
            >
              Question
            </h3>
            <h3
              className={`text-2xl font-semibold cursor-pointer ${
                activeTab === 'help' ? 'text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('help')}
            >
              Help
            </h3>
          </div>
          {activeTab === 'question' ? (
            <>
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <Script
                    src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
                    type="module"
                  />
                  <dotlottie-player
                    src="https://lottie.host/6ac992f5-bcce-408a-9b5b-78946e3ceb02/7kVZkD8xb6.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '300px', height: '300px' }}
                    loop
                    autoplay
                  ></dotlottie-player>
                </div>
              ) : (
                <div className="bg-gray-100 p-4 rounded mb-4 shadow-sm h-96 overflow-y-auto">
                  <MarkdownRenderer content={question} />
                </div>
              )}
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={runCode}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Run Code
                </button>
                {isCorrect && (
                  <button
                    onClick={getNextQuestion}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Next Question
                  </button>
                )}
              </div>
              {isCorrect !== null && (
                <div className="mt-4 max-h-96 overflow-auto">
                  <h4 className="text-xl font-semibold mb-2">Feedback:</h4>
                  <div
                    className={`p-4 rounded border ${
                      isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'
                    }`}
                  >
                    <MarkdownRenderer content={feedback} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-100 p-4 rounded mb-4 shadow-sm max-h-64 overflow-y-auto">
              <textarea
                className="w-full p-2 mb-4 border rounded"
                rows="4"
                value={helpQuery}
                onChange={(e) => setHelpQuery(e.target.value)}
                placeholder="Ask a question about the main question..."
              />
              <button
                onClick={askForHelp}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Ask for Help
              </button>
              {helpResponse && (
                <div className="mt-4">
                  <h4 className="text-xl font-semibold mb-2">Help Response:</h4>
                  <div className="bg-white p-4 rounded border shadow-sm">
                    <MarkdownRenderer content={helpResponse} />
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="mt-4">
            <h4 className="text-xl font-semibold mb-2">Your Progress</h4>
            <div className="bg-white p-4 rounded border shadow-sm">
              <p>Points: {points}</p>
              <p>Level: {level}</p>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Achievements:</h4>
                <ul>
                  {achievements.map((achievement, index) => (
                    <li key={index}>{achievement.achievement}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Personalized Feedback:</h4>
                <div className="bg-white p-4 rounded border shadow-sm">
                  <MarkdownRenderer content={personalizedFeedback} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

