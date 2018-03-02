function play (playersCount, diceRoll, randomNo){
  require('./game.js');

  var notAWinner = false;

  var game = new Game();

  // Add new players
  for (var i = 0; i < playersCount; i += 1) {
    var playerName = 'player_' + i;
    game.add(playerName);
  }

  do{
    game.roll(diceRoll);

    if(Math.floor(randomNo * 10) === 7){
      notAWinner = game.wrongAnswer();
    }else{
      notAWinner = game.wasCorrectlyAnswered();
    }

  }while(notAWinner);
  process.exit();
}

var args = process.argv;
play(args[2], args[3], args[4]);
