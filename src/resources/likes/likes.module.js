
const likesData = []; // Example: [{ postId: "1", userId: "123", isLiked: true }]

class LikesModel {
  // Get all likes for a specific post
  static async getLikesForPost(postId) {
    return likesData.filter((like) => like.postId === postId);
  }

  // Toggle like status for a specific post
  static async toggleLike(postId, userId) {
    const existingLike = likesData.find((like) => like.postId === postId && like.userId === userId);

    if (existingLike) {
      // If already liked, toggle to unlike
      existingLike.isLiked = !existingLike.isLiked;
      return existingLike;
    } else {
      // If not liked yet, create a new like
      const newLike = { postId, userId, isLiked: true };
      likesData.push(newLike);
      return newLike;
    }
  }
}

export default LikesModel;
