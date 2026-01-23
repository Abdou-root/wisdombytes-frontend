import React from 'react'

const AuthorSkeleton = () => {
  return (
    <div className="author skeleton">
      <div className="author__avatar skeleton-box"></div>
      <div className="author__info">
        <div className="skeleton-text" style={{ width: '120px', height: '1.25rem' }}></div>
        <div className="skeleton-text" style={{ width: '60px', height: '0.875rem' }}></div>
      </div>
    </div>
  )
}

export default AuthorSkeleton
