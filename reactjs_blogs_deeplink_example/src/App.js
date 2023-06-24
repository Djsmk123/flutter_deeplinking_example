import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Blog App!</h1>
      <p>This is the home page with dummy messages about blogs.</p>
    </div>
  );
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get('https://dev.to/api/articles?username=djsmk123')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  
  useEffect(() => {
    axios
      .get(`https://dev.to/api/articles/${id}`)
      .then((response) => {
        setBlog(response.data);

      })
      .catch((error) => {
        
        console.log(error);
      });
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
      </Routes>
    </Router>
  );
};

export default App;
