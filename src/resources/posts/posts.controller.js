import PostModel from "./posts.model.js";
import UserModel from "../user/user.model.js";
import jwt from "jsonwebtoken"; 

let secretKey = "your_secret_key";
export default class PostController {
  // GET: Retrieve all posts
  static getAllPosts(req, res) {
    try {
      const posts = PostModel.getAllPosts();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET: Retrieve a specific post by ID
  static getPostById(req, res) {
    try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).json({ error: "Invalid Post ID" });
      }

      const post = PostModel.getPostById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET: Retrieve posts based on user credentials
  static getPostsByUser(req, res) {
    try {
      const {userId} = req.body;
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid User ID" });
      }

      const posts = PostModel.getAllPosts().filter(
        (post) => post.userId === userId
      );

      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST: Create a new post
  // static createPost(req, res) {
  //   try {
  //     const { title, content, userId } = req.body;
  //     console.log("title :",title,"content :", content,"userId :", userId )
  //     const imageUrl = req.file ? req.file.path : "";
      
  //     const user = UserModel.viewUser(userId);
  //     console.log("user :", user);
  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }
      
  //     const post = PostModel.createPost({ title, content, userId, imageUrl });
  //     console.log("post" ,post);
  //     user.addPost(post.id);

  //     return res.status(201).json({ message: "Post created", post });
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  // }
  static createPost(req, res) {
    try {
      const { title, content } = req.body;
      console.log("title:", title, "content:", content);
      
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token missing" });
      }
      
      const token = authHeader.split(" ")[1];
  
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.id; 
      console.log("Decoded User ID:", userId);
      const imageUrl = req.file ? req.file.path : "";
  
      const user = UserModel.viewUser(userId);
      console.log("user:", user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const post = PostModel.createPost({ title, content, userId, imageUrl });
      console.log("post", post);

      user.addPost(post.id);
  
      return res.status(201).json({ message: "Post created", post });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  
  // PUT: Update a specific post by ID
  static updatePost(req, res) {
    try {
      const postId = parseInt(req.params.id);
      const { title, content } = req.body;
      const imageUrl = req.file ? req.file.path : null;

      const post = PostModel.updatePost(postId, { title, content, imageUrl });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json({ message: "Post updated", post });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE: Delete a specific post by ID
  static deletePost(req, res) {
    try {
      const postId = parseInt(req.params.id);
      const post = PostModel.deletePostById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json({ message: "Post deleted", post });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
