import express from "express";
import USERS from "../models/user.model.js";
import ApiErrorResponse from '../helpers/ApiErrorResponse.js';
import ApiResponse from "../helpers/ApiResponse.js";
import bcrypt from "bcryptjs";
import moment from 'moment'; 
import jwt from "jsonwebtoken";
import { verifyAdmin, verifyUser } from "../middlewares/verifyToken.js";
import { uploadUserProfilePicture } from "../middlewares/fileupload.js";

const router = express.Router();

router.get("/", verifyAdmin, async (req, res) => {
    try {
        const users = await USERS.findAll();
        res.send(ApiResponse.success(users));
    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.get("/:id", async (req, res) => {
    try {

        const user = await USERS.findByPk(req.params.id);

        if (!user)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(user));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
})

router.post("/login", async (req, res) => {
    try {

        const { password, parentPhone } = req.body;

        const user = await USERS.findOne({
            where: {
                parentPhone
            }
        })

        if (!user)
            return res.status(404).send(ApiResponse.failure(null, "Invalid Parent Phone or password"));

        const compare = bcrypt.compareSync(password, user.password);

        if (!compare)
            return res.status(404).send(ApiResponse.failure(null, "Invalid Parent Phone or password"));

        delete user.dataValues.password;

        const token = jwt.sign({ ...user.dataValues }, `${process.env.SECRET_JWT}`, {
            expiresIn: "24h",
        });

        res.send(ApiResponse.success(token));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.post("/", verifyAdmin, uploadUserProfilePicture(), async (req, res) => {
    try {
        req.body.birthDate = moment(req.body.birthDate, "DD/MM/YYYY").format("YYYY-MM-DD");
        req.body.password = await bcrypt.hashSync(req.body.password, 10);

        const newUser = await USERS.create({ ...req.body, profilePicture: req.file.filename });

        if (!newUser)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(newUser));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.put("/", verifyUser, async (req, res) => {
    try {

        const id = req.user.id;

        const user = await USERS.findByPk(id);

        if (!user)
            return res.status(404).send(ApiErrorResponse.NotFound());

        const updatedUser = await user.update(req.body);

        res.send(ApiResponse.success(updatedUser, "User updated successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.delete("/:id", verifyAdmin, async (req, res) => {
    try {

        const user = await USERS.findByPk(req.params.id);

        if (!user)
            return res.status(404).send(ApiErrorResponse.NotFound());

        await user.destroy();

        res.send(ApiResponse.success(null, "User deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

export default router;
