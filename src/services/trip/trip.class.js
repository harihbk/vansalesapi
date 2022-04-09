const { Service } = require('feathers-mongoose');
const mongoose = require("mongoose");

exports.Trip = class Trip extends Service {

  constructor(options,app){
    super(options,app)
    this.app =app;
  }

  async find(){
     let model = this.app.service('trip').Model;
     let g = await model.aggregate([

      {
       $project: {
         truck : 1,driver:1,loadman:1,tripid:1,
         createdate : { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
       }
      },
          {
             $lookup: {
               from: 'trucks',
               localField: 'truck',
               foreignField: '_id',
               as: 'truckdata'
             }
           }
     ])
     return g;
  }

  async get(data){
    let trip_id = data;
    let model = this.app.service('trip').Model;
     let g = await model.aggregate([

      {
        $match : {
          _id : new mongoose.Types.ObjectId(trip_id)
        }
      },
      {
       $project: {
         truck : 1,driver:1,loadman:1,tripid:1,
         createdate : { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
       }
      },
          {
             $lookup: {
               from: 'trucks',
               localField: 'truck',
               foreignField: '_id',
               as: 'truckdata'
             }
           },
           {
            $lookup: {
              from: 'users',
              localField: 'loadman',
              foreignField: '_id',
              as: 'loadman'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'driver',
              foreignField: '_id',
              as: 'driver'
            }
          }
     ])
     return g;


  }
};
