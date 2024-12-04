export default class PostModel {
  constructor(_id, _title, _content, _userId, _imageUrl) {
    this.id = _id; // Unique identifier
    this.title = _title; // Title of the post
    this.content = _content; // Content of the post
    this.userId = _userId; // ID of the user who created the post
    this.imageUrl = _imageUrl || ""; // URL of the image (optional)
    this.comments = []; // Array to store comment IDs
    this.createdAt = new Date(); // Creation timestamp
    this.updatedAt = new Date(); // Update timestamp
  }

  // Add a comment to the post
  addComment(commentId) {
    this.comments.push(commentId);
    this.updatedAt = new Date();
    return this;
  }

  // Static methods
  static createPost(postData) {
    const newPost = new PostModel(
      posts.length + 1,
      postData.title,
      postData.content,
      postData.userId,
      postData.imageUrl
    );
    posts.push(newPost);
    return newPost;
  }

  static getPostById(postId) {
    return posts.find((post) => post.id === postId) || null;
  }

  static getAllPosts() {
    return posts;
  }

  static deletePostById(postId) {
    const index = posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      return posts.splice(index, 1)[0];
    }
    return null;
  }

  static updatePost(postId, postData) {
    const post = this.getPostById(postId);
    if (post) {
      post.title = postData.title || post.title;
      post.content = postData.content || post.content;
      post.imageUrl = postData.imageUrl || post.imageUrl;
      post.updatedAt = new Date();
      return post;
    }
    return null;
  }
}

// Dummy data for testing
const posts = [];
