function play (playersCount, diceRoll){
  require('./game.js');

  var notAWinner = false;

  var game = new Game();

  // Add new players
  for (var i = 0; i < playersCount; i += 1) {
    var playerName = 'player_' + i;
    game.add(playerName);
  }

  do{
    game.roll(diceRoll || Math.floor(Math.random()*6) + 1);

    if(Math.floor(Math.random()*10) === 7){
      notAWinner = game.wrongAnswer();
    }else{
      notAWinner = game.wasCorrectlyAnswered();
    }

  }while(notAWinner);
  process.exit();
}

var args = process.argv;
play(args[2], args[3]);
