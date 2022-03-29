const app = require('../../src/app');

describe('\'trip\' service', () => {
  it('registered the service', () => {
    const service = app.service('trip');
    expect(service).toBeTruthy();
  });
});
