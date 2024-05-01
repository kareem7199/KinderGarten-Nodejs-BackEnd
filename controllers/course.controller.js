import { ACTIVITIES, TEACHERS, COURSES, COURSE_STUDENT , USERS} from "../models/index.models.js"
import ApiErrorResponse from '../helpers/ApiErrorResponse.js'
import ApiResponse from "../helpers/ApiResponse.js"


export const getCourses = async (req, res) => {
    try {
        const cousrses = await COURSES.findAll({
            attributes: ["id", "name", "price"],
            raw: true,
            include: {
                attributes: ["name"],
                model: TEACHERS
            }
        });
        res.send(ApiResponse.success(cousrses));
    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const getCourse = async (req, res) => {
    try {

        const course = await COURSES.findOne({
            raw: true,
            where: {
                id: req.params.id
            },
            include: {
                model: TEACHERS,
                attributes: ["name", "profilePicture"]
            }
        });


        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        res.send(ApiResponse.success(course));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError(500));
    }
}

export const getPendingRequests = async (req, res) => {
    try {
        
        const result = await COURSE_STUDENT.findAll({
            raw: true,
            where : {
                isPaid : false
            } ,
             attributes : ['id'],
            include : [
                {
                    model : COURSES ,
                    attributes: [ 'name' ],
                } ,
                {
                    model : USERS ,
                    attributes: [ 'name' ],
                }
            ]
        })

        res.send(ApiResponse.success(result));

    } catch (error) {

        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const addActivityToStudent = async (req, res) => {
    try {

        const teacherId = req.teacher.id;
        const coursestudentId = req.params.id;
        const { grade, title, fullMark } = req.body;

        const courseStudent = await COURSE_STUDENT.findByPk(coursestudentId);

        if (!courseStudent.isPaid)
            return res.status(400).send(ApiErrorResponse.BadRequest());

        const course = await COURSES.findOne({
            where: {
                teacherId: teacherId
            }
        })

        if (!course)
            return res.status(400).send(ApiErrorResponse.BadRequest());

        const newActivity = await ACTIVITIES.create({
            title,
            grade,
            fullMark,
            coursestudentId: coursestudentId
        })

        res.send(ApiResponse.created(newActivity));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const enroll = async (req, res) => {
    try {

        const newCourseStudent = await COURSE_STUDENT.create({
            courseId: req.body.courseId,
            userId: req.user.id
        });

        res.send(ApiResponse.created(newCourseStudent));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const createCourse = async (req, res) => {
    try {

        const newCourse = await COURSES.create(req.body);

        if (!newCourse)
            return res.status(404).send(ApiErrorResponse.BadRequest());

        res.send(ApiResponse.created(newCourse));

    } catch (error) {
        console.log(error)
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const acceptRequest = async (req, res) => {
    try {

        const id = req.body.id;
        
        const request = await COURSE_STUDENT.findByPk(id);

        if (!request)
            return res.status(404).send(ApiErrorResponse.NotFound());

        request.isPaid = true;

        await request.save();

        res.send(ApiResponse.success(request, "request Accepted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const rejectRequest = async (req, res) => {

    try {
        
        const id = req.body.id;

        const request = await COURSE_STUDENT.findByPk(id);

        if(!request)
            return res.status(404).send(ApiErrorResponse.NotFound());
        
        if(request.isPaid)
            return res.status(400).send(ApiErrorResponse.BadRequest());

        await request.destroy();

        res.send(ApiResponse.success(request, "request Rejected successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }

}

export const updateCourse = async (req, res) => {
    try {

        const course = await COURSES.findByPk(req.params.id);

        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        const updatedCourse = await course.update(req.body);

        res.send(ApiResponse.success(updatedCourse, "Course updated successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}

export const deleteCourseById = async (req, res) => {
    try {

        const course = await COURSES.findByPk(req.params.id);

        if (!course)
            return res.status(404).send(ApiErrorResponse.NotFound());

        await course.destroy();

        res.send(ApiResponse.success(null, "Course deleted successfully"));

    } catch (error) {
        res.status(500).send(ApiErrorResponse.InternalServerError());
    }
}