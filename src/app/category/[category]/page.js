"use client";
import { use } from 'react';
import { useEffect, useState } from 'react';
import { fetchNews } from '../../../utils/fetchNews';
import NewsCard from '../../../components/NewsCard';
import { Loader } from '../../../components/Loader';
import React from 'react';

let debounceTimeout;

export default function CategoryPage({ params }) {
  const { category } = use(params);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const getCategoryArticles = (searchQuery = '') => {
    setLoading(true);
    const endpoint = searchQuery.trim()
      ? `everything?q=${searchQuery}+${category}`
      : `top-headlines?country=us&category=${category}`;
    fetchNews(endpoint).then(data => {
      setArticles(data.articles);
      sessionStorage.setItem('articles', JSON.stringify(data.articles));
      setLoading(false);
    });
  };

  useEffect(() => {
    getCategoryArticles();
  }, [category]);

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      getCategoryArticles(query);
    }, 500);
  }, [query]);

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search in ${category}...`}
          className="bg-gray-100 border p-2 w-1/2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      {loading ? (
        <Loader />
      ) : articles.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No results found in {category}.</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center my-4 capitalize">{category} News</h1>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, idx) => <NewsCard key={idx} article={a} id={idx} />)}
          </div>
        </>
      )}
    </div>
  );
}
