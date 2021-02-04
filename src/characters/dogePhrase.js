'use strict';

import { BaseCharacter, getYDrawPoint } from './baseCharacter.js';

export class DogePhrase extends BaseCharacter {
    constructor() {
        super();

        // DogePhrase will take advantage of an offscreen canvas in order to render initial data
        const context = getOffscreenContext();
        this.imageData = this._getRenderedImageData(context);

        this.width = this.imageData.width;
        this.height = this.imageData.height;
    }

    update(dt) {
        this.fallingStrategy(dt);
    }

    paint(context) {
        context.putImageData(this.imageData, this.posX - this.width / 2, getYDrawPoint(this.posY) - this.height / 2);
    }

    // instad of rendering text every single frame, we render once offscreen and then copy its image
    _getRenderedImageData(context) {
        // randomly chosen offsets to not be so close to border
        const offscreenX = 30;
        const offscreenY = 50;

        const randomFontSize = getRandomFontSize();
        const randomColor = getRandomColor();
        const randomPhrase = getRandomPhrase();

        context.save();

        context.font = randomFontSize + 'px Comic Sans MS';
        context.fillStyle = randomColor;
        context.fillText(randomPhrase, offscreenX, offscreenY);

        const renderedWidth = context.measureText(randomPhrase).width;
        const estimatedHeight = context.measureText('M').width;

        context.restore();

        // adding some slack since we only get estimated height :( with canvas api
        const imageData = context.getImageData(offscreenX, offscreenY - estimatedHeight / 2 - 15, renderedWidth, estimatedHeight + 15);
        context.clearRect(offscreenX, offscreenY - estimatedHeight / 2 - 15, renderedWidth, estimatedHeight + 15);
        return imageData;
    }
}


function getRandomPhrase() {
    const phrases = [
        'many fun',
        'such exciting',
        'very enjoyment',
        'many good',
        'much wow',
        'so quality',
        'much educational'
    ];

    const index = Math.floor(Math.random() * phrases.length);
    return phrases[index];
}

function getRandomColor() {
    const colors = [
        '#B809AC',
        '#FFEE00',
        '#00FF33',
        '#FF0000',
        '#00FBFF',
    ];

    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function getRandomFontSize() {
    return 20 + Math.random() * 30;
}

function getOffscreenContext() {
    return document.getElementById('offscreenCanvas').getContext('2d');
}
