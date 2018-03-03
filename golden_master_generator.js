function play(playersCount, diceRoll, randomNo) {
  require('./game.js');

  var notAWinner = false;

  var game = new Game();

  game.play(playersCount, diceRoll, randomNo);
  process.exit();
}

var args = process.argv;
play(args[2], args[3], args[4]);
