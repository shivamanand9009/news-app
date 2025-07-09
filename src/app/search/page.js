"use client";
import { useState } from 'react';
import { fetchNews } from '../../utils/fetchNews';
import NewsCard from '../../components/NewsCard';
import {Loader} from '../../components/Loader';
import React from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await fetchNews(`everything?q=${query}`);
    setArticles(data.articles);
    sessionStorage.setItem('articles', JSON.stringify(data.articles));
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex justify-center my-6 gap-2">
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} className="border p-2 w-1/2 rounded" placeholder="Search news..." />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>
      <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? <Loader /> : articles.map((a, idx) => <NewsCard key={idx} article={a} id={idx} />)}
      </div>
    </div>
  );
}
