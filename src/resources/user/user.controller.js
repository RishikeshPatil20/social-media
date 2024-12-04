import validator from "validator";
import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';


export default class userController {
  registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Email Is Not Valid",
        });
      }
      if (UserModel.getUserFromEmail(email)) {
        return res.status(400).json({
          succes: false,
          message: "Error: Email allready exist in system",
        });
      }
      if (!validator.isAlphanumeric(password)) {
        return res.status(400).json({
          success: false,
          message: "Password Should Contain (a-z , A-Z ,0-9);",
        });
      }
      let user = {
        name: name,
        email: email,
        password: password,
      };
      let newUser = UserModel.createUser(user);
      let newUser1 = { ...newUser };
      delete newUser1.password;
      return res.status(200).json({
        success: true,
        data: newUser1,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  login(req, res) {
    try {
      const { email, password } = req.body;
      console.log("email:", email);
      console.log("password:", password);
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Email Is Not Valid",
        });
      }
      let user = UserModel.getUserFromEmail(email);
      console.log("user :", user);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email/Password Is Not Valid",
        });
      }
      console.log("user", user);
      if (user.password !== password) {
        return res.status(400).json({
          success: false,
          message: "Email/Password Is Not Valid",
        });
      }
      let secretKey = "your_secret_key";
      //let secretKey = process.env.SECRET_KEY;
      let payloadData = {
        id : user.id,
        email: user.email,
        name: user.name,
      };
      console.log(payloadData);
      let token = jwt.sign(payloadData, secretKey, { expiresIn: '1h' });
      return res.status(200).json({
        success: true,
        token: token,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  // viewUser(req, res) {
  //   try {
  //     const userId = parseInt(req.params.userId); // Extract userId from route params
  //     if (!userId) {
  //       return res.status(400).json({ error: "User ID is required." });
  //     }

  //     const userDetails = UserModel.viewUserById(userId);
  //     return res.status(200).json(userDetails); // Return user details as JSON
  //   } catch (error) {
  //     return res.status(404).json({ error: error.message });
  //   }
  // }
  viewUser(req, res) {
    try {
      const userId = parseInt(req.params.userId); // Extract user ID from URL
       // Check if the ID is valid
       if (isNaN(userId) || userId < 1) {
        return res.status(400).json({ error: "Invalid user ID." });
      }
      const userDetails = UserModel.viewUser(userId); // Call the model's viewUser method
      return res.status(200).json(userDetails);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}
