import express from "express";
import PostController from "./posts.controller.js";
import upload from "../../middleware/uploadFile.js";
import jwtAuth from "../../middleware/jwtTokenAuthorization.js";


const postRouter = express.Router();

// Endpoints
postRouter.get("/all",jwtAuth, PostController.getAllPosts);
postRouter.get("/:id",jwtAuth, PostController.getPostById);
postRouter.get("/",jwtAuth, PostController.getPostsByUser);
postRouter.post("/create-post",jwtAuth, upload.single("image"), PostController.createPost);
// postRouter.post("/create-post",jwtAuth, PostController.createPost);
postRouter.put("/update-post/:id",jwtAuth, upload.single("image"), PostController.updatePost);
postRouter.delete("/delete-post/:id",jwtAuth, PostController.deletePost);

export default postRouter;
