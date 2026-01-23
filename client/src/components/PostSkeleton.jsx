import React from 'react'

const PostSkeleton = () => {
  return (
    <article className="post skeleton">
      <div className="post__thumbnail skeleton-box"></div>
      <div className="post__content">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-description"></div>
        <div className="skeleton-text skeleton-description short"></div>
        <div className="post__footer">
          <div className="post__author skeleton-author">
            <div className="skeleton-circle"></div>
            <div className="skeleton-text skeleton-author-info"></div>
          </div>
          <div className="skeleton-text skeleton-category"></div>
        </div>
      </div>
    </article>
  )
}

export default PostSkeleton
