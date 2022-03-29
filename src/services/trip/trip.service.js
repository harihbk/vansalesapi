// Initializes the `trip` service on path `/trip`
const { Trip } = require('./trip.class');
const createModel = require('../../models/trip.model');
const hooks = require('./trip.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: false
  };

  // Initialize our service with any options it requires
  app.use('/trip', new Trip(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trip');

  service.hooks(hooks);
};
