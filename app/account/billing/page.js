'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Billing() {
  const [billingInfo, setBillingInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBillingInfo = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('billing_info')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          setError(error.message);
        } else {
          setBillingInfo(data[0]);
        }
      } else if (error) {
        setError(error.message);
      }
    };

    fetchBillingInfo();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>
      {error && <p className="text-red-500">{error}</p>}
      {billingInfo ? (
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Your Billing Information</h2>
          <p><strong>Plan:</strong> {billingInfo.plan}</p>
          <p><strong>Status:</strong> {billingInfo.status}</p>
          <p><strong>Next Billing Date:</strong> {billingInfo.next_billing_date}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Update Billing Info
          </button>
        </div>
      ) : (
        <p>Loading billing information...</p>
      )}
    </div>
  );
}
