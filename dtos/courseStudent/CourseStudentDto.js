import UserDto from '../user/UserDto.js'

class CourseStudentDto {
    constructor(data) {
        this.data = data;
    }

    map() {

        if (Array.isArray(this.data)) {
            const result = this.data.map((e) => {
                return {
                    ...new UserDto(e.user).map() ,
                    coursestudentId : e.id
                }
            })

            return result;

        } else {

            const result = new UserDto(this.data.user).map()

            return result;
        }
    }
}

export default CourseStudentDto;