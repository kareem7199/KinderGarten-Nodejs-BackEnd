import BaseRepository from "../repositories/baseRepository.js"
import Course from "../models/course.model.js"
import CourseStudent from "../models/courseStudent.model.js"
import CourseWithTeacherSpecifications from "../specifications/courseSpecifications/CourseWithTeacherSpecifications.js"
import CourseStudentSpecifications from "../specifications/courseStudentSpecifications/CourseStudentSpecifications.js"
import CourseWithStudentCourseSpecifications from '../specifications/courseSpecifications/CourseWithStudentCourseSpecifications.js'

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
        const spec = new CourseStudentSpecifications([{isPaid : false}]).toQuery();

        const request = await courseStudentRepo.getWithSpec(spec);

        if(!request) return null;
        
        return await courseStudentRepo.delete(id);
    }

    async updateCourse(id , data) {
        const course = courseRepo.update(id , data);

        if(!course) return null;

        return course;
    }

    async deleteCourseById(id) {
        const course = await courseRepo.delete()
    }

}

export default new CourseService();