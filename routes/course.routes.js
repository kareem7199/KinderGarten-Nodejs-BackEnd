const express = require("express");
const COURSES = require("../models/course.model");
const TEACHERS = require("../models/teacher.model");
const ACTIVITIES = require("../models/activity.model");
const COURSE_STUDENT = require("../models/courseStudent.model");
const router = express.Router();
const ApiErrorResponse = require('../helpers/ApiErrorResponse');
const ApiResponse = require("../helpers/ApiResponse");
const { verifyAdmin, verifyUser, verifyTeacher } = require("../middlewares/verifyToken");

router.get("/", async (req, res) => {
    try {
        const cousrses = await COURSES.findAll();
        res.send(ApiResponse.success(cousrses));
    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.get("/:id", async (req, res) => {
    try {

        const course = await COURSES.findOne({
            raw: true,
            where: {
                id: req.params.id
            },
            include: {
                model: TEACHERS,
                attributes: ["name", "profilePicture"]
            }
        });


        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(course));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
})

router.post("/activity/:id", verifyTeacher, async (req, res) => {
    try {

        const teacherId = req.teacher.id;
        const coursestudentId = req.params.id;
        const { grade, title, fullMark } = req.body;

        const courseStudent = await COURSE_STUDENT.findByPk(coursestudentId);

        if (!courseStudent.isPaid)
            return res.status(400).send(ApiErrorResponse.BadRequest());

        const course = await COURSES.findOne({
            where: {
                teacherId: teacherId
            }
        })

        if (!course)
            return res.status(400).send(ApiErrorResponse.BadRequest());

        const newActivity = await ACTIVITIES.create({
            title,
            grade,
            fullMark,
            coursestudentId: coursestudentId
        })

        res.send(ApiResponse.created(newActivity));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.post("/enroll", verifyUser, async (req, res) => {
    try {

        const newCourseStudent = await COURSE_STUDENT.create({
            courseId: req.body.courseId,
            userId: req.user.id
        });

        res.send(ApiResponse.created(newCourseStudent));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.post("/", verifyAdmin, async (req, res) => {
    try {

        const newCourse = await COURSES.create(req.body);

        if (!newCourse)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(newCourse));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.put("/:id", verifyAdmin, async (req, res) => {
    try {

        const course = await COURSES.findByPk(req.params.id);

        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        const updatedCourse = await course.update(req.body);

        res.send(ApiResponse.success(updatedCourse, "Course updated successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.delete("/:id", verifyAdmin, async (req, res) => {
    try {

        const course = await COURSES.findByPk(req.params.id);

        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        await course.destroy();

        res.send(ApiResponse.success(null, "Course deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

module.exports = router;
