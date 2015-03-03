

var gameMaster = new GameMaster();
var player = new PlayerCharacter(gameMaster.keyMap);
gameMaster.gameObjects = [player, new DogePhrase()];
gameMaster.protagonist = player;

gameMaster.startGame();
