const mongoose = require('mongoose');
const _ = require('underscore');
 
let GameModel = {};
 
const setName = (name) => _.escape(name).trim();
 
const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  hours: {
    type: Number,
    min: 0,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  start: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
 
GameSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  hours: doc.hours,
  genre: doc.genre,
  fileId: doc.fileId,
  start: doc.start,
});
 
GameSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    // Convert the string ownerId to an object id
    owner: mongoose.Types.ObjectId(ownerId),
  };
 
  return GameModel.find(search).select('name hours start fileId genre').lean().exec(callback);
};
 
GameModel = mongoose.model('Game', GameSchema);
 
module.exports = GameModel;
 
