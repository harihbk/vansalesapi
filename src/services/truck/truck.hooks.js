const { authenticate } = require('@feathersjs/authentication').hooks;
const addVirtual = require('feathers-virtual-attribute-hook')
const { populate } = require('feathers-hooks-common');
const dauria = require('dauria');




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
          service: 'users',
          nameAs: 'users',
          parentField: 'users',
          childField: '_id',

         }]
        }
      })
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
