const express = require("express");
const router = express.Router();

const Posts = require("../schemas/post.js");

// 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({});

  const postList = posts.map((post) => {
    return {
      postId: post._id,
      user: post.user,
      title: post.title,
      content: post.content
    }
  })
  res.status(200).json({ posts: postList })
})

// 게시글 상세 조회 API
router.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const postDetailList = await Posts.find({ _id: postId });

  res.status(200).json({ detail: postDetailList });
})

// 게시글 작성 API
router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body;
  const createdAt = new Date();

  if (user && password && title && content) {
    await Posts.create({ user, password, title, content, createdAt });
    return res.status(200).json({ message: "게시글을 생성하였습니다." })
  } else {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
  }
})

// 게시글 수정 API
router.put("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { user, password, title, content } = req.body;
  const createdAt = new Date();

  const modifiedPost = await Posts.find({ _id: postId, password });
  if (modifiedPost.length) {
    await Posts.updateOne({ user, password, title, content, createdAt })
    return res.status(200).json({
      message: "게시글을 수정하였습니다."
    });
  } else {
    return res.status(400).json({
      message: "데이터 형식이 올바르지 않습니다."
    })
  }
})

// 게시글 삭제 API
router.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;

  const deletePost = await Posts.find({ _id: postId, password });
  if (deletePost.length) {
    await Posts.deleteOne({ _id: postId });
    return res.status(200).json({
      message: "게시글을 삭제하였습니다."
    });
  } else {
    return res.status(400).json({
      message: "데이터 형식이 올바르지 않습니다."
    })
  }
})

module.exports = router;