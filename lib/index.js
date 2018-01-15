'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AVAILABLE_LAYOUTS = ['confetti', 'grid', 'snake'];

var AVAILABLE_SNAKE_DIRECTIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOP_RIGHT: 'top_right',
  BOTTOM_RIGHT: 'bottom_right',
  BOTTOM_LEFT: 'bottom_left',
  TOP_LEFT: 'top_left'
};

var AVAILABLE_MIX_BLEND_MODES = ['darken', 'lighten', 'multiply', 'screen', 'overlay'];

var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
};

var makeNumberRandomlyNegative = function makeNumberRandomlyNegative(number) {
  if (Math.random() < 0.5) return -number;
  return number;
};

var SNAKE_ANGLE = getRandomNumber(10, 50);

var CIRCLE_DIAMETER = getRandomNumber(20, 50);
var CIRCLE_DIAMETER_MAX = getRandomNumber(20, 50);
var IS_CIRCLE_DIAMETER_MAX_RANDOM_PER_DIRECTION = Math.random() < 0.5;

var IS_CIRCLE_DIAMETER_RANDOM_PER_CIRCLE = Math.random() < 0.5;

var getCircleDiameter = function getCircleDiameter() {
  if (IS_CIRCLE_DIAMETER_RANDOM_PER_CIRCLE) {
    return getRandomNumber(20, IS_CIRCLE_DIAMETER_MAX_RANDOM_PER_DIRECTION ? getRandomNumber(20, 50) : CIRCLE_DIAMETER_MAX);
  };
  return CIRCLE_DIAMETER;
};

var IS_SNAKE_ANGLE_RANDOM_PER_DIRECTION = Math.random() < 0.5;
var IS_SNAKE_ANGLE_MAX_RANDOM_PER_DIRECTION = Math.random() < 0.5;

var SNAKE_ANGLE_MAX = getRandomNumber(10, 50);

var getSnakeAngle = function getSnakeAngle() {
  if (IS_SNAKE_ANGLE_RANDOM_PER_DIRECTION) {
    return getRandomNumber(10, IS_SNAKE_ANGLE_MAX_RANDOM_PER_DIRECTION ? getRandomNumber(10, 50) : SNAKE_ANGLE_MAX);
  };

  return SNAKE_ANGLE;
};

var makeDirectionIncrements = function makeDirectionIncrements() {
  var _ref;

  console.log('makeDirectionIncrements()');
  return _ref = {}, _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.TOP, {
    top: getSnakeAngle(),
    left: 0
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.RIGHT, {
    top: 0,
    left: getSnakeAngle()
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.BOTTOM, {
    top: -getSnakeAngle(),
    left: 0
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.LEFT, {
    top: 0,
    left: getSnakeAngle()
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.TOP_RIGHT, {
    top: -getSnakeAngle(),
    left: getSnakeAngle()
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.BOTTOM_RIGHT, {
    top: getSnakeAngle(),
    left: getSnakeAngle()
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.BOTTOM_LEFT, {
    top: getSnakeAngle(),
    left: -getSnakeAngle()
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.TOP_LEFT, {
    top: -getSnakeAngle(),
    left: -getSnakeAngle()
  }), _ref;
};

var DIRECTION_INCREMENTS = makeDirectionIncrements();

var isSquare = function isSquare(n) {
  return n > 0 && Math.sqrt(n) % 1 === 0;
};

var getRandomSquareNumber = function getRandomSquareNumber(min, max) {
  var number = getRandomNumber(min, max);

  if (isSquare(number)) {
    return number;
  } else {
    return getRandomSquareNumber(min, max);
  }
};

var TOTAL_CIRCLES = void 0;

var LAYOUT = AVAILABLE_LAYOUTS[getRandomNumber(0, AVAILABLE_LAYOUTS.length)];

if (LAYOUT === 'grid') {
  TOTAL_CIRCLES = getRandomSquareNumber(50, 500);
} else {
  TOTAL_CIRCLES = getRandomNumber(50, 500);
}

var getRandomRgbColour = function getRandomRgbColour() {
  return 'rgb(' + getRandomNumber(0, 255) + ', ' + getRandomNumber(0, 255) + ', ' + getRandomNumber(0, 255) + ')';
};

var IS_CIRCLE_COLOR_INCREMENTAL = Math.random() < 0.5;
var IS_CIRCLE_R_VALUE_INCREMENTAL = void 0;
var IS_CIRCLE_G_VALUE_INCREMENTAL = void 0;
var IS_CIRCLE_B_VALUE_INCREMENTAL = void 0;

if (IS_CIRCLE_COLOR_INCREMENTAL) {
  IS_CIRCLE_R_VALUE_INCREMENTAL = Math.random() < 0.5;
  IS_CIRCLE_G_VALUE_INCREMENTAL = Math.random() < 0.5;
  IS_CIRCLE_B_VALUE_INCREMENTAL = Math.random() < 0.5;

  if (!IS_CIRCLE_R_VALUE_INCREMENTAL && !IS_CIRCLE_G_VALUE_INCREMENTAL && !IS_CIRCLE_B_VALUE_INCREMENTAL) {
    IS_CIRCLE_COLOR_INCREMENTAL = false;
  }
}

var colors = void 0;
var rValue = void 0;
var gValue = void 0;
var bValue = void 0;

var MIN_COLORS_TOTAL = 3;

if (IS_CIRCLE_COLOR_INCREMENTAL) {
  colors = [].concat(_toConsumableArray(Array(getRandomNumber(MIN_COLORS_TOTAL, 50)))).map(function () {
    if (!rValue || rValue > 255 || rValue < 0) rValue = getRandomNumber(0, 255);
    if (!gValue || gValue > 255 || gValue < 0) gValue = getRandomNumber(0, 255);
    if (!bValue || bValue > 255 || bValue < 0) bValue = getRandomNumber(0, 255);

    var color = 'rgb(' + rValue + ', ' + gValue + ', ' + bValue + ')';

    if (IS_CIRCLE_R_VALUE_INCREMENTAL) rValue = rValue + makeNumberRandomlyNegative(getRandomNumber(5, 50));
    if (IS_CIRCLE_G_VALUE_INCREMENTAL) gValue = gValue + makeNumberRandomlyNegative(getRandomNumber(5, 50));
    if (IS_CIRCLE_B_VALUE_INCREMENTAL) bValue = bValue + makeNumberRandomlyNegative(getRandomNumber(5, 50));

    return color;
  });
} else {
  colors = [].concat(_toConsumableArray(Array(getRandomNumber(MIN_COLORS_TOTAL, 50)))).map(function () {
    return getRandomRgbColour();
  });
}

document.body.style.backgroundColor = getRandomRgbColour();
document.getElementById('colour-layer').style.backgroundColor = getRandomRgbColour();
document.getElementById('lighten-layer').style.backgroundColor = getRandomRgbColour();

var createCircle = void 0;

var IS_MARKMAKING_PRESENT = Math.random() < 0.5;
var IS_CIRCLE_MIX_BLEND_MODE_RANDOM = Math.random() < 0.5;

if (LAYOUT === 'confetti') {
  createCircle = function createCircle() {
    var circle = document.createElement('div');
    var diameter = getCircleDiameter();

    circle.style.width = diameter + 'px';
    circle.style.height = diameter + 'px';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = getRandomNumber(0, window.innerHeight) + 'px';
    circle.style.left = getRandomNumber(0, window.innerWidth) + 'px';
    circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)];

    if (IS_MARKMAKING_PRESENT) {
      circle.style.backgroundImage = 'url(\'./line' + getRandomNumber(1, 3) + '.jpg\')';
      circle.style.backgroundSize = '100% 100%';
      circle.style.backgroundBlendMode = 'multiply';
      circle.style.transform = 'rotate(' + getRandomNumber(0, 360) + 'deg)';
    }

    if (IS_CIRCLE_MIX_BLEND_MODE_RANDOM) {
      circle.style.mixBlendMode = AVAILABLE_MIX_BLEND_MODES[getRandomNumber(0, AVAILABLE_MIX_BLEND_MODES.length)];
    }

    return circle;
  };

  var circles = [].concat(_toConsumableArray(Array(TOTAL_CIRCLES))).map(function () {
    return createCircle();
  });

  circles.map(function (circle) {
    document.body.appendChild(circle);
  });
} else if (LAYOUT === 'grid') {
  var width = window.innerWidth / Math.sqrt(TOTAL_CIRCLES);
  var height = window.innerHeight / Math.sqrt(TOTAL_CIRCLES);
  var color = void 0;

  var IS_RANDOM_OFFSET_PER_CIRCLE = Math.random() < 0.5;

  createCircle = function createCircle() {
    var circleContainer = document.createElement('div');
    var circle = document.createElement('div');

    circleContainer.style.width = width + 'px';
    circleContainer.style.height = height + 'px';
    circleContainer.style.display = 'flex';
    circleContainer.style.justifyContent = 'center';
    circleContainer.style.alignItems = 'center';

    if (IS_RANDOM_OFFSET_PER_CIRCLE) {
      circle.style.position = 'relative';
      circle.style.top = makeNumberRandomlyNegative(getRandomNumber(1, 6)) + 'px';
      circle.style.left = makeNumberRandomlyNegative(getRandomNumber(1, 6)) + 'px';
    }

    var diameter = getCircleDiameter();

    circle.style.width = diameter + 'px';
    circle.style.height = diameter + 'px';
    circle.style.flex = 'none';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)];

    if (IS_MARKMAKING_PRESENT) {
      circle.style.backgroundImage = 'url(\'./line' + getRandomNumber(1, 3) + '.jpg\')';
      circle.style.backgroundSize = '100% 100%';
      circle.style.backgroundBlendMode = 'multiply';
      circle.style.transform = 'rotate(' + getRandomNumber(0, 360) + 'deg)';
    }

    if (IS_CIRCLE_MIX_BLEND_MODE_RANDOM) {
      circle.style.mixBlendMode = AVAILABLE_MIX_BLEND_MODES[getRandomNumber(0, AVAILABLE_MIX_BLEND_MODES.length)];
    }

    circleContainer.appendChild(circle);

    return circleContainer;
  };

  var _circles = [].concat(_toConsumableArray(Array(TOTAL_CIRCLES))).map(function () {
    return createCircle();
  });

  _circles.map(function (circle) {
    document.body.appendChild(circle);
  });
} else if (LAYOUT === 'snake') {

  var IS_DIRECTION_DIFFERENT_PER_CIRCLE = Math.random() < 0.5;
  var IS_DIRECTION_DIFFERENT_ON_RESET = Math.random() < 0.5;
  var IS_DIRECTION_INCREMENTS_DIFFERENT_PER_CIRCLE = Math.random() < 0.5;
  var IS_DIRECTION_INCREMENTS_DIFFERENT_ON_RESET = Math.random() < 0.5;

  var SNAKE_DIRECTION = void 0;
  SNAKE_DIRECTION = AVAILABLE_SNAKE_DIRECTIONS[Object.keys(AVAILABLE_SNAKE_DIRECTIONS)[getRandomNumber(0, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length)]];

  var topValue = void 0;
  var leftValue = void 0;

  createCircle = function createCircle() {
    if (!topValue) topValue = getRandomNumber(0, window.innerHeight);
    if (!leftValue) leftValue = getRandomNumber(0, window.innerWidth);

    var circle = document.createElement('div');
    var diameter = getCircleDiameter();

    circle.style.width = diameter + 'px';
    circle.style.height = diameter + 'px';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = topValue + 'px';
    circle.style.left = leftValue + 'px';
    circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)];

    if (IS_MARKMAKING_PRESENT) {
      circle.style.backgroundImage = 'url(\'./line' + getRandomNumber(1, 3) + '.jpg\')';
      circle.style.backgroundSize = '100% 100%';
      circle.style.backgroundBlendMode = 'multiply';
      circle.style.transform = 'rotate(' + getRandomNumber(0, 360) + 'deg)';
    }

    if (IS_CIRCLE_MIX_BLEND_MODE_RANDOM) {
      circle.style.mixBlendMode = AVAILABLE_MIX_BLEND_MODES[getRandomNumber(0, AVAILABLE_MIX_BLEND_MODES.length)];
    }

    // if it hits the window edges in any location, find a new random starting point for everything
    if (topValue > window.innerHeight || topValue < 0 || leftValue > window.innerWidth || leftValue < 0) {
      topValue = getRandomNumber(0, window.innerHeight);
      leftValue = getRandomNumber(0, window.innerWidth);

      if (IS_DIRECTION_DIFFERENT_ON_RESET) {
        SNAKE_DIRECTION = AVAILABLE_SNAKE_DIRECTIONS[Object.keys(AVAILABLE_SNAKE_DIRECTIONS)[getRandomNumber(0, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length)]];
      }

      if (IS_DIRECTION_INCREMENTS_DIFFERENT_ON_RESET) {
        DIRECTION_INCREMENTS = makeDirectionIncrements();
      }
    };

    if (IS_DIRECTION_DIFFERENT_PER_CIRCLE) {
      SNAKE_DIRECTION = AVAILABLE_SNAKE_DIRECTIONS[Object.keys(AVAILABLE_SNAKE_DIRECTIONS)[getRandomNumber(0, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length)]];
    }

    if (IS_DIRECTION_INCREMENTS_DIFFERENT_PER_CIRCLE) {
      DIRECTION_INCREMENTS = makeDirectionIncrements();
    }

    topValue = topValue + DIRECTION_INCREMENTS[SNAKE_DIRECTION].top;
    leftValue = leftValue + DIRECTION_INCREMENTS[SNAKE_DIRECTION].left;

    return circle;
  };

  var _circles2 = [].concat(_toConsumableArray(Array(TOTAL_CIRCLES))).map(function () {
    return createCircle();
  });

  _circles2.map(function (circle) {
    document.body.appendChild(circle);
  });
}