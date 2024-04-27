const express = require("express");
const ADMINS = require("../models/admin.model");
const router = express.Router();
const ApiErrorResponse = require('../helpers/ApiErrorResponse');
const ApiResponse = require("../helpers/ApiResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyAdmin } = require("../middlewares/verifyToken");

router.get("/", verifyAdmin, async (req, res) => {
    try {
        const admins = await ADMINS.findAll();
        res.send(ApiResponse.success(admins));
    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.get("/:id", verifyAdmin, async (req, res) => {
    try {

        const admin = await ADMINS.findByPk(req.params.id);

        if (!admin)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(admin));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
})

router.post("/login", async (req, res) => {
    try {

        const { password, email } = req.body;

        const admin = await ADMINS.findOne({
            where: {
                email
            }
        })

        if (!admin)
            return res.status(404).send(ApiResponse.failure(null, "Invalid email or password"));

        const compare = bcrypt.compareSync(password, admin.password);

        if (!compare)
            return res.status(404).send(ApiResponse.failure(null, "Invalid email or password"));

        delete admin.dataValues.password;

        const token = jwt.sign({ ...admin.dataValues }, `${process.env.SECRET_JWT}`, {
            expiresIn: "24h",
        });

        res.send(ApiResponse.success(token));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.post("/", verifyAdmin, async (req, res) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);

        const newAdmin = await ADMINS.create(req.body);

        if (!newAdmin)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(newAdmin));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.put("/", verifyAdmin, async (req, res) => {
    try {

        const id = req.admin.id;
        const admin = await ADMINS.findByPk(id);

        if (!admin)
            return res.status(404).send(ApiErrorResponse.NotFound());

        const updatedAdmin = await admin.update(req.body);

        res.send(ApiResponse.success(updatedAdmin, "Admin updated successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

router.delete("/:id", verifyAdmin, async (req, res) => {
    try {

        const admin = await ADMINS.findByPk(req.params.id);

        if (!admin)
            return res.status(404).send(ApiErrorResponse.NotFound());

        await admin.destroy();

        res.send(ApiResponse.success(null, "Admin deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
})

module.exports = router;
