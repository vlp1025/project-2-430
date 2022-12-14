const models = require('../models');

const { Game } = models;

const makerPage = (req, res) => res.render('app');

// handles deleting current game
const deleteGame = async (req, res) => {
  try {
    await Game.deleteOne({ _id: req.body._id });
    return res.status(200).json({ _id: req.body._id });
  } catch (err) {
    return res.status(400).json({ error: 'Could not delete game' });
  }
};

// handles making a game with the correct info and attributes
const makeGame = async (req, res) => {
  if (!req.body.name || !req.body.hours || !req.body.start || !req.body.fileId
     || !req.body.genre || !req.body.rating) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const gameData = {
    name: req.body.name,
    hours: req.body.hours,
    genre: req.body.genre,
    fileId: req.body.fileId,
    start: req.body.start,
    rating: req.body.rating,
    owner: req.session.account._id,
  };

  try {
    const newGame = new Game(gameData);
    await newGame.save();
    return res.status(201).json({
      name: newGame.name,
      hours: newGame.hours,
      start: newGame.start,
      fileId:
      newGame.fileId,
      rating: newGame.rating,
      genre: newGame.genre,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Game already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

// gets the saved games to display
const getGames = (req, res) => {
  Game.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred!' });
    }

    return res.json({ games: docs });
  });
};

module.exports = {
  makerPage,
  makeGame,
  getGames,
  deleteGame,
};
