function BaseCharacter() {
  this.velocityX = 0;
  this.velocityY = 0;

  this.posX = 0;
  this.posY = CEILING; // ceiling
  this.width = 100;
  this.height = 100;

  this.health = 1;
  this.isDestroyed = false;
}

BaseCharacter.prototype.update = function(dt) {
  applyGravity(this, dt);

  var offsetX = this.velocityX * dt / 1000;
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
};

BaseCharacter.prototype._isOutsideRightBoundary = function() {
  return (this.posX + this.width / 2 > RIGHT_BOUNDARY);
}

BaseCharacter.prototype._isOutsideLeftBoundary = function() {
  return (this.posX - this.width / 2 < LEFT_BOUNDARY);
}

BaseCharacter.prototype._isAtOrBelowFloor = function() {
  return (this.posY - this.height / 2 <= FLOOR);
}


BaseCharacter.prototype.paint = function(context) {
  context.beginPath();
  context.arc(this.posX, getYDrawPoint(this.posY), this.radius, 0, Math.PI * 2, false);
  context.fill();
  context.closePath();
};


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


function getYDrawPoint(yPos) { // canvas Y coordinates are inverted
  return CEILING - yPos;
}
