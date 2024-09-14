// src/components/ClassPage.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link, useParams } from 'react-router-dom';

const ClassPage = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axios.get(`/class/${id}`);
        setClassData(res.data);
      } catch (err) {
        console.error(err.response.data.msg);
      }
    };
    fetchClass();
  }, [id]);

  return (
    <div className="class-page">
      {classData ? (
        <>
          <h2>{classData.name}</h2>
          <ul>
            {classData.units.map((unit) => (
              <li key={unit._id}>
                <Link to={`/unit/${unit._id}`}>{unit.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClassPage;
