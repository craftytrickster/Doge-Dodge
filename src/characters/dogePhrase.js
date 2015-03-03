function DogePhrase() {
  BaseCharacter.call(this);

  // DogePhrase will take advantage of an offscreen canvas in order to render initial data
  var context = getOffscreenContext();
  this.imageData = this._getRenderedImageData(context);

  this.width = this.imageData.width;
  this.height = this.imageData.height;
}


DogePhrase.prototype = Object.create(BaseCharacter.prototype);
DogePhrase.prototype.constructor = DogePhrase;

DogePhrase.prototype.update = function(dt) {
  this.fallingStrategy(dt);
};


DogePhrase.prototype.paint = function(context) {
  context.putImageData(this.imageData, this.posX - this.width / 2 , getYDrawPoint(this.posY) - this.height / 2);
};

// instad of rendering text every single frame, we render once offscreen and then copy its image
DogePhrase.prototype._getRenderedImageData = function(context) {
  // randomly chosen offsets to not be so close to border
  var offscreenX = 30;
  var offscreenY = 50;

  var randomFontSize = getRandomFontSize();
  var randomColor = getRandomColor();
  var randomPhrase = getRandomPhrase();

  context.save();

  context.font = randomFontSize + 'px Comic Sans MS';
  context.fillStyle = randomColor;
  context.fillText(randomPhrase, offscreenX, offscreenY);

  var renderedWidth = context.measureText(randomPhrase).width;
  var estimatedHeight = context.measureText('M').width;

  context.restore();

  // adding some slack since we only get estimated height :( with canvas api
  return context.getImageData(offscreenX, offscreenY - estimatedHeight / 2 - 15, renderedWidth, estimatedHeight + 15);
};




function getRandomPhrase() {
  var phrases = [
    'many fun',
    'such exciting',
    'very enjoyment',
    'many good',
    'much wow',
    'so quality',
    'much educational'
  ];

  var index = Math.floor(Math.random() * phrases.length);
  return phrases[index];
}

function getRandomColor() {
  var colors = [
    '#B809AC',
    '#FFEE00',
    '#00FF33',
    '#FF0000',
    '#00FBFF',
  ];

  var index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function getRandomFontSize() {
  return 20 + Math.random() * 30;
}

function getOffscreenContext() {
  return document.getElementById('offscreenCanvas').getContext('2d');
}
