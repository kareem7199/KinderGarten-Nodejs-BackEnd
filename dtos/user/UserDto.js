class UserDto {
    constructor(data) {
        this.data = data;
    }

    map() {

        if (Array.isArray(this.data)) {
            const result = this.data.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    profilePicture: `${process.env.BASEURL}/uploads/users/${e.profilePicture}`,
                    birthDate: e.birthDate,
                    parentPhone: e.parentPhone
                }
            })

            return result;

        } else {
            
            const result = {
                id: this.data.id,
                name: this.data.name,
                email: this.data.email,
                profilePicture: `${process.env.BASEURL}/uploads/users/${this.data.profilePicture}`,
                birthDate: this.data.birthDate,
                parentPhone: this.data.parentPhone
            }

            return result;
        }
    }
}

export default UserDto;