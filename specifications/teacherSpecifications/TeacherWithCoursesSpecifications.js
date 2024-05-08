import BaseSpecifications from '../BaseSpecifications.js'
import Course from '../../models/course.model.js'

class TeacherWithCoursesSpecifications extends BaseSpecifications {

    constructor(criteria) {
        
        super(criteria);

        this.addInclude({model : Course})
    }
}

export default TeacherWithCoursesSpecifications;