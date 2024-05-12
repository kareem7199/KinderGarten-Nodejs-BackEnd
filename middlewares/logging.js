import morgan from "morgan";
import fs from "fs";

var accessLogStream = fs.createWriteStream("access.log", { flags: "a" });
morgan.token("req-body", (req, res) => {
  return "Requset Body: " + JSON.stringify(req.body);
});
morgan.token("req-user-id", (req, res) => {
  return `Request made by ${req.user?.id}`;
});
morgan.token("res-body", (req, res) => {
  return "Response Body: " + JSON.stringify(res.__custombody__);
});

module.exports = morgan(
  ':remote-addr - :remote-user [:date[clf]] :response-time[5] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :req-body - :res-body - :req-user-id',
  { stream: accessLogStream }
);
