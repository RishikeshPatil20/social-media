import express from "express";
import likesController from "./likes.controller.js";
import jwtAuth from "../../middleware/jwtTokenAuthorization.js";

const likesRouter = express.Router();

// Route to retrieve all likes for a specific post
likesRouter.get("/:postId", jwtAuth, likesController.getLikesForPost);

// Route to toggle like status for a specific post
likesRouter.get("/toggle/:postId", jwtAuth, likesController.toggleLike);

export default likesRouter;
