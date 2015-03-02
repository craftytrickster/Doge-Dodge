

var gameMaster = new GameMaster();
var player = new PlayerCharacter(gameMaster.keyMap);
gameMaster.gameObjects = [player];
gameMaster.protagonist = player;

gameMaster.startGame();
