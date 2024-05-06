import BaseRepository from'./baseRepository.js';
import ADMINS from "../models/admin.model.js";

class AdminRepository extends BaseRepository {
    constructor() {
        super(ADMINS);
    }

    async getByEmail(email) {
        return await ADMINS.findOne({
            where : {
                email
            }
        });
    }
}

export default new AdminRepository();
