import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Post from "../components/Post";

function Home() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('newest'); // State for filter option

    useEffect(() => {
        async function fetchPosts() {
            try {
                let query = supabase.from('FlexFeed').select('*');
                if (filter === 'newest') {
                    query = query.order('created_at', { ascending: false });
                } else if (filter === 'mostPopular') {
                    query = query.order('likes', { ascending: false });
                }

                const { data: posts, error } = await query;

                if (error) {
                    throw error;
                }

                setPosts(posts);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        }

        fetchPosts();
    }, [filter]); // Fetch posts when the filter changes

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    return (
      <>
          <div className="home-page">
              <div className="filter-section">
                  <label htmlFor="filter">Filter by:</label>
                  <select id="filter" value={filter} onChange={handleFilterChange}>
                      <option value="newest">Newest</option>
                      <option value="mostPopular">Most Popular</option>
                  </select>
              </div>
              {posts.length === 0 ? (
                  <p style={{ textShadow: '1px 1px 1px rgba(0, 0, 0)', fontSize: '22px' }}>create the first post!</p>
              ) : (
                  posts.map(post => (
                      <Post key={post.id} post={post} />
                  ))
              )}
          </div>
      </>
  );  
}

export default Home;
