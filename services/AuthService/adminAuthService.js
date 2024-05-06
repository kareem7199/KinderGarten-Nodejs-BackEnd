import adminRepository from "../../repositories/adminRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AdminAuthService {
    static async login(email, password) {
        
        const admin = await adminRepository.getByEmail(email);

        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            return null;
        }

        delete admin.dataValues.password;

        const token = jwt.sign({ ...admin.dataValues , role : "admin" }, process.env.SECRET_JWT, {
            expiresIn: "24h",
        });

        return token;
    }
}

export default AdminAuthService;
