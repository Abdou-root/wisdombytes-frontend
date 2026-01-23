{/* Author fetching component of the frontend */}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from '../components/Loader'
import AuthorSkeleton from '../components/AuthorSkeleton'
import { getImageUrl } from '../utils/imageUtils';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
        setAuthors(response.data);
      } catch (err) {
        setError("Failed to load authors. Please try again.");
      }
      setIsLoading(false);
    };
    getAuthors();
  }, []);

  if(isLoading){
    return (
      <section className="authors">
        <div className="container authors__container">
          {[...Array(8)].map((_, index) => (
            <AuthorSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="authors error-section">
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
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({ _id: id, avatar, name, posts }) => {
            return (
              <Link key={id} to={`/posts/users/${id}`} className="author">
                <div className="author__avatar">
                  <img src={getImageUrl(avatar, 'avatar')} alt={`Image of ${name}`} />
                </div>
                <div className="author__info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No Authors Found</h2>
      )}
    </section>
  );
};

export default Authors;
