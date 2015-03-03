var CEILING = 480;
var FLOOR = 20;
var LEFT_BOUNDARY = 0;
var RIGHT_BOUNDARY = 640;

function GameMaster() {
  this.animator = new AnimationControl();
  this.animator.addSubscriber(this);

  this.context = document.getElementById('gameCanvas').getContext('2d');
  this.width = this.context.canvas.width;
  this.height = this.context.canvas.height;

  this.keyMap = { left: false, right: false, up: false }; // represents user input
  this.protagonist = null;
  this.gameObjects = [];

  var keyMap = this.keyMap;
  // initialize keyboard listener
  window.addEventListener('keydown', function (e) {
    processInput(e.keyCode, true);
  });
  window.addEventListener('keyup', function (e) {
    processInput(e.keyCode, false);
  });


  function processInput(keyCode, isPressed) {
    if (keyCode === 37) {
      keyMap.left = isPressed;
    }
    else if (keyCode === 39) {
      keyMap.right = isPressed;
    }

    if (keyCode === 38) {
      keyMap.up = isPressed;
    }
  }
}


GameMaster.prototype.tick = function(dt) {
  this.gameObjects = this.gameObjects.filter(function(gameObject) {
    return !gameObject.isDestroyed; // only retain non obsolete objects
  });

  if (!this.protagonist || this.protagonist.isDestroyed) { // if protagonist is eliminated, game over!
    this.endGame();
    return;
  }

  // update all objects
  this.gameObjects.forEach(function(gameObject) {
    gameObject.update(dt);
  });

  // after state is updated and determined, we can paint
  var context = this.context;
  context.clearRect(0, 0, this.width, this.height);

  this.gameObjects.forEach(function(gameObject) {
    gameObject.paint(context);
  });
};

GameMaster.prototype.startGame = function() {
  this.animator.startAnimation();
};

GameMaster.prototype.endGame = function() {
  this.animator.endAnimation();
  alert("Game over!");
};
