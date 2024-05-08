class TeacherDto {

    constructor(data) {
        this.data = data;
    }

    map() {

        if (this.data) {

            if (Array.isArray(this.data)) {
                const result = this.data.map((e) => {
                    return {
                        id: e.id,
                        name: e.name,
                        email: e.email,
                        phone: e.phone,
                        salary: e.salary,
                        profilePicture: `${process.env.BASEURL}/uploads/teachers/${e.profilePicture}`,
                        createdAt: e.createdAt,
                        courses: e.courses
                    }
                })

                return result;

            } else {

                
                console.log(this.data.courses)
                
                const result = {
                    id: this.data.id,
                    name: this.data.name,
                    email: this.data.email,
                    phone: this.data.phone,
                    salary: this.data.salary,
                    profilePicture: `${process.env.BASEURL}/uploads/teachers/${this.data.profilePicture}`,
                    createdAt: this.data.createdAt,
                    courses: this.data.courses
                }

                return result;
            }
        }
    }
}

export default TeacherDto;