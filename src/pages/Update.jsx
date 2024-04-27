import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './Create.css';

function Update() {
    const { postId } = useParams();
    const [post, setPost] = useState({ title: "", img: "", description: "" });

    useEffect(() => {

        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('FlexFeed')
                    .select('*')
                    .eq('id', postId)
                    .single();

                if (error) {
                    throw error;
                }

                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await supabase
                .from('FlexFeed')
                .update({
                    title: post.title,
                    img: post.img,
                    description: post.description
                })
                .eq('id', postId);

            // Redirect to the post page after successful update
            window.location = `/post/${postId}`;
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    };

    return (
        <div className="create-page">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="img"
                        value={post.img}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Update;
