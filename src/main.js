import { GameMaster } from './gameMaster.js';
import { createNewDogePhrase } from './characters/dogePhraseFactory.js';
import { PlayerCharacter } from './characters/playerCharacter.js';

var gameMaster = new GameMaster();
var player = new PlayerCharacter(gameMaster.keyMap);
gameMaster.gameObjects = [player, createNewDogePhrase()];
gameMaster.protagonist = player;

gameMaster.startGame();
