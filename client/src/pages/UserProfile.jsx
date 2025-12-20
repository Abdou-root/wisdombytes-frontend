{/* User Profile component of the frontend */}

import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { getImageUrl } from "../utils/imageUtils";

const UserProfile = () => {
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(""); // Server URL
  const [avatarPreview, setAvatarPreview] = useState(""); // Local file preview
  const [avatarFile, setAvatarFile] = useState(null); // File object for upload
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  // redirect to login page for any user with null token

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  },[currentUser, navigate]);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/current`,
        { withCredentials: true }
      );
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    };
    if (currentUser) {
      getUser();
    }
  }, [currentUser, navigate]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatarFile);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true }
      );
      // Clean up preview URL
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatar(response?.data.avatar);
      setAvatarPreview("");
      setAvatarFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        // logout to re-login
        console.log("logging out");
        navigate("/logout");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser?.id}`} className="btn">
          My Posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={avatarPreview || getImageUrl(avatar, 'avatar')}
                alt=""
              />
            </div>
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Clean up previous preview if exists
                    if (avatarPreview) {
                      URL.revokeObjectURL(avatarPreview);
                    }
                    setAvatarFile(file);
                    setAvatarPreview(URL.createObjectURL(file));
                    setIsAvatarTouched(true);
                  }
                }}
                accept="png, jpg, jpeg"
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile__avatar-btn"
                onClick={changeAvatarHandler}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{name}</h1>

          <form className="form profile__form" onSubmit={updateUserDetails}>
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update info
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
