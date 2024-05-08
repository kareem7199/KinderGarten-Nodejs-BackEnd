import Course from "../../models/course.model.js";
import Student from "../../models/user.model.js";
import BaseSpecification from "../BaseSpecifications.js";

class CourseStudentSpecifications extends BaseSpecification{

    constructor(criteria) {

        super(criteria);

        this.isRaw = true;
        this.addInclude({model : Course});
        this.addInclude({model : Student});
        
    }

}

export default CourseStudentSpecifications;