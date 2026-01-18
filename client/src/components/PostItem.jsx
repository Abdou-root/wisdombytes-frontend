import React from 'react'
import { Link } from 'react-router-dom'

import PostAuthor from './PostAuthor'
import { sanitizeHTML, stripHTML } from '../utils/sanitize'
import { getImageUrl } from '../utils/imageUtils'

const PostItem = ({ postID, category, title, description, authorID, thumbnail, createdAt
 }) => {
        // Strip HTML first for consistent character counting
        const plainText = stripHTML(description);
        const shortDescription = plainText.length > 120 ? plainText.substr(0, 120) + '...' : plainText;
        const postTitle = title.length > 50 ? title.substr(0, 50) + '...' : title; 

    return (
        <article className="post">
            <div className="post__thumbnail">
                <img src={getImageUrl(thumbnail, 'thumbnail')} alt={title} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${postID}`}>
                    <h3>{postTitle}</h3>
                </Link>
                <p className="post__description">{shortDescription}</p>
                <div className="post__footer">
                    <PostAuthor authorID={authorID} createdAt = {createdAt}/>
                    <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
                </div>
            </div>
        </article>
    )
}

export default PostItem