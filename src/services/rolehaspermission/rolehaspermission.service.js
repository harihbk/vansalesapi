// Initializes the `rolehaspermission` service on path `/rolehaspermission`
const { Rolehaspermission } = require('./rolehaspermission.class');
const createModel = require('../../models/rolehaspermission.model');
const hooks = require('./rolehaspermission.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: false,
    multi: ['create','patch']

  };

  // Initialize our service with any options it requires
  app.use('/rolehaspermission', new Rolehaspermission(options, app));


  // Get our initialized service so that we can register hooks
  const service = app.service('rolehaspermission');

  service.hooks(hooks);
};
