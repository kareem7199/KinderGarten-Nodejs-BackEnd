import Course from "../../models/course.model.js"
import Student from "../../models/user.model.js"
import Activity from '../../models/activity.model.js'
import BaseSpecification from "../BaseSpecifications.js";

class CourseStudentSpecifications extends BaseSpecification{

    constructor(criteria) {

        super(criteria);
        
        this.addInclude({model: Activity});
        this.addInclude({model : Course});
        this.addInclude({model : Student});
        
    }

}

export default CourseStudentSpecifications;