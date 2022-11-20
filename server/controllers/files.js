const File = require('../models/filestore.js');

// A simple handler for rendering the upload page
const uploadPage = (req, res) => {
  res.render('upload');
};

const uploadFile = async (req, res) => {
  if (!req.files || !req.files.sampleFile) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  const { sampleFile } = req.files;

  try {
    const newFile = new File(sampleFile);
    const doc = await newFile.save();
    return res.status(201).json({
      message: 'File stored successfully!',
      fileId: doc._id,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'Something went wrong uploading file!',
    });
  }
};

const retrieveFile = async (req, res) => {
  if (!req.query._id) {
    return res.status(400).json({ error: 'Missing file id!' });
  }

  let doc;
  try {
    // First we attempt to find the file by the _id sent by the user.
    doc = await File.findOne({ _id: req.query._id }).exec();
  } catch (err) {
    // If we have an error contacting the database, let the user know something happened.
    console.log(err);
    return res.status(400).json({ error: 'Something went wrong retrieving file!' });
  }

  // Below the catch, we know our request has been successful.

  if (!doc) {
    return res.status(404).json({ error: 'File not found!' });
  }

  res.set({
    // Content-Type tells the browser what type of file it is (png, mp3, zip, etc)
    'Content-Type': doc.mimetype,

    // Content-Length tells it how many bytes long it is.
    'Content-Length': doc.size,

    'Content-Disposition': `filename="${doc.name}"`, /* `attachment; filename="${doc.name}"` */
  });

  return res.send(doc.data);
};

module.exports = {
  uploadPage,
  uploadFile,
  retrieveFile,
};
