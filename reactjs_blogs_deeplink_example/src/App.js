import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Simulate login (replace with actual authentication logic)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      navigate('/blogs'); // Redirect to blogs page on successful login
    } catch (error) {
      console.error(error); // Handle login errors (e.g., invalid credentials)
    } finally {
      setUsername(''); // Clear form fields after submission
      setPassword('');
    }
  };

  return (
    <div>
      <h1>Welcome to the Blog App!</h1>
      <p>This is the home page with dummy messages about blogs.</p>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/blogs">View Blogs (without login)</Link>
    </div>
  );
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dev.to/api/articles?username=djsmk123');
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      <ul className="list-group">
        {blogs.map((blog) => (
          <li key={blog.id} className="list-group-item">
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Blog = ({ id }) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dev.to/api/articles/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div className="card">
        <div className="card-body" dangerouslySetInnerHTML={{ __html: blog.body_html }}></div>
      </div>
    </div>
  );
};



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<Blog />} />
        {/* Remove the LoginForm route as it's not needed */}
      </Routes>
    </Router>
  );
};

export default App;
