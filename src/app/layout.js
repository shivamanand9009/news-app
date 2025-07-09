import '../app/globals.css';
import Navbar from '../components/Navbar';
import React from 'react';

export const metadata = {
  title: 'NewsApp',
  description: 'News powered by NewsAPI.org',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}