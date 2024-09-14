const express = require('express');
const Discussion = require('./models/Discussion');
const Session = require('./models/Session');
const auth = require('../middleware/auth');
const router = express.Router();

// Post a comment to a session
router.post('/comment/:sessionId', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const newComment = new Discussion({
      sessionId: req.params.sessionId,
      authorId: req.user.id,
      content
    });

    await newComment.save();

    const updatedSession = await Session.findByIdAndUpdate(
      req.params.sessionId,
      { $push: { discussions: newComment._id } },
      { new: true }
    );

    res.json(updatedSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Reply to a comment
router.post('/reply/:commentId', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const newReply = new Discussion({
      sessionId: req.body.sessionId,
      authorId: req.user.id,
      content
    });

    await newReply.save();

    const updatedComment = await Discussion.findByIdAndUpdate(
      req.params.commentId,
      { $push: { replies: newReply._id } },
      { new: true }
    );

    res.json(updatedComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;