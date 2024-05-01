class ApiResponse {
    constructor(data, message = '') {
        this.data = data;
        this.message = message;
    }

    static success(data, message = 'Data fetched successfully') {
        return new ApiResponse(data, message);
    }

    static failure(statusCode , message , data = null) {
        
        if(!message)
            message = ApiResponse.getDefaultMessageForStatusCode(statusCode); // Define message using const

        return new ApiResponse(data, message);
    }

    static created(data, message = 'Resource created successfully.') {
        return new ApiResponse(data, message);
    }

    static getDefaultMessageForStatusCode(statusCode) {
        switch (statusCode) {
            case 400: return 'Bad request';
            case 401: return 'Unauthorized';
            case 403: return 'Forbidden';
            case 404: return 'Not found';
            case 500: return 'Internal server error';
            default: return 'An error occurred';
        }
    }
}

export default ApiResponse; // Exporting for use in Node.js
