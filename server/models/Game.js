const mongoose = require('mongoose');
const _ = require('underscore');

let GameModel = {};

const setName = (name) => _.escape(name).trim();

// creates the structure of a game
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
  rating: {
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

// send the data to the server
GameSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  hours: doc.hours,
  rating: doc.rating,
  genre: doc.genre,
  fileId: doc.fileId,
  start: doc.start,
});

// find info of the current logged in user
GameSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return GameModel.find(search).select('name hours start fileId genre rating').lean().exec(callback);
};

GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;
