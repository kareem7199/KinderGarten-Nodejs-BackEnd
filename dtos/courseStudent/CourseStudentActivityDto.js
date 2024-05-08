import UserDto from "../user/UserDto.js";

class CourseStudentActivityDto {

    constructor(data) {
        this.data = data;
    }

    map() {

        if (Array.isArray(this.data)) {
            const result = this.data.map((e) => {
                return {
                    ...new UserDto(e.user).map() ,
                    courseName : e.course.name ,
                    activities : e.activities
                }
            })

            return result;

        } else {

            const result = {
                ...new UserDto(this.data.user).map() ,
                courseName : this.data.course.name ,
                activities : this.data.activities
            }

            return result;
        }
    }

}

export default CourseStudentActivityDto;