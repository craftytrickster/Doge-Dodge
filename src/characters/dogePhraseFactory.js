function createNewDogePhrase() {
  var dogePhrase = null;
  var random = Math.random();

  if (Math.random() >= 0.5) {
    dogePhrase = createVerticalDoge();
  }

  else { // creating horizontal doge
    if (Math.random() >= 0.5) {
      dogePhrase = createRightDoge();
    }
    else {
      dogePhrase = createLeftDoge();
    }
  }

  return dogePhrase;
}

function createVerticalDoge() {
  var dogePhrase = new DogePhrase();

    dogePhrase.posY = CEILING;
    dogePhrase.posX =
    (LEFT_BOUNDARY + dogePhrase.width / 2) +
    ( Math.random() * (RIGHT_BOUNDARY - dogePhrase.width - LEFT_BOUNDARY));

    dogePhrase.fallingStrategy = verticalFaller;
    dogePhrase.velocityY = - 125 - Math.random() * 20;

    return dogePhrase;
}

function createRightDoge() {
  var dogePhrase = new DogePhrase();

  dogePhrase.velocityX = 200 + Math.random() * 50;
  dogePhrase.fallingStrategy = rightScroller;
  dogePhrase.posX = LEFT_BOUNDARY;

  dogePhrase.posY = Math.min(FLOOR + dogePhrase.width / 2 + Math.random() * CEILING, CEILING - 50);

  return dogePhrase;
}


function createLeftDoge() {
  var dogePhrase = new DogePhrase();

  dogePhrase.velocityX = -200 - Math.random() * 50;
  dogePhrase.fallingStrategy = leftScroller;
  dogePhrase.posX = RIGHT_BOUNDARY;

  dogePhrase.posY = Math.min(FLOOR + dogePhrase.width / 2 + Math.random() * CEILING, CEILING - 50);

  return dogePhrase;
}



function verticalFaller(dt) {
  this.posY += this.velocityY * dt / 1000;

  if (this._isAtOrBelowFloor()) {
    this.isDestroyed = true;
  }
}


function rightScroller(dt) {
  this.posX += this.velocityX * dt / 1000;

  if (this.velocityX >= 0 && this._isOutsideRightBoundary()) {
      this.isDestroyed = true;
  }
}

function leftScroller(dt) {
  this.posX += this.velocityX * dt / 1000;

  if (this.velocityX < 0 && this._isOutsideLeftBoundary()) {
      this.isDestroyed = true;
  }
}
