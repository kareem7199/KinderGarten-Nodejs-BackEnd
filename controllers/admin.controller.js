import ApiErrorResponse from '../helpers/ApiErrorResponse.js';
import ApiResponse from "../helpers/ApiResponse.js";
import AdminService from '../services/adminService.js'
import AdminAuthService from '../services/AuthService/adminAuthService.js'
import AdminDto from '../dtos/admin/AdminDto.js';
import CourseService from '../services/courseService.js';
import UserService from '../services/userService.js';

export const getAdmins = async (req , res) => {
    try {
        const admins = await AdminService.getAllAdmins();

        res.send(ApiResponse.success(new AdminDto(admins).map()));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getAdminById = async (req, res) => {
    try {

        const admin = await AdminService.getAdminById(req.params.id);

        if (!admin)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(new AdminDto(admin).map()));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
}

export const getStats = async (req , res) => {
    try {
        const totalPrices = await CourseService.getTotalPriceOfCourses();
        const totalPriceOfPendingRequests = await CourseService.getTotalPriceOfPendingRequests();
        const userCount = await UserService.getUserCount();
        const numberOfStudentsPerCourse = await CourseService.getNumberOfStudentsPerCourse();

        res.send(ApiResponse.success({
            totalPrices ,
            totalPriceOfPendingRequests,
            userCount ,
            numberOfStudentsPerCourse
        }));
        
    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const createAdmin = async (req, res) => {
    try {

        const newAdmin = await AdminService.createAdmin(req.body);

        if (!newAdmin)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(newAdmin));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const login =  async (req, res) => {
    try {

        const { password, email } = req.body;

        const token = await AdminAuthService.login(email, password);

        if (!token)
            return res.status(404).send(ApiResponse.failure(null, "Invalid email or password"));

        res.send(ApiResponse.success(token));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const updateAdmin = async (req, res) => {
    try {

        const id = req.admin.id;

        const updatedAdmin = await AdminService.updateAdmin(id , req.body);

        if(!updatedAdmin)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(new AdminDto(updatedAdmin).map(), "Admin updated successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const deleteAdminById = async (req, res) => {
    try {

        const admin = await AdminService.deleteAdmin(req.params.id);

        if(!admin)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(null, "Admin deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}