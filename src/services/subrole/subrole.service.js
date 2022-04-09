// Initializes the `subrole` service on path `/subrole`
const { Subrole } = require('./subrole.class');
const createModel = require('../../models/subrole.model');
const hooks = require('./subrole.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$populate']

  };

  // Initialize our service with any options it requires
  app.use('/subrole', new Subrole(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('subrole');

  service.hooks(hooks);
};
