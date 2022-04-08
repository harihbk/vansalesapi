const app = require('../../src/app');

describe('\'truck\' service', () => {
  it('registered the service', () => {
    const service = app.service('truck');
    expect(service).toBeTruthy();
  });
});
