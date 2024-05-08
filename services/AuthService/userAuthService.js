import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "../userService.js";
import UserDto from "../../dtos/user/UserDto.js";

class UserAuthService {
    async login(phone, password) {
        
        const user = await UserService.getUserByParentPhone(phone);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return null;
        }

        const userPayLoad = new UserDto(user).map();

        const token = jwt.sign({ ...userPayLoad , role : "user" }, process.env.SECRET_JWT, {
            expiresIn: "24h",
        });

        return token;
    }
}

export default new UserAuthService();