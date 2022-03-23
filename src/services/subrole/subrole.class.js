const { Service } = require('feathers-mongoose');

exports.Subrole = class Subrole extends Service {

  constructor(options,app){
    super(options, app);
    this.app = app;
  }

  async find(name,params){
    const { page , limit } = name.query
    const sub = await super.find({
      query: {
        $skip : page*limit,
        $limit : limit,
        $populate : ({
          path : 'role',
          model : 'role'
        })
      }
    });
    return {...sub, ...{ page : page } }
  }

};
