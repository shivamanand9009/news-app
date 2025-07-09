// src/components/Loader.jsx
import React from 'react';

export function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        role="status"
        className="animate-spin rounded-full h-50 w-50 border-b-2 border-blue-500"
      />
    </div>
  );
}
