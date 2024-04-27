import React, { useState } from 'react';
import { supabase } from '../client';
import './Create.css'

function Create() {
    const [post, setPost] = useState({ title: "", img: "", description: "", likes: 0 });
    const [formErrors, setFormErrors] = useState({});

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
            if (Object.keys(formErrors).length === 0) {
                await supabase
                    .from('FlexFeed')
                    .insert([
                        {
                            title: post.title,
                            img: post.img,
                            description: post.description
                        }
                    ]);
                window.location = "/";
            } else {
                console.error("Form errors:", formErrors);
            }
        } catch (error) {
            console.error('Error creating post:', error.message);
        }
    };

    return (
        <div className="create-page">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:  </label>
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:  </label>
                    <input
                        type="text"
                        name="img"  // Change to "img" to match the state property
                        value={post.img}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:  </label>
                    <textarea
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default Create;
