{/* Post fetching component of the frontend */}

import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";
import axios from 'axios';
import Loader from "./Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        setPosts(response?.data);
      } catch (err) {
        setError("Failed to load posts. Please try again.");
      }

      setIsLoading(false);
    }
    fetchPosts();
  }, [])

  if(isLoading) {
    return (
      <section className="posts">
        <div className="container posts__container">
          {[...Array(6)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="posts error-section">
        <div className="container center">
          <h2>Oops!</h2>
          <p>{error}</p>
          <button className="btn primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </section>
    );
  }


  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({_id: id, thumbnail, category, title, description, creator, createdAt }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
              createdAt = {createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No Posts Found</h2>
      )}
    </section>
  );
};

export default Posts
