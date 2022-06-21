// Initializes the `Designation` service on path `/designation`
const { Designation } = require('./designation.class');
const createModel = require('../../models/designation.model');
const hooks = require('./designation.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/designation', new Designation(options, app));

  app.use('/_designation' , {
    async find(){
      return await app.service('designation').find({
        paginate: false
      })
    }
  });


  // Get our initialized service so that we can register hooks
  const service = app.service('designation');

  service.hooks(hooks);
};
