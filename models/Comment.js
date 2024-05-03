const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  postId: String,
  name: String,
  userId: String
});

module.exports = mongoose.model('Comment', commentSchema);
