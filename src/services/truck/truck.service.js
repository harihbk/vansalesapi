// Initializes the `truck` service on path `/truck`
const { Truck } = require('./truck.class');
const createModel = require('../../models/truck.model');
const hooks = require('./truck.hooks');
const router = require('./routee');
const { authenticate } = require('@feathersjs/express');


module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };



  // Initialize our service with any options it requires
  app.use('/truck', new Truck(options, app));

  app.use('/gettruck', async(req,res)=>{
    const truck = app.service('truck').Model
    const users = app.service('users').Model
    const trip = app.service('trip').Model

    const _trip = await trip.find();


    let trip_ids = _trip.map(e=>(
      truck_id = e.truck
    ))

    let driverids = _trip.map(e=>(
      e.driver
    ))

    let loadmanids = _trip.map(e=>(
      e.loadman
    ))

    const _truck = await truck.find({ "_id": { "$nin": trip_ids } })


    //driver role
   // const driver = await users.find({ "_id": { "$nin": driverids } }).where('role').equals('623fd90da438abd7c3cd675e')

    let driver = await users.aggregate([
      {
       $match : { '_id' : { "$nin" : driverids} }
      },{
        $lookup : {
          from : 'roles',
          localField : 'role',
          foreignField : '_id',
          "as" : "roled",
        }
      },
      {
        $match : { "roled.slug" : { "$eq" : 'driver' } }
      }
    ])

   // const loadman = await users.find({ "_id": { "$nin": loadmanids } }).where('role').equals('623fd900a438abd7c3cd6730')

    let loadman = await users.aggregate([
      {
       $match : { '_id' : { "$nin" : loadmanids} }
      },{
        $lookup : {
          from : 'roles',
          localField : 'role',
          foreignField : '_id',
          "as" : "roled",
        }
      },
      {
        $match : { "roled.slug" : { "$eq" : 'loadman' } }
      }
    ])


      var data={};
      data.truck = _truck;
      data.driver = driver;
      data.loadman = loadman;

      res.send(data);
  });


   //app.use('/trucks',router)



  // Get our initialized service so that we can register hooks
  const service = app.service('truck');

  service.hooks(hooks);
};
