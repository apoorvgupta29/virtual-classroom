// src/components/SessionPage.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';

const SessionPage = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [comment, setComment] = useState('');
  const [discussion, setDiscussion] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/session/${id}`);
        setSession(res.data);
        setDiscussion(res.data.discussions);
      } catch (err) {
        console.error(err.response.data.msg);
      }
    };
    fetchSession();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/discussion/comment/${id}`, { content: comment });
      setDiscussion([...discussion, res.data]);
      setComment('');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div className="session-page">
      {session ? (
        <>
          <h2>{session.name}</h2>
          <div className="materials">
            <h3>Materials</h3>
            {session.materials.map((material, idx) => (
              <p key={idx}>{material}</p>
            ))}
          </div>
          <div className="discussion">
            <h3>Discussion</h3>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit">Submit</button>
            </form>
            <ul>
              {discussion.map((disc) => (
                <li key={disc._id}>{disc.content}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SessionPage;
