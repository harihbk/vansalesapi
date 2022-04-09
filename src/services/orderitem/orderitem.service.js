// Initializes the `orderitem` service on path `/orderitem`
const { Orderitem } = require('./orderitem.class');
const createModel = require('../../models/orderitem.model');
const hooks = require('./orderitem.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/orderitem', new Orderitem(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('orderitem');

  service.hooks(hooks);
};
