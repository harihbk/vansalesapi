// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const { CustomUsers } = require('./customUsers.class');
const fservice   = require('feathers-mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { NotAuthenticated, NotFound } = require('@feathersjs/errors');
const { pick } = require('lodash');

// const mongoose = require('mongoose');
// const service = require('feathers-mongoose');

module.exports = function (app) {
  const options = {
    name: 'users',
    Model: createModel(app),
    whitelist: ['$populate'],
    //paginate: app.get('paginate'),
    paginate: false
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));
  app.use('/_users', new CustomUsers(options, app));



  app.get('/unassignedusers', async (req, res) => {


   let role = req.query.role;
   let g= app.service('truck').Model
   let gg = await g.find();
   let hh = gg.map(e=>(
    e.users
   ));

   let users = app.service('users').Model
   console.log(hh);
   let hn = await users.aggregate([
     {
      $match : { '_id' : { "$nin" : hh} }
     },{
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
