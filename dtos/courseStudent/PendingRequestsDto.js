class PendingRequestsDto {
    constructor(data) {
        this.data = data;
    }

    map() {

        if (Array.isArray(this.data)) {
            const result = this.data.map((e) => {
                return {
                    id: e.id,
                    userName: e.user.name ,
                    courseName : e.course.name
                }
            })

            return result;

        } else {

            const result = {

                id: this.data.id,
                userName: this.data.user.name,
                courseName : this.data.course.name
            }

            return result;
        }
    }
}

export default PendingRequestsDto;