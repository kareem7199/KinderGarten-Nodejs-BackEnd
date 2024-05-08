class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.findAll();
    }

    async getById(id) {
        return await this.model.findByPk(id);
    }

    async getWithSpec(spec) {
        return await this.model.findOne(spec);
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        const instance = await this.getById(id);
        if (!instance) {
            throw new Error(`${this.model.name} not found`);
        }
        return await instance.update(data);
    }

    async delete(id) {
        const instance = await this.getById(id);
        if (!instance) {
            throw new Error(`${this.model.name} not found`);
        }
        return await instance.destroy();
    }
}

export default BaseRepository;
