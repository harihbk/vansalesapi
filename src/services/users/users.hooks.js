const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');

const populateSchema = {
  include:[
   {
    service: 'role',
    nameAs: 'authorRec',
    parentField: 'role_id',
    childField: 'id',
   }
  ]
};

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find:[],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
      
      

      // populate({
      //   schema: {    
      //    include: [{      
      //     service: 'role',
      //     nameAs: 'role',
      //     parentField: 'role',
      //     childField: '_id',
          
      //    }]
      //   }
      // })
    ],
    find: [],
    get: [
     
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
