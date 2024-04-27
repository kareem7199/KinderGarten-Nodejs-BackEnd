const db = require("../config/db");
const COURSES = require("./course.model");
const USERS = require("./user.model");
const ADMINS  = require("./admin.model");
const TEACHERS = require("./teacher.model");
const COURSE_STUDENT = require("./courseStudent.model");
const ACTIVITIES = require("./activity.model");

TEACHERS.hasMany(COURSES ,  { foreignKey: 'teacherId' });
COURSES.belongsTo(TEACHERS , { foreignKey: 'teacherId' });

COURSES.belongsToMany(USERS, { through: COURSE_STUDENT});
USERS.belongsToMany(COURSES, { through: COURSE_STUDENT});

COURSE_STUDENT.hasMany(ACTIVITIES);
ACTIVITIES.belongsTo(COURSE_STUDENT);

db.authenticate().then(()=>{
    db.sync({alter:true})
    console.log("done");    
  })
  .catch((err)=>{
    console.log(err);
  });