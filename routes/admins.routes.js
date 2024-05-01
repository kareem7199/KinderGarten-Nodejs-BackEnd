import express from "express";
import { verifyAdmin } from "../middlewares/verifyToken.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

router
    .get("/", verifyAdmin, adminController.getAdmins)
    .get("/:id", verifyAdmin, adminController.getAdminById)
    .post("/", verifyAdmin, adminController.createAdmin)
    .post("/login", adminController.login)
    .put("/", verifyAdmin, adminController.updateAdmin)
    .delete("/:id", verifyAdmin, adminController.deleteAdminById);

export default router;
