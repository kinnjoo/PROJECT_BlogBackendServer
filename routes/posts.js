const express = require("express");
const router = express.Router();

const posts = [
  {
    postId: 2,
    userId: "1111",
    // userPassword: "1111",
    title: "안녕하세요1111",
    content: "반갑습니다1111",
    creatDate: ""
  },
  {
    postId: 1,
    userId: "user1",
    // userPassword: "user1",
    title: "안녕하세요",
    content: "반갑습니다",
    creatDate: ""
  },
];

router.get("/posts", (req, res) => {
  res.status(200).json({ posts })
});

router.get("/posts/:postId", (req, res) => {
  const { postId } = req.params;

  // let result = null;
  // for (const post of posts) {
  //   if (Number(postId) === post.postId) {
  //     result = post;
  //   }
  // }
  // 위에 있는 for문과 같은 결과값 가져옴
  const [result] = posts.filter((post) => Number(postId) === post.postId)

  res.status(200).json({ detail: result });
})

module.exports = router;