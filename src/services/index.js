const users = require('./users/users.service.js');
const role = require('./role/role.service.js');
const subrole = require('./subrole/subrole.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(role);
  app.configure(subrole);
};
 