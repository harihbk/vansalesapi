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
    find:[
      (ctx) => {

        // let query = ctx.params.query
        // query['$elemMatch'] ={ empno: 809 }


        // console.log(query);


        // $lookup: {
        //   from: "roles",
        //   localField: "role",
        //   foreignField: "_id",
        //   as: "orders_info",
        // },


      }
     ],
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
      ( context ) => {
        const { result, app } = context;
         if(result?.length == 1){
         // result = `${result.first_name} ${result.last_name}`
         // return Object.assign({},context,result )
         } else {
          result?.data?.map(datas => {
            datas.fullname  =  `${datas.first_name} ${datas.last_name}`
            return  datas
            } )

          return Object.assign({},context,result )
         }




      }
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
