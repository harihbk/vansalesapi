// Initializes the `truck` service on path `/truck`
const { Truck } = require('./truck.class');
const createModel = require('../../models/truck.model');
const hooks = require('./truck.hooks');
const router = require('./routee');
const { authenticate } = require('@feathersjs/express');

const multer = require('multer');

// const {
//   authenticate
// } = require('@feathersjs/authentication').express; // getting feathers' authenticate middleware
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) // getting the file name
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1e+8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e+7, //  The max file size in bytes, here it's 10MB
    files: 1
    // READ MORE https://www.npmjs.com/package/multer#limits
  }
}).any();

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    multi: true, // allowing us to store multiple instances of the model, in the same request
    whitelist: ['$populate','$match'],
    //paginate: app.get('paginate'),
    paginate:  {
      default: 5,
      max: 5
    }
  };



  // Initialize our service with any options it requires


  app.use('/truck',
  upload,
 (req, _res, next) => {
  //upload.single('files'),
    const { method } = req;
    if (method === 'POST' || method === 'PATCH') {
      //req.files for multer.any()
      if(req.files){
        req.body.files = `public/uploads/${req.files[0]?.path}`
      }
    }
    next();
  }

  ,new Truck(options, app));



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

   // const _truck = await truck.find({ "_id": { "$nin": trip_ids } })
    const _truck = await truck.find()


    //driver role
   // const driver = await users.find({ "_id": { "$nin": driverids } }).where('role').equals('623fd90da438abd7c3cd675e')

    let driver = await users.aggregate([
      // {
      //  $match : { '_id' : { "$nin" : driverids} }
      // },
      {
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
      // {
      //  $match : { '_id' : { "$nin" : loadmanids} }
      // },
      {
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
