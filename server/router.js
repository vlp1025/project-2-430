const controllers = require('./controllers');
const mid = require('./middleware');
const file = require('./controllers/files.js');

// sets the direction for all the pages of the app
const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getGames', mid.requiresLogin, controllers.Game.getGames);
  app.get('/404', controllers.Account.redirectErrorPage);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/getUsername', mid.requiresLogin, controllers.Account.getUsername);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Game.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Game.makeGame);

  app.post('/delete', mid.requiresLogin, controllers.Game.deleteGame);

  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.post('/upload', file.uploadFile);
  app.get('/retrieve', file.retrieveFile);
};

module.exports = router;
