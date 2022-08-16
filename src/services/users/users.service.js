// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const { CustomUsers } = require('./customUsers.class');


 const mongoose = require('mongoose');
// const service = require('feathers-mongoose');

module.exports = function (app) {
  const options = {
    name: 'users',
    Model: createModel(app),
    whitelist: ['$populate','$match','$lookup','$elemMatch'],
    //paginate: app.get('paginate'),
    paginate:  {
      default: 5,
      max: 5
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));
  app.use('/getusers',async(req,res)=>{


  const skip = req?.query?.$skip
  console.log(req?.query);
 const slug = await app.service('role').Model.findOne({ slug: 'admin' }).exec()
  let query={};
  //if(skip){
    query = {
      $populate: [
        {
        path : 'role',
        model : 'role',
        match: { slug: { $nin: ['admin'] } },
      },
      {
        path : 'designation',
        model : 'designation',
      }],
      $select : {
        password : 0
      },
      role : {
        $ne : mongoose.Types.ObjectId(slug._id)
      },
      $limit: 5,
      $skip: skip,
    }
    console.log(req?.query);
  const sub = await app.service('users').find({query});
  res.send(sub);
  });


  app.use('/_users', new CustomUsers(options, app));





  app.get('/unassignedusers', async (req, res) => {


   let role = req.query.role;
   let g= app.service('truck').Model
   let gg = await g.find();
   let hh = gg.map(e=>(
    e.users
   ));

   let users = app.service('users').Model
   let hn = await users.aggregate([
     {
      $match : { '_id' : { "$nin" : hh} }
     },
     {
        $lookup : {
          from : 'roles',
          localField : 'role',
          foreignField : '_id',
          "as" : "roled",
        }
     },
     {
       $match : { "roled.slug" : { "$eq" : 'driver' } }
     }
   ])

  	res.send(hn);
  });





  // Get our initialized service so that we can register hooks
  const service = app.service('users')

  service.hooks(hooks);
};
