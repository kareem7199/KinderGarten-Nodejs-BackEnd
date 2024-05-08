import TeacherWithCourseDto from "../teacher/TeacherWithCourseDto.js";

class CourseDto {
    constructor(data) {
        this.data = data;
    }

    map() {

        if (this.data) {
            if (Array.isArray(this.data) && this.data.length) {
                const result = this.data.map((e) => {
                    return {
                        id: e.id,
                        name: e.name,
                        price: e.price,
                        teacherName: new TeacherWithCourseDto(e.teacher).map()
                    }
                })

                return result;

            } else {

                const result = {

                    id: this.data.id,
                    name: this.data.name,
                    price: this.data.price,
                    teacherName: new TeacherWithCourseDto(this.data.teacher).map()
                }

                return result;
            }
        }
    }

}

export default CourseDto;