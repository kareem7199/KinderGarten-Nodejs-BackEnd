class TeacherWithCourseDto {
    
    constructor(data) {
        this.data = data;
    }

    map() {
            
        if(this.data) {
            
            const result = this.data.name

            return result;
        }
    }
}

export default TeacherWithCourseDto;