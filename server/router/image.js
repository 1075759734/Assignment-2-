const uuidv4 = require('uuid/v4');
const multer = require('multer');
const DIR = 'assets/';
// const upload = multer({dest: DIR}).single('image');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    console.log({file});
    cb(null, getUuidFilename(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('image');

module.exports = app => {
  app.post('/image-upload', upload, (req, res) => {
    console.log({reqFile: req.file});
    return res.send({ status: 'ok', filename: req.file.filename });
  });
};

function getUuidFilename(filename) {
  const extension = filename.split('.').pop();
  const name = uuidv4();
  return `${name}.${extension}`;
}
