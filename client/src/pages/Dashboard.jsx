{/* User dashboard component of the frontend */}

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import { getImageUrl } from "../utils/imageUtils";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const { currentUser } = useContext(UserContext);

  // redirect to login page for any user with null token
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${currentUser?._id}`,
          {
            withCredentials: true,
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      <div className="container dashboard__container">
        <div className="dashboard__header">
          <h2>My Posts</h2>
          <Link to="/create" className="btn primary">
            + Create New Post
          </Link>
        </div>
        
        {posts.length > 0 ? (
          <>
            {posts.map((post) => {
              return (
                <article key={post.id} className="dashboard__post">
                  <div className="dashboard__post-thumbnail">
                    <img
                      src={getImageUrl(post.thumbnail, 'thumbnail')}
                      alt=""
                    />
                  </div>
                  <h5>{post.title}</h5>
                  <div className="dashboard__post-actions">
                    <Link to={`/posts/${post._id}`} className="btn sm">
                      View
                    </Link>
                    <Link
                      to={`/posts/${post._id}/edit`}
                      className="btn sm primary"
                    >
                      Edit
                    </Link>
                    <DeletePost postId={post._id} />
                  </div>
                </article>
              );
            })}
          </>
        ) : (
          <div className="dashboard__empty">
            <h2>You haven't posted yet</h2>
            <p>Share your knowledge with the community!</p>
            <Link to="/create" className="btn primary lg">
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
