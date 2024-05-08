class ActivityDto {
    constructor(data) {
        this.data = data;
    }

    map() {

        if (Array.isArray(this.data)) {
            const result = this.data.map((e) => {
                return {
                    id: e.id,
                    title: e.title,
                    grade: `${e.grade}/${e.fullMark}`
                }
            })

            return result;

        } else {

            const result = {

                id: this.data.id,
                title: this.data.title,
                grade: `${this.data.grade}/${this.data.fullMark}`
            }

            return result;
        }
    }
}

export default ActivityDto;