{/* Delete Post component of the frontend */}

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(UserContext);

  // redirect to login page for any user with null token
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const removePost = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <button className="btn sm danger" onClick={() => setShowConfirm(true)}>
        Delete
      </button>
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={removePost}
        onCancel={() => setShowConfirm(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isDanger={true}
      />
      <ConfirmModal
        isOpen={!!error}
        title="Error"
        message={error || ''}
        onConfirm={() => setError(null)}
        onCancel={() => setError(null)}
        confirmText="OK"
        cancelText=""
      />
    </>
  );
};

export default DeletePost;
