// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/class');
        setClasses(res.data);
      } catch (err) {
        console.error(err.response.data.msg);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="home">
      <h2>Classes</h2>
      <ul>
        {classes.map((classObj) => (
          <li key={classObj._id}>
            <Link to={`/class/${classObj._id}`}>{classObj.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
