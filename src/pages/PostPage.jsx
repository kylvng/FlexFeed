import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import { Link } from 'react-router-dom'; // Import Link component
import './PostPage.css'; 

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [upvotes, setUpvotes] = useState(0); // State for upvotes

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const { data: postData, error: postError } = await supabase
                    .from('FlexFeed')
                    .select('*')
                    .eq('id', postId)
                    .single();

                if (postError) {
                    throw postError;
                }

                setPost(postData);
                setUpvotes(postData.likes); // Set upvotes from post data

                const { data: commentData, error: commentError } = await supabase
                    .from('Comments')
                    .select('content, created_at')
                    .eq('post_id', postId);

                if (commentError) {
                    throw commentError;
                }

                setComments(commentData);
            } catch (error) {
                console.error('Error fetching post and comments:', error.message);
            }
        };

        fetchPostAndComments();
    }, [postId]);

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
    }

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        try {
            if (newComment.trim() !== '') {
                const { data, error } = await supabase
                    .from('Comments')
                    .insert([
                        { post_id: postId, content: newComment }
                    ]);

                if (error) {
                    throw error;
                }

                // Clear the input field after successful submission
                setNewComment('');

                // Fetch comments again to update the UI
                const { data: updatedComments, error: fetchError } = await supabase
                    .from('Comments')
                    .select('content, created_at')
                    .eq('post_id', postId);

                if (fetchError) {
                    throw fetchError;
                }

                setComments(updatedComments);
            }
        } catch (error) {
            console.error('Error submitting comment:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await supabase
                .from('FlexFeed')
                .delete()
                .eq('id', postId);

            // Redirect to home page after successful delete
            window.location = '/';
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    };
        // Function to handle upvote
        const handleUpvote = async () => {
            try {
                // Update the likes in the database
                await supabase
                    .from('FlexFeed')
                    .update({ likes: upvotes + 1 }) // Increment the likes count
                    .eq('id', postId);
                // Update the upvotes state
                setUpvotes(prevUpvotes => prevUpvotes + 1);
            } catch (error) {
                console.error('Error upvoting:', error.message);
            }
        };

    return (
        <div className="post-page-container">
            {post && (
                <div className="post-details">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    {post.img && <img src={post.img} alt="Post" />}
                    <p>Upvotes: {upvotes}</p> {/* Display the number of likes */}
                    <p>Posted: {getTimeAgo(post.created_at)}</p>

                    <div className="buttons">
                      <Link to={`/update/${postId}`}>Edit</Link>
                        <button onClick={handleUpvote} style={{ backgroundColor: 'grey', color: 'white' }}>Upvote</button>
                        <button onClick={handleDelete} style={{ backgroundColor: 'grey', color: 'white' }}>Delete</button>
                    </div>

                </div>
            )}
    
            <div className="comments-section">
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index} className="comment">
                            <p>{comment.content}</p>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleSubmitComment}>
                    <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment..."
                        required
                    ></textarea>
                    <button type="submit" style={{ backgroundColor: 'grey', color: 'white' }}>Submit</button>
                </form>
            </div>
        </div>
    );    
}

export default PostPage;
