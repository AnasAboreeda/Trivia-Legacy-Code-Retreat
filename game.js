exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
  var players = [];
  var places = [];
  var purses = [];
  var inPenaltyBox = [];

  var popQuestions = [];
  var scienceQuestions = [];
  var sportsQuestions = [];
  var rockQuestions = [];

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function() {
    return (purses[currentPlayer] !== 6);
  };

  var currentCategory = function() {
    var popPos = [0, 4, 8];
    var sciencePos = [1, 5, 9];
    var sportsPos = [2, 6, 10];
    var PlayerPos = parseInt(places[currentPlayer]);

    if (popPos.indexOf(PlayerPos) > -1) { return "Pop"; }
    if (sciencePos.indexOf(PlayerPos) > -1) { return "Science"; }
    if (sportsPos.indexOf(PlayerPos) > -1) { return "Sports"; }

    return "Rock";
  };

  // This will enable us to add question whenever the question bank is empty
  this.createQuestion = function(index, category) {
    return category.trim() + " Question " + index;
  };

  /*
    Keeping this function even if it's a duplicate because it existed as an
    interface from the begging
    So may be there is another client using it.
   */
  this.createRockQuestion = function(index) {
    return this.createQuestion(index, "Rock");
  };

  for (var i = 0; i < 50; i++) {
    popQuestions.push(this.createQuestion(i, "Pop"));
    scienceQuestions.push(this.createQuestion(i, "Science"));
    sportsQuestions.push(this.createQuestion(i, "Sports"));
    rockQuestions.push(this.createQuestion(i, "Rock"));
  }

  this.isPlayable = function(howManyPlayers) {
    if (!howManyPlayers) {
      return this.howManyPlayers >= 2;
    }
    return howManyPlayers >= 2;
  };

  this.add = function(playerName) {
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function() {
    return players.length;
  };

  var askQuestion = function() {
    var category = currentCategory();
    switch (category) {
      case "Pop":
        if (popQuestions.length === 0) {
          this.createQuestion(0, "Pop");
        }
        console.log(popQuestions.shift());
        break;

      case "Science":
        if (scienceQuestions.length === 0) {
          this.createQuestion(0, "Science");
        }
        console.log(scienceQuestions.shift());
        break;

      case "Sports":
        if (sportsQuestions.length === 0) {
          this.createQuestion(0, "Sports");
        }
        console.log(sportsQuestions.shift());
        break;

      case "Rock":
        if (rockQuestions.length === 0) {
          this.createQuestion(0, "Rock");
        }
        console.log(rockQuestions.shift());
        break;

      default:
        console.error("Could not find a question for the current category");
    }
  };

  this.roll = function(roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 !== 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");

        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());

        askQuestion();
      } else {
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      places[currentPlayer] = places[currentPlayer] + roll;

      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  var correctAnswer = function() {
    console.log("Answer was correct!!!!");
    purses[currentPlayer] += 1;
    console.log(players[currentPlayer] + " now has " + purses[currentPlayer] + " Gold Coins.");

    var winner = didPlayerWin();
    currentPlayer += 1;
    if (currentPlayer === players.length) { currentPlayer = 0; }

    return winner;
  };

  this.wasCorrectlyAnswered = function() {
    if (inPenaltyBox[currentPlayer] && !isGettingOutOfPenaltyBox) {
        currentPlayer += 1;
        if (currentPlayer === players.length) { currentPlayer = 0; }
        return true;
    } else {
      return correctAnswer();
    }
  };

  this.wrongAnswer = function() {
    console.log("Question was incorrectly answered");
    console.log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer === players.length) { currentPlayer = 0; }
    return true;
  };

  this.play = function(playersCount, diceRoll, randomNo) {

    var notAWinner = false;

    // Add new players
    for (var i = 0; i < playersCount; i += 1) {
      var playerName = "player_" + i;
      this.add(playerName);
    }

    do {
      this.roll(diceRoll);

      if (Math.floor(randomNo * 10) === 7) {
        notAWinner = this.wrongAnswer();
      } else {
        notAWinner = this.wasCorrectlyAnswered();
      }

    } while (notAWinner);
  };
};
