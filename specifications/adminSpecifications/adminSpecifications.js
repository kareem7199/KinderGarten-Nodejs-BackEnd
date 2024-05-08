import BaseSpecifications from'../BaseSpecifications.js';

class AdminSpecifications extends BaseSpecifications{
    constructor(email) {
        super();
        this.addCondition({email : email});
    }
}

export default AdminSpecifications;