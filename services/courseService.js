import BaseRepository from "../repositories/baseRepository.js"
import Course from "../models/course.model.js"
import CourseStudent from "../models/courseStudent.model.js"
import CourseWithTeacherSpecifications from "../specifications/courseSpecifications/CourseWithTeacherSpecifications.js"
import CourseStudentSpecifications from "../specifications/courseStudentSpecifications/CourseStudentSpecifications.js"
import CourseWithStudentCourseSpecifications from '../specifications/courseSpecifications/CourseWithStudentCourseSpecifications.js'
import BaseSpecification from "../specifications/BaseSpecifications.js"
import { Sequelize, where } from "sequelize"
import Actvity from '../models/activity.model.js'

const courseRepo = new BaseRepository(Course);
const courseStudentRepo = new BaseRepository(CourseStudent);
const activityRepo = new BaseRepository(Actvity);

class CourseService {

    async getCoursesWithTeachers() {

        const spec = new CourseWithTeacherSpecifications().toQuery();

        const courses = await courseRepo.getAllWithSpec(spec);

        return courses;
    }

    async getCourseWithTeacher(id) {
        const spec = new CourseWithTeacherSpecifications([{ id }]).toQuery();

        const course = await courseRepo.getWithSpec(spec);

        return course;
    }

    async getCoursesWithStudentCourseByUserId(id) {

        const spec = new CourseWithStudentCourseSpecifications(id).toQuery();

        const courses = await courseRepo.getAllWithSpec(spec);

        return courses;

    }
    async getPendingRequests() {

        const spec = new CourseStudentSpecifications([{ isPaid: false }]).toQuery();

        const requests = await courseStudentRepo.getAllWithSpec(spec);

        return requests;
    }

    async getCourseStudent(id) {
        const result = await courseStudentRepo.getById(id)

        return result;
    }

    async getStudentGrades(id) {

        const spec = new CourseStudentSpecifications([{userId : id}]).toQuery();
        const result = await courseStudentRepo.getAllWithSpec(spec);

        return result;
    }

    async getCourseStudents(courseId, teacherId) {


        const courseSpec = new CourseWithTeacherSpecifications([{ teacherId }, { id: courseId }]).toQuery();

        const course = await courseRepo.getWithSpec(courseSpec);

        console.log(course)

        if (!course) return null;

        const courseStudentSpec = new CourseStudentSpecifications([{ courseId }, { isPaid: true }]).toQuery();

        const courseStudents = await courseStudentRepo.getAllWithSpec(courseStudentSpec);

        return courseStudents;
    }

    async getTeacherCourses(id) {
        const spec = new BaseSpecification([{ teacherId: id }]).toQuery();

        const courses = await courseRepo.getAllWithSpec(spec);

        return courses;
    }

    async getStudentCourseActivitiesForTeacher(courseStudentId, teacherId) {

        const courseStudent = await courseStudentRepo.getById(courseStudentId);

        if (!courseStudent || !courseStudent.isPaid) return null;

        const courseSpec = new CourseWithTeacherSpecifications([{ teacherId }, { id: courseStudent.courseId }]).toQuery();
        const course = await courseRepo.getWithSpec(courseSpec);

        if (!course) return null;

        const courseStudentSpec = new CourseStudentSpecifications([{ id: courseStudentId }]).toQuery();

        const courseStudentDetails = await courseStudentRepo.getWithSpec(courseStudentSpec);

        return courseStudentDetails;

    }

    async getTotalPriceOfCourses() {
        // Perform a join operation to get the total price based on student enrollment
        const totalPrice = await courseStudentRepo.getAllWithSpec({
            attributes: [[Sequelize.fn('SUM', Sequelize.col('price')), 'totalPrice']],
            where: {
                isPaid: true
            },
            include: [{
                model: Course,
                required: true
            }],
            group: ['courseId']
        });

        const totalOfTotalPrices = totalPrice.reduce((acc, e) => acc + (+e.dataValues.totalPrice), 0);

        // Return the total price
        return totalOfTotalPrices;
    };

    async getTotalPriceOfPendingRequests() {
        // Perform a join operation to get the total price based on student enrollment
        const totalPrice = await courseStudentRepo.getAllWithSpec({
            attributes: [[Sequelize.fn('SUM', Sequelize.col('price')), 'totalPrice']],
            where: {
                isPaid: false
            },
            include: [{
                model: Course,
                required: true
            }],
            group: ['courseId']
        });

        const totalOfTotalPrices = totalPrice.reduce((acc, e) => acc + (+e.dataValues.totalPrice), 0);

        // Return the total price
        return totalOfTotalPrices;
    };

    async getNumberOfStudentsPerCourse() {
        // Query to get the number of students per course
        const studentsPerCourse = await courseRepo.getAllWithSpec({
            attributes: [
                'id',
                'name',
                [Sequelize.literal('(SELECT COUNT(*) FROM coursestudent WHERE coursestudent.courseId = courses.id)'), 'numberOfStudents']
            ],
            raw: true,
            nest: true
        });

        return studentsPerCourse;
    }

    async getCourseByTeacherId(teacherId) {

        const spec = new CourseWithTeacherSpecifications([{ teacherId }]).toQuery();

        const course = await courseRepo.getWithSpec(spec);

        return course;
    }

    async createActivity(data) {
        const activity = await activityRepo.create(data);
        return activity;
    }

    async enroll(data) {
        const result = await courseStudentRepo.create(data);
        return result;
    }

    async createCourse(data) {
        return await courseRepo.create(data);
    }

    async acceptRequest(id) {
        return await courseStudentRepo.update(id, { isPaid: true });
    }

    async rejectRequest(id) {
        const spec = new CourseStudentSpecifications([{ isPaid: false }]).toQuery();

        const request = await courseStudentRepo.getWithSpec(spec);

        if (!request) return null;

        return await courseStudentRepo.delete(id);
    }

    async updateCourse(id, data) {
        const course = courseRepo.update(id, data);

        if (!course) return null;

        return course;
    }

    async deleteCourseById(id) {
        const course = await courseRepo.delete(id);
        return course;
    }

}

export default new CourseService();