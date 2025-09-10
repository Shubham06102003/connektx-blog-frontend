import React from 'react';

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600 mb-6"></div>
        <span className="text-lg font-semibold text-blue-700">{message}</span>
      </div>
    </div>
  );
}
