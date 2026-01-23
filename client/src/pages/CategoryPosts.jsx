{/* Posts by category component of the frontend */}

import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import axios from "axios";
import Loader from '../components/Loader'
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const {category} = useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`);
        setPosts(response?.data);
      } catch (err) {
        setError("Failed to load posts. Please try again.");
      }

      setIsLoading(false);
    }
    fetchPosts();
  }, [category])

  if(isLoading) {
    return <Loader/>
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

export default CategoryPosts;
