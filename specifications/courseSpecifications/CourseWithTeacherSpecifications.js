import BaseSpecifications from '../BaseSpecifications.js';
import Teacher from '../../models/teacher.model.js';
class CourseWithTeacherSpecifications extends BaseSpecifications {

    constructor(criteria) {
        
        super(criteria);

        this.addInclude({ model: Teacher })
    }
}

export default CourseWithTeacherSpecifications;