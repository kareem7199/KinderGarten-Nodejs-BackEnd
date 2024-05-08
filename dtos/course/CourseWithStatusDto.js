import TeacherWithCourseDto from '../teacher/TeacherWithCourseDto.js'

class CourseWithStatusDto {

    constructor(data) {
        this.data = data;
    }

    map() {

        if (Array.isArray(this.data)) {
            const result = this.data.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    price: e.price,
                    teacherName: new TeacherWithCourseDto(e.teacher).map() ,
                    isSelected : e.coursestudents?.length > 0 ?? false
                }
            })

            return result;

        } else {

            const result = {

                id: this.data.id,
                name: this.data.name,
                price: this.data.price,
                teacherName: new TeacherWithCourseDto(this.data.teacher).map(),
                isSelected : this.data.coursestudents?.length > 0 ?? false
            }

            return result;
        }
    }
    
}

export default CourseWithStatusDto;