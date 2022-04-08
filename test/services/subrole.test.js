const app = require('../../src/app');

describe('\'subrole\' service', () => {
  it('registered the service', () => {
    const service = app.service('subrole');
    expect(service).toBeTruthy();
  });
});
