import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './Post.css';

function Post({ post }) {
    // Function to calculate the time difference between two timestamps
    const getTimeAgo = (timestamp) => {
        const currentTime = new Date();
        const postTime = new Date(timestamp);
        const timeDifference = currentTime - postTime;

        // Calculate the time in seconds, minutes, hours, days, weeks, or months
        if (timeDifference < 60000) {
            return `${Math.floor(timeDifference / 1000)} sec ago`;
        } else if (timeDifference < 3600000) {
            return `${Math.floor(timeDifference / 60000)} min ago`;
        } else if (timeDifference < 86400000) {
            return `${Math.floor(timeDifference / 3600000)} hrs ago`;
        } else if (timeDifference < 604800000) {
            return `${Math.floor(timeDifference / 86400000)} days ago`;
        } else if (timeDifference < 2592000000) {
            return `${Math.floor(timeDifference / 604800000)} weeks ago`;
        } else if (timeDifference < 31536000000) {
            return `${Math.floor(timeDifference / 2592000000)} months ago`;
        } else {
            return `${Math.floor(timeDifference / 31536000000)} years ago`;
        }
    };

    return (
        <Link to={`/post/${post.id}`} className="post-link"> {/* Wrap the post with Link component */}
            <div className="post">
                <h3>{post.title}</h3>
                <h4>Upvotes: {post.likes}</h4>
                <p>Posted: {getTimeAgo(post.created_at)}</p>
            </div>
        </Link>
    );
}

export default Post;
