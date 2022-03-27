const { Service } = require('feathers-mongoose');

exports.Modulepermission = class Modulepermission extends Service {
  constructor(options,app){
    super(options, app);
    this.app = app;
  }

  async find(params){
    const { role , subrole } = params.query;
    const modulepermission = await super.find({
      paginate:false,
      query : {
        role : role,
        subrole : subrole
      }
    });

    return modulepermission;
  }

  async _patch(data,params){
    var arr = [];
    for (let n in params){
      if(params[n]['_id']){
      super.update(params[n]['_id'],params[n])
      } else {
      super.create(params[n])
      }


    }

    return arr;
  }

};
