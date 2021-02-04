'use strict';

export class AnimationControl {
    constructor() {
        this.curTime = 0;
        this.haltAnimation = true;
        this.subscribers = [];
    }

    startAnimation() {
        this.haltAnimation = false;
        this.curTime = 0;
        this.lastElapsed = 0;

        window.requestAnimationFrame(this.animate.bind(this));
    }

    endAnimation() {
        this.haltAnimation = true;
    }

    animate(timestamp) {
        if (this.haltAnimation === true) {
            return;
        }

        const lastElapsed = timestamp - this.curTime;
        this.curTime = timestamp;
        this.alertNewTick(lastElapsed);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    addSubscriber(subscriber) {
        this.subscribers.push(subscriber);
    }

    alertNewTick(tickDuration) {
        this.subscribers.forEach(function (subscriber) {
            subscriber.tick(tickDuration);
        });
    }
}
