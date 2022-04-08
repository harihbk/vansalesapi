const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {

    constructor (option ,app){
        super(option, app);
        this.app = app
    }



};
