import CommentsModel from "./comments.model.js";
import validator from "validator";

export default class commentController {
  // Create a new comment
  static createComment(req, res) {
    try {
      const { content, userId, postId } = req.body;

      // Validate content
      if (!content || !validator.isLength(content, { min: 1 })) {
        return res.status(400).json({
          success: false,
          message: "Comment content cannot be empty.",
        });
      }

      // Validate userId and postId
      if (!userId || !postId) {
        return res.status(400).json({
          success: false,
          message: "User ID and Post ID are required.",
        });
      }

      // Add comment using the model
      const newComment = CommentsModel.addContent(content, userId, postId);

      return res.status(201).json({
        success: true,
        message: "Comment created successfully.",
        data: newComment,
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }

  // Get all comments for a post
  static getCommentsForPost(req, res) {
    try {
      const { postId } = req.params;

      // Validate postId
      if (!postId) {
        return res.status(400).json({
          success: false,
          message: "Post ID is required.",
        });
      }

      const comments = CommentsModel.getCommentsForPost(parseInt(postId));
      return res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      console.error("Error fetching comments for post:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }

  // Update a comment by ID
  static updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      // Validate content
      if (!content || !validator.isLength(content, { min: 1 })) {
        return res.status(400).json({
          success: false,
          message: "Comment content cannot be empty.",
        });
      }

      const updatedComment = CommentsModel.updateContentById(
        parseInt(commentId),
        content
      );

      return res.status(200).json({
        success: true,
        message: "Comment updated successfully.",
        data: updatedComment,
      });
    } catch (error) {
      console.error("Error updating comment:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  }

  // Like a comment
  static likeComment(req, res) {
    try {
      const { commentId } = req.params;

      // Find the comment
      const comment = CommentsModel.getCommentsForPost(parseInt(commentId));
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found.",
        });
      }

      // Like the comment
      comment.likeComment();

      return res.status(200).json({
        success: true,
        message: "Comment liked successfully.",
        data: comment,
      });
    } catch (error) {
      console.error("Error liking comment:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
  static deleteComment(req, res) {
    try {
      const { id } = req.params;
  
      // Find and delete the comment
      const deletedComment = CommentsModel.deleteById(parseInt(id));
      if (!deletedComment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found.",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Comment deleted successfully.",
        data: deletedComment,
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
  
}
