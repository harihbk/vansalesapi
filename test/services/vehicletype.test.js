const app = require('../../src/app');

describe('\'vehicletype\' service', () => {
  it('registered the service', () => {
    const service = app.service('vehicletype');
    expect(service).toBeTruthy();
  });
});
