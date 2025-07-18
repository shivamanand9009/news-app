"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { fetchNews } from '../utils/fetchNews';
import NewsCard from '../components/NewsCard';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';

let debounceTimeout;

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getArticles = (page, query = '') => {
    setLoading(true);
    const endpoint = query
      ? `everything?q=${query}&pageSize=10&page=${page}`
      : `top-headlines?country=us&pageSize=10&page=${page}`;
    fetchNews(endpoint).then(data => {
      setArticles(data.articles);
      sessionStorage.setItem('articles', JSON.stringify(data.articles));
      setLoading(false);
    });
  };

  useEffect(() => {
    getArticles(page);
  }, [page]);

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (query.trim() === '') {
        getArticles(page);
      } else {
        getArticles(1, query);
        setPage(1);
      }
    }, 500);
  }, [query]);

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search top headlines..."
          className="bg-gray-100 border p-2 w-1/2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      {loading ? (
        <Loader />
      ) : articles.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No results found.</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, idx) => <NewsCard key={idx} article={a} id={idx} />)}
          </div>
          <Pagination page={page} setPage={setPage} />
        </>
      )}
    </div>
  );
}