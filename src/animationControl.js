export function AnimationControl() {
  this.curTime = 0;
  this.haltAnimation = true;
  this.subscribers = [];
}

{
  AnimationControl.prototype.startAnimation = function() {
    this.haltAnimation = false;
    this.curTime = 0;
    this.lastElapsed = 0;

    window.requestAnimationFrame(this.animate.bind(this));
  };

  AnimationControl.prototype.endAnimation = function() {
    this.haltAnimation = true;
  };

  AnimationControl.prototype.animate = function(timestamp) {
    if (this.haltAnimation === true) {
      return;
    }

    var lastElapsed = timestamp - this.curTime;
    this.curTime = timestamp;
    this.alertNewTick(lastElapsed);

    window.requestAnimationFrame(this.animate.bind(this));
  };

  AnimationControl.prototype.addSubscriber = function(subscriber) {
    this.subscribers.push(subscriber);
  };

  AnimationControl.prototype.alertNewTick = function(tickDuration) {
    this.subscribers.forEach(function(subscriber) {
      subscriber.tick(tickDuration);
    });
  };

}