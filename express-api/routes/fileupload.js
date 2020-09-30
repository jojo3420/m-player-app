const multer = require('multer');
const moment = require('moment');
const rand = require("random-key");

const path = 'public/audio';
// const path = 'your path. ex)/Users/jhnoru/Programmer/data'
const storage = multer.diskStorage({
  destination: function(req, file, cb) {

    cb(null, path);  // 파일이 저장되는 경로입니다.
  },
  filename: function(req, file, cb) {
    // 저장되는 파일명
    // console.log({ length: file.originalname.length})
    const format = file.originalname.split('.');
    cb(null, `${rand.generate()}.${format[format.length -1]}`);
  },
  limits: { fileSize: 60000000 } /* <= byte 단위:  60MB */
});

// single : 하나의 파일업로드 할때
// const upload = multer({ storage: storage }).single("file");
// const uploads = multer({ storage: storage }).array("files", 12);
const upload = multer({ storage: storage })



module.exports = upload;

