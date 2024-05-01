import ApiResponse from './ApiResponse.js';

class Erros {
    static BadRequest(message) {
        return ApiResponse.failure(400);
    }

    static Unauthorized() {
        return ApiResponse.failure(401);
    }

    static Forbidden() {
        return ApiResponse.failure(403);
    }

    static NotFound() {
        return ApiResponse.failure(404);
    }

    static InternalServerError() {
        return ApiResponse.failure(500);
    }
}

export default Erros;