const express = require("express");
const app = express();
const port = 3000;

const connent = require("./schemas");
connent();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("PROJECT");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});