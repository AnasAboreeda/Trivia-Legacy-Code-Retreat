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

describe("Game Play", function() {

  beforeEach(function() {
    this.sinon.stub(console, 'log');
  });

  afterEach(function () {
    console.log.restore(); // Unwraps the spy
});

  it("Should add one new Player", function(){
    var playerName = "Anas";

    var game = new Game();
    game.add(playerName);

    expect( console.log.calledTwice ).toBe(true);
    expect(console.log.args[0][0]).toBe('Anas was added');
    expect(console.log.args[1][0]).toBe('They are player number 1');
  });
});
