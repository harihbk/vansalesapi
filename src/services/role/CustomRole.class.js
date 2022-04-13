const { Service } = require('feathers-mongoose');

exports.CustomRole = class CustomRole extends Service {

    constructor(options ,app){
        super(options)
        
        this.app = app;
    }
  
    async find(){
        const messageService = this.app.service('role');
        return await messageService.find({ 
            paginate:false ,
            query:{
                name: { "$nin" : ['admin']  },
                $select : ['_id', 'name', 'slug']
              },
        });
    }
    
  
};
