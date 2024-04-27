const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ADMINS = require("../models/admin.model");
const USERS = require("../models/user.model");
const TEACHERS = require("../models/teacher.model");
const ApiErrorResponse = require('../helpers/ApiErrorResponse');

const getToken = (headers) => {
  const authHeader = headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
}

module.exports = {

  verifyAdmin: async (req, res, next) => {

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
  },

  verifyUser: (req, res, next) => {

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
  },

  verifyTeacher: (req, res, next) => {

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
  },
};
