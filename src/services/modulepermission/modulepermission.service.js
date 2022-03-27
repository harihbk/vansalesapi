// Initializes the `modulepermission` service on path `/modulepermission`
const { Modulepermission } = require('./modulepermission.class');
const createModel = require('../../models/modulepermission.model');
const hooks = require('./modulepermission.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['create','patch']

  };

  // Initialize our service with any options it requires
  app.use('/modulepermission', new Modulepermission(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('modulepermission');

  service.hooks(hooks);
};
