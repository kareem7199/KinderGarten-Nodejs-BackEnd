import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { TEACHERS } from "../models/index.models.js"
import ApiErrorResponse from '../helpers/ApiErrorResponse.js'
import ApiResponse from "../helpers/ApiResponse.js"
import TeacherService from '../services/teacherService.js'
import TeacherDto from "../dtos/teacher/TeacherDto.js"
import TeacherAuthService from "../services/AuthService/teacherAuthService.js"
export const getTeachers = async (req, res) => {
    try {
        const teachers = await TeacherService.getAllTeachers();

        res.send(ApiResponse.success(new TeacherDto(teachers).map()));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getTeacher = async (req, res) => {
    try {

        const teacher = await TeacherService.getTeacher(req.params.id);

        if (!teacher)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(new TeacherDto(teacher).map()));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
}

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        const token = await TeacherAuthService.login(email, password);

        if (!token)
            return res.status(404).send(ApiResponse.failure(null, "Invalid email or password"));

        res.send(ApiResponse.success(token));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const createTeacher = async (req, res) => {
    try {

        const newTeacher = await TeacherService.createTeacher({ ...req.body, profilePicture: req.file.filename });

        if (!newTeacher)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(newTeacher));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const updateTeacher = async (req, res) => {
    try {

        const id = req.teacher.id;

        const teacher = await TeacherService.updateTeacher(id, req.body);

        if (!teacher)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(teacher, "Teacher updated successfully"));

    } catch (error) {

        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const deleteTeacherById = async (req, res) => {
    try {

        const teacher = await TeacherService.deleteTeacher(req.params.id);

        if (!teacher)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(null, "Teacher deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const addStatus = async (req, res) => {

    try {
        const status = await TeacherService.addStatus(req.params.id, req.body.title);

        if (!status)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(status));
    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }

}