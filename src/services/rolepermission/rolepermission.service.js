// Initializes the `rolepermission` service on path `/rolepermission`
const { Rolepermission } = require('./rolepermission.class');
const createModel = require('../../models/rolepermission.model');
const hooks = require('./rolepermission.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: false,
    multi: ['create','patch']

  };

  // Initialize our service with any options it requires
  app.use('/rolepermission', new Rolepermission(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rolepermission');

  service.hooks(hooks);
};
