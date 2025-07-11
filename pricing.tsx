import React from 'react';

export default function Pricing() {
  // All analysis is now free - redirect to donation page
  React.useEffect(() => {
    window.location.href = '/buy-me-a-beer';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">All analysis is now free! Redirecting to donation page...</p>
      </div>
    </div>
  );
}