export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.role = "user"; // Default role
    this.bio = ""; // User bio or description
    this.profilePic = ""; // URL for the user's profile picture
    this.posts = []; // Array to store user post IDs
    this.comments = []; // Array to store user comment IDs
    this.followers = []; // Array to store IDs of followers
    this.following = []; // Array to store IDs of users being followed
    this.createdAt = new Date(); // Timestamp for account creation
  }

  // Add a comment
  addComment(commentId) {
    this.comments.push(commentId);
    return this;
  }

  // Remove a comment
  removeComment(commentId) {
    this.comments = this.comments.filter((id) => id !== commentId);
    return this;
  }

  static createUser(obj) {
    const user = new UserModel(
      users.length + 1,
      obj.name,
      obj.email,
      obj.password
    );
    users.push(user);
    return user;
  }

  updateBio(newBio) {
    this.bio = newBio;
    return this;
  }

  updateProfilePic(picUrl) {
    this.profilePic = picUrl;
    return this;
  }

  followUser(userId) {
    if (!this.following.includes(userId)) {
      this.following.push(userId);
      return true;
    }
    return false;
  }

  addFollower(userId) {
    if (!this.followers.includes(userId)) {
      this.followers.push(userId);
      return true;
    }
    return false;
  }

  removeFollower(userId) {
    this.followers = this.followers.filter((id) => id !== userId);
    return this;
  }

  updateRoleAdmin() {
    this.role = "admin";
    return this;
  }

  static getUserFromEmail(email) {
    return users.find((user) => user.email === email) || null;
  }
  
  static getAllUsers() {
    return users;
  }

  static userSignIn(email, password) {
    return users.find(
      (user) => user.email === email && user.password === password
    );
  }

  addPost(postId) {
    this.posts.push(postId);
    return this;
  }

  removePost(postId) {
    this.posts = this.posts.filter((id) => id !== postId);
    return this;
  }
  // static viewUserById(userId) {
  //   const user = users.find((user) => user.id === userId);
  //   if (user) {
  //     return {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       bio: user.bio,
  //       profilePic: user.profilePic,
  //       followers: user.followers.length,
  //       following: user.following.length,
  //       posts: user.posts.length,
  //       comments: user.comments.length,
  //       role: user.role,
  //       updated: user.updatedAt ? true : false, // If 'updatedAt' exists, profile is updated
  //     };
  //   } else {
  //     throw new Error(`User with ID ${userId} not found.`);
  //   }
  // }
//   static viewUser(userId) {
//     const user = users.find((user) => user.id === parseInt(userId));
    
//     if (!user) {
//       throw new Error(`User with ID ${userId} not found.`);
//     }
    
//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       bio: user.bio,
//       profilePic: user.profilePic,
//       followers: user.followers.length, // Count followers dynamically
//       following: user.following.length, // Count following dynamically
//       posts: user.posts.length, // Count posts dynamically
//       comments: user.comments.length, // Count comments dynamically
//       role: user.role,
//       updated: true,
//     };
//   }
// }
static viewUser(userId) {
  const user = users.find((user) => user.id === parseInt(userId));
  
  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }
  
  return user;
}
}
const users = [
  new UserModel(1, "John Doe", "john@gmail.com", "john123"),
  new UserModel(2, "Jane Smith", "jane@gmail.com", "jane123"),
];
