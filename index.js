import express from "express"
import cors from "cors"
import 'dotenv/config'
import userRoutes from "./routes/users.routes.js"
import adminRoutes from "./routes/admins.routes.js"
import teacherRoutes from "./routes/teacher.routes.js"
import courseRoutes from "./routes/course.routes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("./uploads"));

app.use("/users" , userRoutes);
app.use("/admins" , adminRoutes);
app.use("/teachers" , teacherRoutes);
app.use("/courses" , courseRoutes);

app.get("/", (req, res) => {
  res.send("The Server is running!🫡");
});

app.get("/api", (req, res) => {
  res.send("The API is Working!🫡");
});

app.listen(process.env.PORT || 5550, () => {
  console.log(`server is running on ${process.env.PORT || 5550}`);
});