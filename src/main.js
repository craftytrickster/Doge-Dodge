

var gameMaster = new GameMaster();
var player = new PlayerCharacter(gameMaster.keyMap);
gameMaster.gameObjects = [player, createNewDogePhrase()];
gameMaster.protagonist = player;

gameMaster.startGame();
