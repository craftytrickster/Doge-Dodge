'use strict';

import { FLOOR, CEILING, LEFT_BOUNDARY, RIGHT_BOUNDARY } from '../gameMaster.js';

export class BaseCharacter {
    constructor() {
        this.velocityX = 0;
        this.velocityY = 0;

        this.posX = 0;
        this.posY = CEILING; // ceiling
        this.width = 100;
        this.height = 100;

        this.health = 1;
        this.isDestroyed = false;
    }

    update(dt) {
        applyGravity(this, dt);

        const offsetX = this.velocityX * dt / 1000;
        this.posX += offsetX;
        this.posY += this.velocityY;

        // enforce boundaries
        if (this._isOutsideRightBoundary()) {
            this.posX = RIGHT_BOUNDARY - this.width / 2;
        }
        else if (this._isOutsideLeftBoundary()) {
            this.posX = LEFT_BOUNDARY + this.width / 2;
        }


        if (this.health <= 0) {
            this.isDestroyed = true;
        }
    }

    _isOutsideRightBoundary() {
        return (this.posX + this.width / 2 > RIGHT_BOUNDARY);
    }

    _isOutsideLeftBoundary() {
        return (this.posX - this.width / 2 < LEFT_BOUNDARY);
    }

    _isAtOrBelowFloor() {
        return (this.posY - this.height / 2 <= FLOOR);
    }

    paint(context) {
        context.beginPath();
        context.arc(this.posX, getYDrawPoint(this.posY), this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    }
}








// util function
function applyGravity(character, dt) {
    if (character._isAtOrBelowFloor()) {
        character.posY = FLOOR + character.height / 2;
        if (character.velocityY <= 0) {
            character.velocityY = 0;
        }
    }
    else {
        character.velocityY -= 25 * dt / 1000;
    }
}


export function getYDrawPoint(yPos) { // canvas Y coordinates are inverted
    return CEILING - yPos;
}
