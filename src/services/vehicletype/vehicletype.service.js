// Initializes the `vehicletype` service on path `/vehicletype`
const { Vehicletype } = require('./vehicletype.class');
const createModel = require('../../models/vehicletype.model');
const hooks = require('./vehicletype.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vehicletype', new Vehicletype(options, app));

  app.use('/getvehicle', {
    async find(){
      return await app.service('vehicletype').find({
        paginate: false
      })
    }
  });


  // Get our initialized service so that we can register hooks
  const service = app.service('vehicletype');

  service.hooks(hooks);
};
