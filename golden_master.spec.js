var fs = require('fs');
var seedrandom = require('seedrandom');
var play = './golden_master_generator.js';
var spawn = require('child_process').spawn;
var goldenMasterPath = './golden_master_original';

function generateGoldenMaster(folderPath) {
  var maxPlayers = 5;
  var maxSeed = 20;

  for (var j = 3; j < maxPlayers + 1; j += 1) {
    for (var i = 1; i < maxSeed + 1; i++) {
        var randomNo = seedrandom(i)();
        var diceRoll = Math.floor(randomNo * 6) + 1;
        var filePath = folderPath + '/players_' + j + '_diceSeed_' + i + '.txt';
        var goldenMaster = fs.createWriteStream(filePath);

        console.info('j', j, 'i', i, 'randomNo', randomNo, 'diceRoll', diceRoll, 'filePath', filePath);

        var gMaster = spawn('node', [play, j, diceRoll]);

        gMaster.stdout.pipe(goldenMaster);

        gMaster.stderr.on('data', function(data) {
          console.debug('stderr: ' + data);
        });

        gMaster.on('close', function(code) {
          console.debug('child process exited with code ' + code);

          gMaster.stdout.on('close', function(){
            gMaster.exit();
          });
        });
    }
  }
}

describe('The test environment', function () {
  it('should generate the original golden master if does not exist yet', function () {
    var goldenMasterFolder = fs.readdirSync(goldenMasterPath);

    if (goldenMasterFolder.length < 3) {
      generateGoldenMaster('golden_master_original');
    }
  });
});
