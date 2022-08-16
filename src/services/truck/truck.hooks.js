const { authenticate } = require('@feathersjs/authentication').hooks;
const addVirtual = require('feathers-virtual-attribute-hook')
const { populate } = require('feathers-hooks-common');
const dauria = require('dauria');
var moment = require('moment');




module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      populate({
        schema: {
         include: [{
          service: 'vehicletype',
          nameAs: 'vehicletype',
          parentField: 'vehicle_type',
          childField: '_id',

         }]
        }
      }),
      populate({
        schema: {
         include: [{
          service: 'users',
          nameAs: 'users',
          parentField: 'default_driver',
          childField: '_id',

         }]
        }
      }),

      (ctx) => {
        const { result , data } = ctx
        result.data.map(x => x.insurance_expire = moment(x.insurance_expire).format('MMMM Do YYYY'))
        return Object.assign({},ctx,result)
      }

    ],
    find: [],
    get: [],
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
