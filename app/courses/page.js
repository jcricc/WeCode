'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) {
        setError(error.message);
      } else {
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
