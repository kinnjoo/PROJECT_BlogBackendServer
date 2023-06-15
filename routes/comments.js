const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comment.js");
const Posts = require("../schemas/post.js");

// 댓글 목록 조회 API
// 필요한 요소 : postId, commentId, user, content
router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });

  const commentList = comments.map((comment) => {
    return {
      commentId: commentId,
      user: comment.user,
      content: comment.content
    }
  })
  res.status(200).json({ comment: commentList })
})


// 댓글 작성 API
router.post("/comments/:postId", async (req, res) => {
  // const { postId } = req.params;
  const { commentId, user, password, content } = req.body;

  // const comments = await Comment.find({ postId });
  // if (!comments.length) {
  //   return res.status(400).json({
  //     success: false,
  //     erroMessage: "입력값이 잘못 입력되었습니다."
  //   });
  // }
  // Posts의 PostId를 통해 PostId가 일치하면 createdCommets, 불일치하면 에러 메세지

  const createdComments = await Comment.create({ commentId, user, password, content });

  res.json({ comments: createdComments });
})

module.exports = router;