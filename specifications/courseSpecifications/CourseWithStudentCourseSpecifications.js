import BaseSpecifications from '../BaseSpecifications.js'
import courseStudent from '../../models/courseStudent.model.js'
import Teacher from '../../models/teacher.model.js'

class CourseWithStudentCourseSpecifications extends BaseSpecifications {

    constructor(id) {
        
        super();

        this.addInclude({ model: courseStudent , required : false , where : {userId : id}})
        this.addInclude({model : Teacher})
    }
}

export default CourseWithStudentCourseSpecifications;