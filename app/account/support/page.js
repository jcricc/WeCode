'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Support() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('support_requests')
        .insert([{ user_id: user.id, message }]);

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Support request submitted successfully');
        setMessage('');
      }
    } else if (userError) {
      setError(userError.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 p-2 block w-full rounded border"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
