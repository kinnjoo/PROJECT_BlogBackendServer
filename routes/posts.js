const express = require("express");
const router = express.Router();

const Posts = require("../schemas/post.js");

// 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({});

  const postList = posts.map((post) => {
    return {
      postId: post.postId,
      user: post.user,
      title: post.title,
    }
  })
  res.status(200).json({ post: postList })
})

// 게시글 상세 조회 API
// router.get("/posts/:postId", (req, res) => {
//   const { postId } = req.params;

//   // let result = null;
//   // for (const post of posts) {
//   //   if (Number(postId) === post.postId) {
//   //     result = post;
//   //   }
//   // }
//   // 위에 있는 for문과 같은 결과값 가져옴
//   const [result] = posts.filter((post) => Number(postId) === post.postId)

//   res.status(200).json({ detail: result });
// })

// 게시글 작성 API
router.post("/posts", async (req, res) => {
  const { postId, user, password, title, content } = req.body;

  const posts = await Posts.find({ postId });

  if (posts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 postId입니다."
    });
  }

  const createdPosts = await Posts.create({ postId, user, password, title, content });

  res.json({ posts: createdPosts });
})

module.exports = router;