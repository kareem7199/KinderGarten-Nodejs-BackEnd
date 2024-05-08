import BaseRepository from '../repositories/baseRepository.js'
import User from '../models/user.model.js'
import moment from 'moment';
import bcrypt from "bcryptjs";
import BaseSpecification from '../specifications/BaseSpecifications.js';

const userRepo = new BaseRepository(User);

class UserService {

    async getAllUsers() {
        return await userRepo.getAll();
    }

    async getUser(id) {
        const user = await userRepo.getById(id);

        if (!user) return null;

        return user;
    }

    async getUserByParentPhone(phone) {

        const spec = new BaseSpecification([{parentPhone : phone}]).toQuery();

        const user = await userRepo.getWithSpec(spec);

        if(!user) return null;

        return user;
    }

    async createUser(data) {

        data.birthDate = moment(data.birthDate, "DD/MM/YYYY").format("YYYY-MM-DD");
        data.password = bcrypt.hashSync(data.password, 10);

        const user = await userRepo.create(data);

        return user;
    }

    async updateUser(id, data) {

        const user = await userRepo.getById(id);

        if (!user) return null;

        return await userRepo.update(id, data);
    }

    async deleteUser(id) {
        return await userRepo.delete(id);
    }

}

export default new UserService();