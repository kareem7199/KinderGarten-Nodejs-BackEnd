import { COURSES, COURSE_STUDENT } from "../models/index.models.js"
import ApiErrorResponse from '../helpers/ApiErrorResponse.js'
import ApiResponse from "../helpers/ApiResponse.js"
import { Sequelize } from "sequelize"
import CourseService from '../services/courseService.js'
import CourseDto from '../dtos/course/CourseDto.js'
import CourseWithStatusDto from '../dtos/course/CourseWithStatusDto.js'
import PendingRequestsDto from "../dtos/courseStudent/PendingRequestsDto.js"
import CourseStudentDto from "../dtos/courseStudent/CourseStudentDto.js"
import CourseStudentActivityDto from "../dtos/courseStudent/CourseStudentActivityDto.js"
import StudentGradeDto from "../dtos/courseStudent/StudentGradeDto.js"
export const getCourses = async (req, res) => {
    try {

        const courses = await CourseService.getCoursesWithTeachers();

        res.send(ApiResponse.success(new CourseDto(courses).map()));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getCourse = async (req, res) => {
    try {
        const course = await CourseService.getCourseWithTeacher(req.params.id);


        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(new CourseDto(course).map()));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
}

export const getCoursesWithSelectionStatus = async (req, res) => {

    try {

        const courses = await CourseService.getCoursesWithStudentCourseByUserId(req.user.id);
        
        res.send(ApiResponse.success(new CourseWithStatusDto(courses).map()));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());

    }

}

export const getPendingRequests = async (req, res) => {
    try {
        
        const result = await CourseService.getPendingRequests();

        res.send(ApiResponse.success(new PendingRequestsDto(result).map()));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getTeacherCourses = async (req, res) => {
    try {
        
        const courses = await CourseService.getTeacherCourses(req.teacher.id);

        res.send(ApiResponse.success(courses));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getCourseStudents = async (req, res) => {
    try {
        
        const students = await CourseService.getCourseStudents(req.params.id , req.teacher.id);

        if(!students) return res.send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(new CourseStudentDto(students).map()))

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getStudentCourseActivitiesForTeacher = async (req, res) => {
    try {
        
        const id = req.teacher.id;

        const result = await CourseService.getStudentCourseActivitiesForTeacher(req.params.id , id);

        if(!result) return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(new CourseStudentActivityDto(result).map()));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}
export const getStudentGrades = async (req , res) => {
    try {
        const id = req.user.id;
        const grades = await CourseService.getStudentGrades(id);
        const gradesDto = new StudentGradeDto(grades).map();

        res.send(ApiResponse.success(gradesDto));
    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}
export const addActivityToStudent = async (req, res) => {
    try {

        const teacherId = req.teacher.id;
        const coursestudentId = req.params.id;
        const { grade, title, fullMark } = req.body;

        const courseStudent = await CourseService.getCourseStudent(coursestudentId);

        if (!courseStudent.isPaid)
            return res.status(400).send(ApiErrorResponse.BadRequest());

        const course = await CourseService.getCourseByTeacherId(teacherId)

        if (!course)
            return res.status(400).send(ApiErrorResponse.BadRequest());

        const newActivity = await CourseService.createActivity({
            title,
            grade,
            fullMark,
            coursestudentId: coursestudentId
        });

        res.send(ApiResponse.created(newActivity));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const enroll = async (req, res) => {
    try {

        const newCourseStudent = await CourseService.enroll({
            courseId: req.body.courseId,
            userId: req.user.id
        });

        res.send(ApiResponse.created(newCourseStudent));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const createCourse = async (req, res) => {
    try {
        const newCourse = await CourseService.createCourse(req.body);

        if (!newCourse)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(newCourse));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const acceptRequest = async (req, res) => {
    try {

        const id = req.body.id;

        const request = await CourseService.acceptRequest(id);

        if (!request)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(request, "request Accepted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const rejectRequest = async (req, res) => {

    try {

        const id = req.body.id;

        const request = await CourseService.rejectRequest(id);

        if (!request)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(request, "request Rejected successfully"));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }

}

export const updateCourse = async (req, res) => {
    try {

        const course = await CourseService.updateCourse(req.params.id , req.body);

        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(course, "Course updated successfully"));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const deleteCourseById = async (req, res) => {
    try {

        const course = await CourseService.deleteCourseById(req.params.id);

        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(course, "Course deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}