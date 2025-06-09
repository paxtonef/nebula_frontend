'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ApiTestPage() {
  const [healthStatus, setHealthStatus] = useState<{ status?: string; message?: string; timestamp?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const testBackendConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get the API URL from environment variable
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
      console.log('Using API URL:', apiUrl);
      
      // Call the health endpoint
      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      setHealthStatus(data);
    } catch (err) {
      console.error('Error testing backend connection:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>
      
      <Card className="mb-6 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Backend Connection Test</h2>
          <p className="text-gray-500">
            Test the connection to your Railway backend by calling the health endpoint
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">API URL:</p>
          <code className="bg-gray-100 p-2 rounded block">
            {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'} (health endpoint)
          </code>
        </div>
        
        {healthStatus && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-medium text-green-800">Connection Successful!</h3>
            <pre className="mt-2 text-sm overflow-auto p-2 bg-white rounded">
              {JSON.stringify(healthStatus, null, 2)}
            </pre>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-medium text-red-800">Connection Failed</h3>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            onClick={testBackendConnection} 
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Tips</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Make sure your backend is deployed and running on Railway</li>
          <li>Verify that <code className="bg-gray-100 px-1">NEXT_PUBLIC_API_URL</code> is set correctly in your Vercel environment variables</li>
          <li>Check that CORS is properly configured on your backend to allow requests from your frontend domain</li>
          <li>Ensure your database connection is working properly on Railway</li>
        </ul>
      </div>
    </div>
  );
}
