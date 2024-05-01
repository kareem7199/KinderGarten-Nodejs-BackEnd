import jwt from "jsonwebtoken"
import ADMINS from "../models/admin.model.js"
import USERS from "../models/user.model.js"
import TEACHERS from "../models/teacher.model.js"
import ApiErrorResponse from "../helpers/ApiErrorResponse.js"

const getToken = (headers) => {
  const authHeader = headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
}


export const verifyAdmin = async (req, res, next) => {

  const token = getToken(req.headers)

  jwt.verify(token, process.env.SECRET_JWT, async (err, admin) => {

    if (err)
      return res.status(401).send(ApiErrorResponse.Unauthorized());

    const checkAdmin = await ADMINS.findByPk(admin.id);

    if (!checkAdmin)
      return res.status(401).send(ApiErrorResponse.Unauthorized());

    req.admin = checkAdmin;
    next();
  });
}

export const verifyUser = (req, res, next) => {

  const token = getToken(req.headers)

  if (!token)
    return res.status(401).send(ApiErrorResponse.Unauthorized());

  jwt.verify(token, process.env.SECRET_JWT, async (err, user) => {

    if (err)
      return res.status(401).send(ApiErrorResponse.Unauthorized());

    const checkUser = await USERS.findByPk(user.id);

    if (!checkUser)
      return res.status(401).send(ApiErrorResponse.Unauthorized());

    req.user = checkUser;
    next();

  });
}

export const verifyTeacher = (req, res, next) => {

  const token = getToken(req.headers)

  if (!token)
    return res.status(401).send(ApiErrorResponse.Unauthorized());

  jwt.verify(token, process.env.SECRET_JWT, async (err, teacher) => {

    if (err)
      return res.status(401).send(ApiErrorResponse.Unauthorized());

    const checkTeacher = await TEACHERS.findByPk(teacher.id);

    if (!checkTeacher)
      return res.status(401).send(ApiErrorResponse.Unauthorized());

    req.teacher = checkTeacher;
    next();

  });
}
