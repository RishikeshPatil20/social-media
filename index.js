import express from "express";
import userRouter from "./src/resources/user/user.router.js";
import commentRouter from "./src/resources/comments/comments.router.js";
import likesRouter from "./src/resources/likes/likes.router.js";
import postRouter from "./src/resources/posts/posts.router.js";

const PORT = 8000;
const server = express();

// Use express.urlencoded and express.json correctly as middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json()); // <-- Add parentheses here

//
server.use("/api/user", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/comments", commentRouter);
server.use("/api/likes", likesRouter);

server.listen(PORT, (err) => {
    if (err) {
      console.log("error", err);
      return;
    }
    console.log("server started at port", PORT);
  });
 