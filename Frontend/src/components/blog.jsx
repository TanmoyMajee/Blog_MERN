

// export default Blog;
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Blog = ({ _id, title, about, post_pic, user, createdAt }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full mx-auto transform transition-all duration-300 hover:scale-105">
      <Link to={`/postpage/${_id}`}>
        <img
          className="h-48 w-full object-cover"
          src={post_pic}
          alt="Blog"
        />
      </Link>
      <div className="p-4">
        <Link to={`/postpage/${_id}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {title}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 mb-1">Blog Author: {user.name}</p>
        <p className="text-sm text-gray-600 mb-4">{about}</p>
        <time className="text-sm text-gray-500">
          CreatedAt: {format(new Date(createdAt), 'MMM d, yyyy HH:mm')}
        </time>
      </div>

    </div>
  );
};

export default Blog;
