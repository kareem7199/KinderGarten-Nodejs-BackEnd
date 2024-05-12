import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderName = file.fieldname;
    const folders = ["teachers", "users"];
    if (!folders.includes(folderName)) {
      cb(null, `${__dirname}/../uploads/trash`);
    } else {
      if (
        !fs.existsSync(
          `${__dirname}/../uploads/${folderName}`
        )
      ) {
        fs.mkdirSync(
          `${__dirname}/../uploads/${folderName}`,
          {
            recursive: true,
          }
        );
      }
      cb(
        null,
        `${__dirname}/../uploads/${folderName}`
      );
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];

    cb(null, 0 + "-" + uniqueSuffix + `.${ext}`);
  },
});
const userProfilePictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (
      !fs.existsSync(
        `${__dirname}/../uploads/users`
      )
    ) {
      fs.mkdirSync(
        `${__dirname}/../uploads/users`,
        {
          recursive: true,
        }
      );
    }
    cb(
      null,
      `${__dirname}/../uploads/users`
    );

  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];

    cb(null, 0 + "-" + uniqueSuffix + `.${ext}`);
  },
});
const teacherProfilePictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (
      !fs.existsSync(
        `${__dirname}/../uploads/teachers`
      )
    ) {
      fs.mkdirSync(
        `${__dirname}/../uploads/teachers`,
        {
          recursive: true,
        }
      );
    }
    cb(
      null,
      `${__dirname}/../uploads/teachers`
    );

  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];

    cb(null, 0 + "-" + uniqueSuffix + `.${ext}`);
  },
});
const allowedFiles = (req, file, cb) => {
  if (
    !file.originalname.match(
      /\.(jpg|JPG|jpeg|JPEG|png|PNG)$/
    )
  ) {
    req.fileValidationError =
      "Only jpg|JPG|jpeg|JPEG|png|PNG file type are allowed!";
    return cb(
      new multer.MulterError(
        "Only jpg|JPG|jpeg|JPEG|png|PNG file type  are allowed!"
      ),
      false
    );
  } else cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: allowedFiles,
  limits: { fileSize: 1024 * 1024 * 3 },
});
const userProfilePictureUploader = multer({
  storage: userProfilePictureStorage,
  fileFilter: allowedFiles,
  limits: { fileSize: 1024 * 1024 * 3 },
})
const teacherProfilePictureUploader = multer({
  storage: teacherProfilePictureStorage,
  fileFilter: allowedFiles,
  limits: { fileSize: 1024 * 1024 * 3 },
})
export const multiFiles = (keysHandler) => {
  return (req, res, next) => {
    const files = upload.fields(keysHandler);

    files(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message:
            "Error while uploading media :( Make sure you are uploading a PNG, JPG or JPEG file with less than 3 MBs of space",
        });
      } else if (err) {
        res.status(503).send({
          message:
            "Server Error while uploading media :(",
        });
      } else next();
    });
  };
};
export const uploadUserProfilePicture = () => {
  return (req, res, next) => {
    const file = userProfilePictureUploader.single("image");

    file(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err)
        res.status(400).send({
          message:
            "Error while uploading media :( Make sure you are uploading a PNG, JPG or JPEG file with less than 3 MBs of space",
        });
      } else if (err) {
        res.status(503).send({
          message:
            "Server Error while uploading media :(",
        });
      } else next();
    });
  };
};
export const uploadTeacherProfilePicture = () => {
  return (req, res, next) => {
    const file = teacherProfilePictureUploader.single("image");

    file(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err)
        res.status(400).send({
          message:
            "Error while uploading media :( Make sure you are uploading a PNG, JPG or JPEG file with less than 3 MBs of space",
        });
      } else if (err) {
        res.status(503).send({
          message:
            "Server Error while uploading media :(",
        });
      } else next();
    });
  };
};
