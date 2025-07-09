'use client';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articles = JSON.parse(sessionStorage.getItem('articles') || '[]');
  const article = articles[params.id];

  if (!article) return <p className="p-4 text-center">Article not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 text-lg text-blue-800 cursor-pointer"
      >
        ← Back
      </button>
      {article.urlToImage && <img src={article.urlToImage} alt="" className="w-full h-64 object-cover rounded mb-4" />}
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(article.publishedAt).toLocaleString()}</p>
      <p className="text-lg leading-relaxed">{article.content || article.description}</p>
      <a href={article.url} target="_blank" className="text-blue-600 mt-4 block">Read full article on source</a>
    </div>
  );
}
