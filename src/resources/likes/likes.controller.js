// Import your Likes model or service here
import LikesModel from "./likes.module.js";

class LikesController {
  // Get all likes for a specific post
  static async getLikesForPost(req, res) {
    try {
      const { postId } = req.params;

      // Retrieve all likes for the specified post
      const likes = await LikesModel.getLikesForPost(postId);

      if (!likes) {
        return res.status(404).json({
          success: false,
          message: "Post not found or no likes yet.",
        });
      }

      return res.status(200).json({
        success: true,
        data: likes,
      });
    } catch (error) {
      console.error("Error fetching likes:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }

  // Toggle like status for a specific post
  static async toggleLike(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.id; // Assume `req.user` contains authenticated user data

      // Toggle the like status for the post and user
      const result = await LikesModel.toggleLike(postId, userId);

      return res.status(200).json({
        success: true,
        message: result.isLiked ? "Post liked successfully." : "Post unliked successfully.",
        data: result,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
}

export default LikesController;
