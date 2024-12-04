import express from "express";
import userController from "../user/user.controller.js";
import jwtAuth from "../../middleware/jwtTokenAuthorization.js";

const userRouter = express.Router(); 
const UserController = new userController();

userRouter.post('/registerUser',UserController.registerUser);
userRouter.post('/login',UserController.login);
userRouter.get("/view/:userId",jwtAuth, UserController.viewUser);


userRouter.delete('/:id', (req, res) => {
    return res.status(200).json({
        success: true,
        data: "delete id request"
    });
});

export default userRouter;
