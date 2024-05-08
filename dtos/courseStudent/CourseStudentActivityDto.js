import UserDto from "../user/UserDto.js";
import ActivityDto from "../activity/ActivityDto.js";

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
                    activities : new ActivityDto(e.activities).map()
                }
            })

            return result;

        } else {

            const result = {
                ...new UserDto(this.data.user).map() ,
                courseName : this.data.course.name ,
                activities : new ActivityDto(this.data.activities).map()
            }

            return result;
        }
    }

}

export default CourseStudentActivityDto;