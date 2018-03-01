var sinon = require('sinon');
require('mocha-sinon');

require('./game.js');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("Your specs...", function() {
  // it ...
});
