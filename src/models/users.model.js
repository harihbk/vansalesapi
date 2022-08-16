// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  var mongoose = require('mongoose');

  const { Schema } = mongooseClient;
//var mongoosePaginate = require('mongoose-paginate');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

//var mongoosePaginate = require('mongoose-paginate');

  const schema = new mongooseClient.Schema({
    email: { type: String, unique: true,required: true, lowercase: true },
    password: { type: String,required: true, },
    designation : { type : Schema.Types.ObjectId , rel : 'designation'} ,
    empno        : { type : String },
    first_name  : { type : String ,required: true,},
    last_name  : { type : String },
    mobile_number : { type : String ,required: true,unique: true},
    role : {
      type : Schema.Types.ObjectId,
      rel  : 'Role'
    },
    user_type : {type:String}
  }, {
    timestamps: true
  });

  schema.index({ mobile_number : 1  },{ index : true , unique: true});
  //schema.syncIndexes( {username : 0 , sparse: true} );




schema.plugin(mongoosePaginate);


  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }

  var Driver = mongooseClient.model('users', schema);
  // Dropping an Index in MongoDB
  // Driver.collection.dropIndex('username', function(err, result) {
  //     if (err) {
  //         console.log('Error in dropping index!', err);
  //     }
  // });


  return mongooseClient.model(modelName, schema);

};
