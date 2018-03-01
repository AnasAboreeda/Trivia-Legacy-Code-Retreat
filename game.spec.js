/* globals Game */

var sinon = require('sinon');
require('mocha-sinon');

require('./game.js');

describe('The test environment', function() {
  it('should pass', function() {
    expect(true).toBe(true);
  });

  it('should access game', function() {
    expect(Game).toBeDefined();
  });
});

describe('Game Play', function() {

  beforeEach(function() {
    this.sinon.stub(console, 'log');
  });

  afterEach(function () {
    console.log.restore(); // Unwraps the spy
  });

  function addPlayers(n) {
    var output = [];
    var game = new Game();

    for (var i = 1; i < n + 1; i ++){
      var playerName = 'player' + i;
      var playerAddedStr = playerName + ' was added';
      var playerNoStr = 'They are player number ' + i;

      output.push([playerAddedStr]);
      output.push([playerNoStr]);
      game.add(playerName);
    }

    expect( console.log.callCount ).toBe(n * 2);
    expect(console.log.args.join()).toBe(output.join());
  }

  it('Should add one new Player', function(){
    addPlayers(1);
  });

  it('Should add 10 new Players', function(){
    addPlayers(10);
  });

  //Testing isPlayable
  it('Should be playable after adding two players', function(){
    var game = new Game();
    game.add('Anas');
    game.add('Tom');

    //FIXME: isPlayable needs to be refactored
    expect(game.isPlayable(game.howManyPlayers())).toBe(true);
  });

  it('Should not be playable after adding one player', function(){
    var game = new Game();
    game.add('Tom');

    //FIXME: isPlayable needs to be refactored
    expect(game.isPlayable(game.howManyPlayers())).toBe(false);
  });

});
