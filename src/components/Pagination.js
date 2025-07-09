import React from 'react';

export function Pagination({ page, setPage }) {
  return (
    <div className="flex justify-center gap-4 my-6">
      <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded">Prev</button>
      <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-300 rounded">Next</button>
    </div>
  );
}