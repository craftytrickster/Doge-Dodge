'use strict';

import { AnimationControl } from './animationControl.js';
import { createNewDogePhrase } from './characters/dogePhraseFactory.js';

export const CEILING = 480;
export const FLOOR = 20;
export const LEFT_BOUNDARY = 0;
export const RIGHT_BOUNDARY = 640;

export class GameMaster {
    constructor() {
        this.animator = new AnimationControl();
        this.animator.addSubscriber(this);

        this.context = document.getElementById('gameCanvas').getContext('2d');
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;

        this.keyMap = { left: false, right: false, up: false }; // represents user input
        this.protagonist = null;
        this.gameObjects = [];
        this.lastEnemyAdded = 0;

        const keyMap = this.keyMap;
        // initialize keyboard listener
        window.addEventListener('keydown', function (e) {
            processInput(e.code, true);
        });
        window.addEventListener('keyup', function (e) {
            processInput(e.code, false);
        });


        function processInput(keyCode, isPressed) {
            if (keyCode === 'ArrowLeft') {
                keyMap.left = isPressed;
            }
            else if (keyCode === 'ArrowRight') {
                keyMap.right = isPressed;
            }

            if (keyCode === 'ArrowUp') {
                keyMap.up = isPressed;
            }
        }
    }

    tick(dt) {
        this.gameObjects = this.gameObjects.filter(function (gameObject) {
            return !gameObject.isDestroyed; // only retain non obsolete objects
        });

        if (!this.protagonist || this.protagonist.isDestroyed) { // if protagonist is eliminated, game over!
            this.endGame();
            return;
        }

        this.manageEnemyPipeline(dt);

        // update all objects
        this.gameObjects.forEach(function (gameObject) {
            gameObject.update(dt);
        });

        const self = this;
        this.gameObjects.forEach(function (gameObject) {
            self.processObjectCollisions(self.protagonist, gameObject);
        });

        // after state is updated and determined, we can paint
        const context = this.context;
        context.clearRect(0, 0, this.width, this.height);

        this.gameObjects.forEach(function (gameObject) {
            gameObject.paint(context);
        });
    }

    manageEnemyPipeline(dt) {
        if (this.gameObjects.length >= 4) {
            return;
        }

        this.lastEnemyAdded += dt;
        if (this.lastEnemyAdded < 1000) {
            return;
        }

        this.gameObjects.push(createNewDogePhrase());
        this.lastEnemyAdded = 0;
    }

    startGame() {
        this.animator.startAnimation();
    }

    endGame() {
        this.animator.endAnimation();
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.font = '30px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText("Such sad...", 50, 100);
        this.context.fillText("... much collision detected.", 65, 150);

        this.context.font = '50px Arial';
        this.context.fillText("Game over!", 150, 300);
    }

    processObjectCollisions(object1, object2) {
        if (object1 === object2) {
            return;
        }

        if (collisionDetected(object1, object2)) {
            object1.health -= 1;
            object2.health -= 1;
        }

        function isValueInRange(value, min, max) {
            return value >= min && value <= max;
        }

        function collisionDetected(object1, object2) {
            const object1Left = object1.posX - object1.width / 2;
            const object1Right = object1.posX + object1.width / 2;
            const object1Up = object1.posY + object1.height / 2;
            const object1Down = object1.posY - object1.height / 2;

            const object2Left = object2.posX - object2.width / 2;
            const object2Right = object2.posX + object2.width / 2;
            const object2Up = object2.posY + object2.height / 2;
            const object2Down = object2.posY - object2.height / 2;


            const xOverlap = isValueInRange(object1Left, object2Left, object2Right) ||
                isValueInRange(object1Right, object2Left, object2Right) ||
                isValueInRange(object2Left, object1Left, object1Right) ||
                isValueInRange(object2Right, object1Left, object1Right);

            const yOverlap = isValueInRange(object1Down, object2Down, object2Up) ||
                isValueInRange(object1Up, object2Down, object2Up) ||
                isValueInRange(object2Down, object1Down, object1Up) ||
                isValueInRange(object2Up, object1Down, object1Up);

            return xOverlap && yOverlap;
        }

    }
}








