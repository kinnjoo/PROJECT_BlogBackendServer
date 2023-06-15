const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  // postId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  commentId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Comment", commentSchema);