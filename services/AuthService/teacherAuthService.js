import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TeacherService from "../teacherService.js";
import TeacherDto from "../../dtos/teacher/TeacherDto.js";
class TeacherAuthService {
    async login(email, password) {
        
        const teacher = await TeacherService.getTeacherByEmail(email);

        if (!teacher || !bcrypt.compareSync(password, teacher.password)) {
            return null;
        }

        const teacherPayLoad = new TeacherDto(teacher).map();

        delete teacherPayLoad.courses

        const token = jwt.sign({ ...teacherPayLoad , role : "teacher" }, process.env.SECRET_JWT, {
            expiresIn: "24h",
        });

        return token;
    }
}

export default new TeacherAuthService();