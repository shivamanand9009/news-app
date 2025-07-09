import React from 'react';

export async function fetchNews(endpoint) {
  try {
    const res = await fetch(`https://newsapi.org/v2/${endpoint}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
    if (!res.ok) {
      const err = await res.json();
      console.error('API error:', err);
      throw new Error('Failed to fetch');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err.message);
    return { articles: [], error: true };
  }
}

