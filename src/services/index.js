const users = require('./users/users.service.js');
const role = require('./role/role.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(role);
};
 