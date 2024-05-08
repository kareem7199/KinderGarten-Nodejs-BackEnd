class AdminDto {
    constructor(data) {
        this.data = data;
    }

    map() {

        if (Array.isArray(this.data)) {
            const result = this.data.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    email: e.email
                }
            })

            return result;

        } else {
            
            const result = {

                id: this.data.id,
                name: this.data.name,
                email: this.data.email
            }

            return result;
        }
    }
}

export default AdminDto;