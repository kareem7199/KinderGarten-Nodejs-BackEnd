import BaseRepository from "../repositories/baseRepository.js"
import AdminSpecifications from "../specifications/adminSpecifications/adminSpecifications.js"
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";

const AdminRepository = new BaseRepository(Admin);

class AdminService {

    async getAllAdmins() {
        return await AdminRepository.getAll();
    }

    async getAdminById(id) {
        return await AdminRepository.getById(id);
    }

    async getAdminByEmail(email) {
        
        const spec = new AdminSpecifications(email).toQuery();

        return await AdminRepository.getWithSpec(spec);
    }

    async createAdmin(data) {

        data.password =  bcrypt.hashSync(data.password, 10);

        return await AdminRepository.create(data);
    }

    async updateAdmin(id, data) {

        const admin = await AdminRepository.getById(id);

        if (!admin)
            return null;
        
        return await AdminRepository.update(id, data);
    }

    async deleteAdmin(id) {

        const admin = await AdminRepository.getById(id);

        if (!admin)
            return null;

        return await AdminRepository.delete(id);
    }
}

export default new AdminService();
