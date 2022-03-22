// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const { CustomUsers } = require('./customUsers.class');
const fservice   = require('feathers-mongoose');


// const mongoose = require('mongoose');
// const service = require('feathers-mongoose');

module.exports = function (app) {
  const options = {
    name: 'users',
    Model: createModel(app),
    whitelist: ['$populate'],
    //paginate: app.get('paginate'),
    paginate:  {
      default: -1,
      max: 30
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));
  app.use('/_users', new CustomUsers(options, app));
 
  // Get our initialized service so that we can register hooks
  const service = app.service('users')

  service.hooks(hooks);
};
