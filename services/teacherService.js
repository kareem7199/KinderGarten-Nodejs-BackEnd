import BaseRepository from "../repositories/baseRepository.js"
import Teacher from '../models/teacher.model.js'
import TeacherWithCoursesSpecifications from '../specifications/teacherSpecifications/TeacherWithCoursesSpecifications.js'
import bcrypt from "bcryptjs";
const teacherRepo = new BaseRepository(Teacher);

class TeacherService {

    async getAllTeachers(){
        
        const teachers = await teacherRepo.getAll();

        return teachers;
    }

    async getTeacher(id) {
        
        const spec = new TeacherWithCoursesSpecifications([{id}]).toQuery();

        const teacher = await teacherRepo.getWithSpec(spec);

        if(!teacher) return null;

        return teacher;
    }

    async getTeacherByEmail(email) {
        const spec = new TeacherWithCoursesSpecifications([{email}]).toQuery();

        const teacher = await teacherRepo.getWithSpec(spec);

        if(!teacher) return null;

        return teacher;
    }

    async createTeacher(data) {

        data.password = bcrypt.hashSync(data.password, 10);

        const teacher = await teacherRepo.create(data);

        delete teacher.dataValues.password

        return teacher;
    }

    async updateTeacher(id, data) {

        const teacher = await teacherRepo.getById(id);

        if(!teacher) return null;

        return await teacherRepo.update(id , data);
    }

    async deleteTeacher(id){
        const teacher = await teacherRepo.getById(id);

        if(!teacher) return null;

        return await teacherRepo.delete(id);
    }
}

export default new TeacherService();