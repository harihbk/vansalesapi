const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
var mongoose = require('mongoose');



const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const filter = async (ctx,next) => {
  const filterroles = ctx.app.service("truck").Model;
  let g= await filterroles.aggregate([
    {
      $project : {
        users : 1 , _id : 1
      }
    }
  ]);
  let users = g.map(e=>(
   { users :  e.users }
  ))
  const id = mongoose.ObjectId.cast(users)
  console.log(g);



  let usr = ctx.app.service('users').find({
  query: {
    _id: {
      $nin: ['623fd954a438abd7c3cd6790']
    }
  }
});


   console.log(usr);
  ctx.result = usr;

  return ctx
 // next();
}

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
    find: [

    ],
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
