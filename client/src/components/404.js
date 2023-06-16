import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
