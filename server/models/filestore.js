
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({

  name: {
    type: String,
  },


  data: {
    type: Buffer,
  },

  // The size attribute defines the size of the given file in bytes.
  size: {
    type: Number,
  },


  mimetype: {
    type: String,
  },
});

// Finally we construct a model based on our schema above.
const FileModel = mongoose.model('Test', FileSchema);

module.exports = FileModel;
