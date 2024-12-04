// import express from "express";
// import commentController from "./comments.controller.js";
// import jwtAuth from "../../middleware/jwtTokenAuthorization.js";
// const commentRouter = express.Router();

// commentRouter.post("/",jwtAuth,commentController.createComment);
// commentRouter.get("/:postId",jwtAuth, commentController.getCommentsForPost);
// commentRouter.put("/:commentId", commentController.updateComment);
// commentRouter.post("/:commentId/like", commentController.likeComment);

// export default commentRouter;
import express from "express";
import commentController from "./comments.controller.js";
import jwtAuth from "../../middleware/jwtTokenAuthorization.js";

const commentRouter = express.Router();

// Routes for comments
commentRouter.get("/:postId", jwtAuth, commentController.getCommentsForPost); // Retrieve all comments for a specific post
commentRouter.post("/create-comment", jwtAuth, commentController.createComment); // Add a new comment to a specific post
commentRouter.put("/update-comment/:id", jwtAuth, commentController.updateComment); // Update a specific comment by ID
commentRouter.delete("/delete-comment/:id", jwtAuth, commentController.deleteComment); // Delete a specific comment by ID


export default commentRouter;
