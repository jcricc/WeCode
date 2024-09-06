'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchAnalytics(user.id);
      } else if (error) {
        setError(error.message);
      }
    };

    const fetchAnalytics = async (userId) => {
      const { data, error } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        setError(error.message);
      } else {
        setAnalytics(data);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Your Analytics</h2>
        {analytics.length === 0 ? (
          <p>No analytics data available</p>
        ) : (
          <ul>
            {analytics.map((item, index) => (
              <li key={index} className="mb-2">
                <p><strong>{item.metric}:</strong> {item.value}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
