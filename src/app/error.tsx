"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred while loading the page.</p>
      <button onClick={() => router.push('/')}>Go back to Home</button>
    </div>
  );
};

export default ErrorPage;
