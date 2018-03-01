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

  // Testing: add
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

  // Testing: isPlayable
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

  // Testing: roll
  it('Should be able to roll the dice', function(){
    var game = new Game();
    var dice = Math.floor(Math.random()*6) + 1;
    var expectedOutput = [ [ 'Tom was added' ],
    [ 'They are player number 1' ],
    [ 'Dan was added' ],
    [ 'They are player number 2' ],
    [ 'Tom is the current player' ],
    [ 'They have rolled a ' + dice ],
    [ 'Tom\'s new location is ' + dice ],
    [ 'The category is Rock' ],
    [ 'Rock Question 0' ] ];

    game.add('Tom');
    game.add('Dan');

    game.roll(dice);

    expect(console.log.args.join(), expectedOutput.join());
  });

});
