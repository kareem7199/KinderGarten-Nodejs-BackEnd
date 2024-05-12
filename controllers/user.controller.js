import ApiErrorResponse from '../helpers/ApiErrorResponse.js';
import ApiResponse from "../helpers/ApiResponse.js";
import UserService from '../services/userService.js'
import UserDto from '../dtos/user/UserDto.js'
import UserAuthService from "../services/AuthService/userAuthService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();

        res.send(ApiResponse.success(new UserDto(users).map()));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getUser = async (req, res) => {
    try {

        const userId = req.user.id;

        const user = await UserService.getUser(userId);

        if (!user)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(new UserDto(user).map()));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
}

export const getStatus = async(req , res) => {
    try {
        const status = await UserService.getStatus(req.user.id);

        res.send(ApiResponse.success(status));
    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const createUser = async (req, res) => {
    try {

        const newUser = await UserService.createUser({ ...req.body, profilePicture: req.file.filename });

        if (!newUser)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(new UserDto(newUser).map()));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const login = async (req, res) => {
    try {

        const { password, parentPhone } = req.body;

        const token = await UserAuthService.login( parentPhone, password );

        if (!token)
            return res.status(404).send(ApiResponse.failure(null, "Invalid Parent Phone or password"));

        res.send(ApiResponse.success(token));

    } catch (error) {

        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const updateUser = async (req, res) => {
    try {

        const id = req.user.id;

        const user = await UserService.updateUser(id , req.body);

        if (!user)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(new UserDto(user).map(), "User updated successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const deleteUserById = async (req, res) => {
    try {

        const user = await UserService.deleteUser(req.params.id);

        if (!user)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(null, "User deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}