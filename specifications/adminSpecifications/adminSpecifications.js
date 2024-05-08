import BaseSpecifications from'../BaseSpecifications.js';

class AdminSpecifications extends BaseSpecifications{
    constructor(email , criteria) {
        super(criteria);
        this.addCondition({email : email});
    }
}

export default AdminSpecifications;