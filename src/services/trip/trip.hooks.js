const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate12 } = require('feathers-hooks-common');
var  populate  = require('feathers-populate-hook');



module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
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
