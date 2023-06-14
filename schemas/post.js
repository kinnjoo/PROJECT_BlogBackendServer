const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userPassword: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creatDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Posts", postSchema);