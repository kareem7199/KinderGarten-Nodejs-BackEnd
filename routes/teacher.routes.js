import express from"express"
import { verifyAdmin, verifyTeacher } from"../middlewares/verifyToken.js"
import { uploadTeacherProfilePicture } from"../middlewares/fileupload.js"
import * as teacherController from "../controllers/teacher.controller.js"

const router = express.Router();

router
    .get("/", verifyAdmin, teacherController.getTeachers)
    .get("/:id", verifyAdmin, teacherController.getTeacher)
    .post("/", verifyAdmin, uploadTeacherProfilePicture(), teacherController.createTeacher)
    .post("/login", teacherController.login)
    .put("/", verifyTeacher, teacherController.updateTeacher)
    .delete("/:id", verifyAdmin,teacherController.deleteTeacherById)

export default router;
