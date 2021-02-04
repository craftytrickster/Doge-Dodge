'use strict';

import { BaseCharacter, getYDrawPoint } from './baseCharacter.js';
import { LEFT_BOUNDARY, RIGHT_BOUNDARY } from '../gameMaster.js';

export class PlayerCharacter extends BaseCharacter {
    constructor(keyMap) {
        super();

        this.posX = LEFT_BOUNDARY + RIGHT_BOUNDARY / 2;
        this.posY = 200;
        this.keyMap = keyMap;
    }

    update(dt) {
        if (this.keyMap.left && !this.keyMap.right) {
            this.velocityX = -390;
        }
        else if (this.keyMap.right && !this.keyMap.left) {
            this.velocityX = 390;
        }
        else {
            this.velocityX = 0;
        }

        if (this.keyMap.up && this.velocityY <= 0 && this._isAtOrBelowFloor()) {
            this.velocityY = 15;
        }

        super.update(dt);
    }

    paint(context) {
        if (dogeLoaded) {
            context.drawImage(
                // source parameters
                dogeImage, 0, 0, dogeImage.width, dogeImage.height,

                // destination parameters
                this.posX - this.width / 2, getYDrawPoint(this.posY) - this.height / 2, this.width, this.height);
        }
    }
}



// No need to instantiate image every time, we just need a global reference
const dogeImage = new Image();
dogeImage.src = 'src/characters/largeDoge.jpg';

let dogeLoaded = false;

dogeImage.onload = () => {
    dogeLoaded = true;
};
