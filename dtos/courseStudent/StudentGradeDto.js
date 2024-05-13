class StudentGradeDto {
    constructor(data) {
        this.data = data;
    }

    map() {

        if (Array.isArray(this.data)) {

            const result = this.data.map((e) => {

                let sumOfGrades = 0 , total = 0;

                e.activities?.forEach((a) => {
                    
                    sumOfGrades += a.grade;
                    total += a.fullMark
                })

                return {
                    id: e.id,
                    courseName : e.course.name,
                    grade : `${sumOfGrades}/${total}`
                }
            })

            return result;

        } else {

            this.data?.activites?.forEash(() => {
                sumOfGrades += e.grade;
                total += e.fullMark
            })

            const result = {

                id: this.data.id,
                courseName : this.data.course.name,
                grade : `${sumOfGrades}/${total}`
            }

            return result;
        }
    }
}

export default StudentGradeDto;