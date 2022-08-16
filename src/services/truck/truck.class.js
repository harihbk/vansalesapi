const { Service } = require('feathers-mongoose');

exports.Truck = class Truck extends Service {


  // constructor(options,app){
  //   super(options, app);
  //   this.app = app;
  // }

  // async find(name){
  //   const { page , limit } = name.query
  //   const sub = await super.find({
  //     query: {
  //       $skip : page*limit,
  //       $limit : limit,
  //     }
  //   });
  //   return {...sub, ...{ page : page } }
  // }
};
