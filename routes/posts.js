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
      content: post.content
    }
  })
  res.status(200).json({ post: postList })
})

// 게시글 상세 조회 API
// 패스워드 조회 안되게 수정
router.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const posts = await Posts.find({});

  // 원하는 요소만 안보이게 하는 기능이 있어요 - 데이터 필드 숨기기
  const [postDetailList] = posts.filter((post) => postId === post.postId)

  res.status(200).json({ detail: postDetailList });
})

// 게시글 작성 API
router.post("/posts", async (req, res) => {
  const { postId, user, password, title, content } = req.body;

  // 글 작성시 오류메세지 띄우기 { message: '데이터 형식이 올바르지 않습니다.' }
  // const posts = await Posts.find({ postId });

  // if (posts.length) {
  //   return res.status(400).json({
  //     success: false,
  //     errorMessage: "이미 존재하는 postId입니다."
  //   });
  // }

  const createdPosts = await Posts.create({ postId, user, password, title, content });

  res.json({ posts: createdPosts });
})

// 게시글 수정 API
// 수정 에러 메세지 추가
router.put("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password, title, content } = req.body;

  const modifiedPost = await Posts.find({ postId });
  if (modifiedPost.length) {
    await Posts.updateOne({ password: password },
      { $set: { title: title, content: content } })
  }
  res.status(200).json({ success: true });
})

// 게시글 삭제 API
// 삭제 에러 메세지 추가
router.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  const deletePost = await Posts.find({ postId });
  if (deletePost.length) {
    await Posts.deleteOne({ postId });
  }
  res.status(200).json({ success: true });
})

module.exports = router;