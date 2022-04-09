const { Service } = require('feathers-mongoose');

exports.Rolehaspermission = class Rolehaspermission extends Service {

  constructor(options,app){
    super(options,app)
  }


  async _patch(data,params){
    for (let n in params){
      super.update(params[n]['_id'],params[n])
    }

    return 'success';
  }

};
