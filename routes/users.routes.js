import express from "express"
import { verifyAdmin, verifyUser } from "../middlewares/verifyToken.js"
import { uploadUserProfilePicture } from "../middlewares/fileupload.js"
import * as userController from "../controllers/user.controller.js"

const router = express.Router();

router
    .get("/", verifyAdmin, userController.getUsers)
    .get("/info" , verifyUser , userController.getUser)
    .get("/status" , verifyUser , userController.getStatus)
    .post("/", uploadUserProfilePicture(), userController.createUser)
    .post("/login", userController.login)
    .put("/", verifyUser, userController.updateUser)
    .delete("/:id", verifyAdmin, userController.deleteUserById)

export default router;
