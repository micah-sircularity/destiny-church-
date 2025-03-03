import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load posts from localStorage on initial render
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Sample data if no posts found
      setPosts([
        {
          id: uuidv4(),
          title: 'Sunday Service Highlights',
          content: 'Join us this Sunday for an inspiring message from Pastor Johnson!',
          platform: 'Facebook',
          scheduledDate: new Date(Date.now() + 86400000).toISOString(),
          status: 'scheduled',
        },
        {
          id: uuidv4(),
          title: 'Youth Group Event',
          content: 'Youth group meets this Friday at 7 PM. Bring a friend!',
          platform: 'Instagram',
          scheduledDate: new Date(Date.now() + 345600000).toISOString(),
          status: 'draft',
        },
      ]);
    }
    setLoading(false);
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }, [posts, loading]);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: uuidv4(),
    };
    setPosts([...posts, newPost]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <AppContext.Provider value={{
      posts,
      addPost,
      updatePost,
      deletePost,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
}
