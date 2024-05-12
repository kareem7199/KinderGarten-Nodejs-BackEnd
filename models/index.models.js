import db from "../config/db.js";
import COURSES from "./course.model.js";
import USERS from "./user.model.js";
import ADMINS  from "./admin.model.js";
import TEACHERS from "./teacher.model.js";
import COURSE_STUDENT from "./courseStudent.model.js";
import ACTIVITIES from "./activity.model.js";
import STATUS from './status.model.js'

TEACHERS.hasMany(COURSES ,  { foreignKey: 'teacherId' });
COURSES.belongsTo(TEACHERS , { foreignKey: 'teacherId' });

COURSES.belongsToMany(USERS, { through: COURSE_STUDENT});
USERS.belongsToMany(COURSES, { through: COURSE_STUDENT});

COURSES.hasMany(COURSE_STUDENT);
COURSE_STUDENT.belongsTo(COURSES);

COURSE_STUDENT.belongsTo(USERS);


COURSE_STUDENT.hasMany(ACTIVITIES);
ACTIVITIES.belongsTo(COURSE_STUDENT);

USERS.hasMany(STATUS);
STATUS.belongsTo(USERS);

db.authenticate().then(()=>{
    db.sync({alter:true})
    console.log("done");    
  })
  .catch((err)=>{
    console.log(err);
  });

export { COURSES , ADMINS , TEACHERS , USERS , ACTIVITIES , COURSE_STUDENT};