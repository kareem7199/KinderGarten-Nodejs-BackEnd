import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { TEACHERS, COURSES } from "../models/index.models.js"
import ApiErrorResponse from '../helpers/ApiErrorResponse.js'
import ApiResponse from "../helpers/ApiResponse.js"

export const getTeachers = async (req, res) => {
    try {
        const teachers = await TEACHERS.findAll();
        res.send(ApiResponse.success(teachers));
    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getTeacher = async (req, res) => {
    try {

        const teacher = await TEACHERS.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: COURSES
            }
        });

        if (!teacher)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(teacher));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
}

export const login = async (req, res) => {
    try {

        const { password, email } = req.body;

        const teacher = await TEACHERS.findOne({
            where: {
                email
            }
        })

        if (!teacher)
            return res.status(404).send(ApiResponse.failure(null, "Invalid email or password"));

        const compare = bcrypt.compareSync(password, teacher.password);

        if (!compare)
            return res.status(404).send(ApiResponse.failure(null, "Invalid email or password"));

        delete teacher.dataValues.password;

        const token = jwt.sign({ ...teacher.dataValues }, `${process.env.SECRET_JWT}`, {
            expiresIn: "24h",
        });

        res.send(ApiResponse.success(token));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const createTeacher = async (req, res) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);

        const newTeacher = await TEACHERS.create({ ...req.body, profilePicture: req.file.filename });

        if (!newTeacher)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(newTeacher));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const updateTeacher = async (req, res) => {
    try {

        const id = req.teacher.id;
        const teacher = await TEACHERS.findByPk(id);

        if (!teacher)
            return res.status(404).send(ApiErrorResponse.NotFound());

        const updatedTeacher = await teacher.update(req.body);

        res.send(ApiResponse.success(updatedTeacher, "Teacher updated successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const deleteTeacherById = async (req, res) => {
    try {

        const teacher = await TEACHERS.findByPk(req.params.id);

        if (!teacher)
            return res.status(404).send(ApiErrorResponse.NotFound());

        await teacher.destroy();

        res.send(ApiResponse.success(null, "Teacher deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}