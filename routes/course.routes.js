import express from"express"
import { verifyAdmin, verifyUser, verifyTeacher } from"../middlewares/verifyToken.js"
import * as courseController from "../controllers/course.controller.js";

const router = express.Router();

router
    .get("/", courseController.getCourses)
    .get("/pending" , verifyAdmin , courseController.getPendingRequests)
    .get("/courseswithstatus" , verifyUser , courseController.getCoursesWithSelectionStatus)
    .get("/teachercourses" , verifyTeacher , courseController.getTeacherCourses)
    .get("/getcoursestudents/:id" , verifyTeacher , courseController.getCourseStudents)
    .get("/getstudentcourseactivities/:id" , verifyTeacher , courseController.getStudentCourseActivitiesForTeacher)
    .get("/grades" , verifyUser , courseController.getStudentGrades)
    .get("/:id", courseController.getCourse)
    .post("/accept" , verifyAdmin , courseController.acceptRequest)
    .post("/reject" , verifyAdmin , courseController.rejectRequest)
    .post("/", verifyAdmin, courseController.createCourse)
    .post("/enroll", verifyUser, courseController.enroll)
    .post("/activity/:id", verifyTeacher, courseController.addActivityToStudent)
    .put("/:id", verifyAdmin, courseController.updateCourse)
    .delete("/:id", verifyAdmin, courseController.deleteCourseById)

export default router;
