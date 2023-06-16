const express = require("express");
const router = express.Router();

const Comments = require("../schemas/comment.js");

// 댓글 목록 조회 API
// 작성 날짜 기준으로 내림차순 정렬
router.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const commentList = await Comments.find({ postId });

  res.status(200).json({ comments: commentList });
});

// 댓글 작성 API
// 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
router.post("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { user, password, content } = req.body;
  const createdAt = new Date();

  if (user && password && content) {
    await Comments.create({ user, password, content, createdAt, postId });
    return res.status(200).json({ message: "댓글을 생성하였습니다." })
  } else {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
  }
})

// 댓글 수정 API
// 비밀번호 일치 확인
// 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
router.put("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { user, password, content } = req.body;
  const createdAt = new Date();

  const modifiedComment = await Comments.find({ user, password });
  if (modifiedComment.length) {
    await Comments.updateOne({ user, password, content, createdAt, postId })
    return res.status(200).json({ message: "댓글을 수정하였습니다." });
  } else {
    return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
  }
})

// 댓글 삭제 API
// 비밀번호 일치 확인
router.delete("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;

  const deleteComment = await Comments.find({ _id: postId, password });
  if (deleteComment.length) {
    await Comments.deleteOne({ _id: postId });
    return res.status(200).json({ message: "댓글을 삭제하였습니다." });
  } else {
    return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
  }
})

module.exports = router;