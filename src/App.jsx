import React, { useEffect, useState } from 'react';
import './App.css';
import {
  fetchPosts,
  updatePosts,
  deletePost,
  createPost
} from './services/apiService';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postData = await fetchPosts();
      setPosts(postData);
    };
    getPosts();
  }, []);

  const handleUpdatePost = async (id) => {

    const updatedPosts = {
      title: 'Updated Post',
      body: `This is an updated post ${Date.now()}`,
      userID: 1,
    }

    const post = await updatePosts(id, updatedPosts);

    setPosts(posts.map((p) => p.id === id ? post : p));
  }

  const handleDeletePosts = async (id) => {
    await deletePost(id);

    setPosts(posts.filter((p) => p.id != id));
  }

  const handleCreatePost = async () => {
    const newPost = {
      title: 'New post',
      body: `This is a new post as of ${Date.now()}`,
      userID: 1
    }

    const post = await createPost(newPost); 

    setPosts([post,...posts]);
  }

  return (
    <div className="app">
      <div className="app-container ">

        <h1 className='text-dark'>Recent Posts</h1>
        <div className="create-btn-container text-end my-3">
        <button className='btn btn-primary' onClick={handleCreatePost}>Create post</button>
        </div>
        {posts.length != 0 ? <div className="body d-flex flex-column rounded text-dark " >
          {posts.map(post => (
            <div className="post p-4 mb-3 rounded" key={post.id}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.body}</p>

              <div className="buttons d-flex gap-1 justify-content-end">
                <button className='btn btn-primary button_update' onClick={() => handleUpdatePost(post.id)}>Update</button>
                <button className='btn btn-danger delete' onClick={() => handleDeletePosts(post.id)}>Delete</button>
              </div>
            </div>


          ))}
        </div> : <h3 className='text-center'>No post!</h3>}
      </div>
    </div>
  );
}

export default App;
