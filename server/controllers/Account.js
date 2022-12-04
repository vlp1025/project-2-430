const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login', { csrfToken: req.csrfToken() });

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  }
};

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

const getUsername = (req, res) => {
  Account.getUsername(req.session.account._id, (err, doc) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.json({ username: doc });
  });
};

const changePassword = async (req, res) => {
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  const oldPassword = await Account.getCurrentPassword(req.session.account._id);
  const newPassHash = await Account.generateHash(newPass);

  if (oldPassword === newPassHash) {
    return res.status(400).json({ error: 'New password should be different than the former password' });
  }

  if (!newPass || !newPass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (newPass !== newPass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  await Account.changePassword(req.session.account._id, newPassHash);

  return res.status(200).json({ error: '' });
};

module.exports = {
  loginPage,
  login,
  signup,
  logout,
  getToken,
  getUsername,
  changePassword,
};
