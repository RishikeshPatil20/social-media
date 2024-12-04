import UserModel from "../user/user.model.js";

export default class CommentsModel {
    constructor(_id, _content, _created_at, _updated_at, _userId, _postId) {
      this.id = _id; // Unique identifier for the comment
      this.content = _content; // Content of the comment
      this.created_at = _created_at; // Timestamp for when the comment was created
      this.updated_at = _updated_at; // Timestamp for when the comment was last updated
      this.userId = _userId; // ID of the user who made the comment
      this.postId = _postId; // ID of the post the comment belongs to
      this.likes = 0; // Number of likes on the comment
      this.replies = []; // Array to store replies to the comment
    }
  
    // Add a reply to a specific comment by its ID
    static addReplyById(commentId, replyId) {
      const comment = comments.find((c) => c.id === commentId);
      if (comment) {
        comment.replies.push(replyId);
        comment.updated_at = new Date();
        return comment;
      } else {
        throw new Error(`Comment with ID ${commentId} not found.`);
      }
    }
  
    // // Add a new comment
    // static addContent(_content, _userId, _postId) {
    //   const newComment = new CommentsModel(
    //     comments.length + 1, // Auto-incrementing ID
    //     _content,
    //     new Date(),
    //     new Date(),
    //     _userId,
    //     _postId
    //   );
    //   comments.push(newComment);
    //   return newComment;
    // }

  static addContent(_content, _userId, _postId) {
    // Find the user who is adding the comment
    const user = UserModel.getAllUsers().find((u) => u.id === _userId);
    if (!user) {
      throw new Error(`User with ID ${_userId} not found.`);
    }

    const newComment = new CommentsModel(
      comments.length + 1, // Auto-incrementing ID
      _content,
      new Date(),
      new Date(),
      _userId,
      _postId
    );
    comments.push(newComment);
    console.log("newCommment :" , newComment.id);
    user.addComment(newComment.id);

    return newComment;
  }
    // Update the content of a comment by its ID
    static updateContentById(commentId, newContent) {
      const comment = comments.find((c) => c.id === commentId);
      if (comment) {
        comment.content = newContent;
        comment.updated_at = new Date();
        return comment;
      } else {
        throw new Error(`Comment with ID ${commentId} not found.`);
      }
    }
  
    // Add a like to the comment
    likeComment() {
      this.likes++;
      return this;
    }
  
    // Add a reply to the comment
    addReply(replyId) {
      this.replies.push(replyId);
      return this;
    }
  
    // Update the content of the comment
    updateContent(newContent) {
      this.content = newContent;
      this.updated_at = new Date();
      return this;
    }
  
    // Static method to get all comments for a post
    static getCommentsForPost(postId) {
      return comments.filter((comment) => comment.postId === postId);
    }
  
    // Static method to get all comments by a user
    static getCommentsByUser(userId) {
      return comments.filter((comment) => comment.userId === userId);
    }
    static deleteById(commentId) {
      const index = comments.findIndex((c) => c.id === commentId);
      if (index === -1) return null;
    
      const deletedComment = comments.splice(index, 1)[0];
      return deletedComment;
    }
  }
  
  // Dummy comments array for testing
  const comments = [
    new CommentsModel(1, "Nice post!", new Date(), new Date(), 1, 101),
    new CommentsModel(2, "Thanks for sharing!", new Date(), new Date(), 2, 101),
  ];

  