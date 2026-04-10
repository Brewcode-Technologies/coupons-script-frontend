'use client';
import { useState, useEffect } from 'react';
import { getCategories } from '@/services/api';

export default function DebugCategories() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 Debug: Fetching categories...');
    getCategories()
      .then(res => {
        console.log('✅ Debug: Full API Response:', res);
        console.log('📊 Debug: Response Data:', res.data);
        console.log('🔢 Debug: Data Type:', typeof res.data);
        console.log('📋 Debug: Is Array:', Array.isArray(res.data));
        
        if (res.data?.data) {
          console.log('📦 Debug: Nested Data:', res.data.data);
          console.log('🔢 Debug: Nested Data Type:', typeof res.data.data);
          console.log('📋 Debug: Nested Is Array:', Array.isArray(res.data.data));
        }
        
        setResponse(res);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Debug: Error:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;

  const data = response?.data?.data ?? response?.data ?? [];
  const categories = Array.isArray(data) ? data : [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Categories Debug Page</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">API Response Info:</h2>
        <p>Status: {response?.status}</p>
        <p>Data Type: {typeof response?.data}</p>
        <p>Is Array: {Array.isArray(response?.data) ? 'Yes' : 'No'}</p>
        <p>Categories Found: {categories.length}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-bold mb-2">Raw Response:</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-40">
          {JSON.stringify(response?.data, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="font-bold mb-2">Parsed Categories ({categories.length}):</h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {categories.map((cat: any, index: number) => (
              <div key={index} className="p-2 border rounded">
                <strong>{cat.name}</strong>
                <br />
                <small>Slug: {cat.slug}</small>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500">No categories found in parsed data</p>
        )}
      </div>
    </div>
  );
}