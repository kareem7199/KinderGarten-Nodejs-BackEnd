// services/categoryService.js
import AdminRepository from "../repositories/adminRepository.js";
import bcrypt from "bcryptjs";

class AdminService {

    static async getAllAdmins() {
        return await AdminRepository.getAll();
    }

    static async getAdminById(id) {
        return await AdminRepository.getById(id);
    }

    static async getAdminByEmail(email) {
        return await AdminRepository.getByEmail(email);
    }

    static async createAdmin(data) {
        data.password = await bcrypt.hashSync(data.password, 10);
        return await AdminRepository.create(data);
    }

    static async updateAdmin(id, data) {

        const admin = await AdminRepository.getById(id);

        if (!admin)
            return null;
        
        return await AdminRepository.update(id, data);
    }

    static async deleteAdmin(id) {

        const admin = await AdminRepository.getById(id);

        if (!admin)
            return null;

        return await AdminRepository.delete(id);
    }
}

export default AdminService;
