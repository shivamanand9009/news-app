import Link from 'next/link';
import React from 'react';

export default function NewsCard({ article, id }) {
  const isBreaking = (() => {
    const published = new Date(article.publishedAt);
    const now = new Date();
    const diffMinutes = (now - published) / (1000 * 60);
    return diffMinutes <= 180;
  })();

  return (
    <div className="bg-gray-100 border rounded-xl p-4 shadow-md">
      {article.urlToImage && (
        <img src={article.urlToImage} alt="" className="w-full h-40 object-cover rounded" />
      )}

      <Link href={`/article/${id}`}>
        <h2 className="font-bold text-xl my-2 cursor-pointer">
          {article.title}
          {isBreaking && (
            <span className="ml-2 px-2 py-1 text-xs bg-red-600 text-white rounded">
              Breaking
            </span>
          )}
        </h2>
      </Link>

      <p className="text-sm">{article.description}</p>

      <Link href={`/article/${id}`} className="text-blue-600">
        Read more
      </Link>
    </div>
  );
}
