const app = require('../../src/app');

describe('\'orderitem\' service', () => {
  it('registered the service', () => {
    const service = app.service('orderitem');
    expect(service).toBeTruthy();
  });
});
