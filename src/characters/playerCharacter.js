function PlayerCharacter(keyMap) {
  BaseCharacter.call(this);
  this.posX = LEFT_BOUNDARY + RIGHT_BOUNDARY / 2;
  this.posY = 200;
  this.keyMap = keyMap;
}

PlayerCharacter.prototype = Object.create(BaseCharacter.prototype);
PlayerCharacter.prototype.constructor = PlayerCharacter;

PlayerCharacter.prototype.update = function(dt) {
  if (this.keyMap.left && !this.keyMap.right) {
    this.velocityX = - 240;
  }
  else if (this.keyMap.right && !this.keyMap.left) {
    this.velocityX = 240;
  }
  else {
    this.velocityX = 0;
  }

  BaseCharacter.prototype.update.call(this, dt);
};

PlayerCharacter.prototype.paint = function(context) {
  if (dogeLoaded) {
    context.drawImage(
      // source parameters
      dogeImage, 0, 0, dogeImage.width, dogeImage.height,

      // destination parameters
      this.posX - this.width / 2, getYDrawPoint(this.posY) - this.height / 2, this.width, this.height);
  }
}


// No need to instantiate image every time, we just need a global reference
var dogeImage = new Image();
dogeImage.src = 'src/characters/largeDoge.jpg';
var dogeLoaded = false;
dogeImage.onload = function() {
  dogeLoaded = true;
};
