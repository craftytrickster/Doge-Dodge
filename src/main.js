'use strict';

import { GameMaster } from './gameMaster.js';
import { createNewDogePhrase } from './characters/dogePhraseFactory.js';
import { PlayerCharacter } from './characters/playerCharacter.js';

const gameMaster = new GameMaster();
const player = new PlayerCharacter(gameMaster.keyMap);
gameMaster.gameObjects = [player, createNewDogePhrase()];
gameMaster.protagonist = player;

gameMaster.startGame();
