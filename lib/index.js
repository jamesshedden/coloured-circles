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

var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var isSquare = function isSquare(n) {
  return n > 0 && Math.sqrt(n) % 1 === 0;
};

var getRandomSquareNumber = function getRandomSquareNumber(min, max) {
  var number = getRandomNumber(min, max);
  return isSquare(number) ? number : getRandomSquareNumber(min, max);
};

var randomTrueOrFalse = function randomTrueOrFalse() {
  return Math.random() < 0.5;
};

var makeNumberRandomlyNegative = function makeNumberRandomlyNegative(number) {
  if (randomTrueOrFalse()) return -number;
  return number;
};

var getRandomSnakeAngle = function getRandomSnakeAngle(isSnakeAngleMaxRandomPerDirection, snakeAngleMax) {
  return getRandomNumber(10, isSnakeAngleMaxRandomPerDirection ? getRandomNumber(10, 50) : snakeAngleMax);
};

var makeDirectionIncrements = function makeDirectionIncrements(snakeAngle, isSnakeAngleRandomPerDirection, snakeAngleMax) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.TOP, {
    top: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: 0
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.RIGHT, {
    top: 0,
    left: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax)
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.BOTTOM, {
    top: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: 0
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.LEFT, {
    top: 0,
    left: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax)
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.TOP_RIGHT, {
    top: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax)
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.BOTTOM_RIGHT, {
    top: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax)
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.BOTTOM_LEFT, {
    top: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax)
  }), _defineProperty(_ref, AVAILABLE_SNAKE_DIRECTIONS.TOP_LEFT, {
    top: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax)
  }), _ref;
};

var getRandomRgbColour = function getRandomRgbColour(min, max) {
  min = min || 0;
  max = max || 255;
  return 'rgb(' + getRandomNumber(min, max) + ', ' + getRandomNumber(min, max) + ', ' + getRandomNumber(min, max) + ')';
};

var getRandomCircleDiameter = function getRandomCircleDiameter(isCircleDiameterMaxRandomPerDirection, circleDiameterMax) {
  return getRandomNumber(20, isCircleDiameterMaxRandomPerDirection ? getRandomNumber(20, 50) : circleDiameterMax);
};

var getColors = function getColors(isCircleColourIncremental, minColorsTotal, isCircleRValueIncremental, isCircleGValueIncremental, isCircleBValueIncremental) {
  if (isCircleColourIncremental) {
    var rValue = void 0;
    var gValue = void 0;
    var bValue = void 0;

    return [].concat(_toConsumableArray(Array(getRandomNumber(minColorsTotal, 50)))).map(function () {
      if (!rValue || rValue > 255 || rValue < 0) rValue = getRandomNumber(0, 255);
      if (!gValue || gValue > 255 || gValue < 0) gValue = getRandomNumber(0, 255);
      if (!bValue || bValue > 255 || bValue < 0) bValue = getRandomNumber(0, 255);

      var color = 'rgb(' + rValue + ', ' + gValue + ', ' + bValue + ')';

      if (isCircleRValueIncremental) {
        rValue += makeNumberRandomlyNegative(getRandomNumber(5, 50));
      }

      if (isCircleGValueIncremental) {
        gValue += makeNumberRandomlyNegative(getRandomNumber(5, 50));
      }

      if (isCircleBValueIncremental) {
        bValue += makeNumberRandomlyNegative(getRandomNumber(5, 50));
      }

      return color;
    });
  }

  return [].concat(_toConsumableArray(Array(getRandomNumber(minColorsTotal, 50)))).map(function () {
    return getRandomRgbColour();
  });
};

var circleGlowMinOpacity = 2; // out of 1
var circleGlowMaxOpacity = 7; // out of 1
var layout = AVAILABLE_LAYOUTS[getRandomNumber(0, AVAILABLE_LAYOUTS.length)];
var defaultSnakeAngle = getRandomNumber(10, 50);
var isCircleColourIncremental = randomTrueOrFalse();
var minColorsTotal = 3;
var isCircleRValueIncremental = randomTrueOrFalse();
var isCircleGValueIncremental = randomTrueOrFalse();
var isCircleBValueIncremental = randomTrueOrFalse();

var allowedSnakeDirections = Object.keys(AVAILABLE_SNAKE_DIRECTIONS).slice(0, getRandomNumber(1, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length));

var getSnakeDirection = function getSnakeDirection() {
  return AVAILABLE_SNAKE_DIRECTIONS[allowedSnakeDirections[getRandomNumber(0, allowedSnakeDirections.length)]];
};

var config = {
  boxShadowMaxBlur: 200,
  boxShadowMinBlur: 100,
  defaultCircleDiameter: getRandomNumber(20, 50),
  circleDiameterMax: getRandomNumber(20, 50),
  circleGlowMaxOpacity: circleGlowMaxOpacity,
  circleGlowMinOpacity: circleGlowMinOpacity,
  colors: getColors(isCircleColourIncremental, minColorsTotal, isCircleRValueIncremental, isCircleGValueIncremental, isCircleBValueIncremental),
  defaultCircleGlowOpacity: getRandomNumber(circleGlowMinOpacity, circleGlowMaxOpacity) / 10,
  defaultDirectionIncrements: makeDirectionIncrements(defaultSnakeAngle),
  isCircleColourIncremental: isCircleColourIncremental,
  isCircleRValueIncremental: isCircleRValueIncremental,
  isCircleGValueIncremental: isCircleGValueIncremental,
  isCircleBValueIncremental: isCircleBValueIncremental,
  maxGridCircleOffset: getRandomNumber(6, 50),
  isCircleDiameterMaxRandomPerDirection: randomTrueOrFalse(),

  isDiameterChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilDiameterChange: getRandomNumber(0, 20),
  diameterGradualIncrementAmount: getRandomNumber(0, 5),
  isDiameterChangeCircleNumberReset: randomTrueOrFalse(),

  isOpacityChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilOpacityChange: getRandomNumber(0, 20),
  opacityGradualIncrementAmount: getRandomNumber(0, 0.05),
  isOpacityChangeCircleNumberReset: randomTrueOrFalse(),

  isCircleGlowOpacityPerCircle: randomTrueOrFalse(),
  isDirectionDifferentOnReset: randomTrueOrFalse(),

  numberOfCirclesUntilDirectionChange: getRandomNumber(0, 20),
  isDirectionChangeCircleNumberReset: randomTrueOrFalse(),

  isDirectionIncrementsDifferentOnReset: randomTrueOrFalse(),
  isDirectionIncrementsDifferentPerCircle: randomTrueOrFalse(),
  isDotsBackground: randomTrueOrFalse(),
  isDotsBackgroundDark: randomTrueOrFalse(),

  // Now also used by 'snake' layout, may want to rename away from 'grid' or create new setting.
  // Maybe have different config objects per layout, so it's clear what layouts use what config?
  isGridOffsetChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilGridOffsetChange: getRandomNumber(0, 20),
  offsetGradualIncrementAmount: getRandomNumber(2, 20),
  isOffsetChangeCircleNumberReset: randomTrueOrFalse(),

  defaultIsDotsDark: randomTrueOrFalse(),
  isDotsDarkCheckPerCircle: randomTrueOrFalse(),
  isMarkmakingPresent: randomTrueOrFalse(),
  isSnakeAngleMaxRandomPerDirection: randomTrueOrFalse(),
  isSnakeAngleRandomPerDirection: randomTrueOrFalse(),
  layout: layout,
  minColorsTotal: minColorsTotal,
  defaultSnakeAngle: defaultSnakeAngle,
  allowedSnakeDirections: allowedSnakeDirections,
  defaultSnakeDirection: getSnakeDirection(),
  snakeAngleMax: getRandomNumber(10, 50),
  totalCircles: layout === 'grid' ? getRandomSquareNumber(50, 500) : getRandomNumber(50, 500)
};

if (!config.isDotsBackground) {
  document.getElementById('dots-dark-background').remove();
  document.getElementById('dots-light-background').remove();
} else if (config.isDotsBackgroundDark) {
  document.getElementById('dots-light-background').remove();
} else {
  document.getElementById('dots-dark-background').remove();
}

document.getElementById('background').style.backgroundColor = getRandomRgbColour(50, 175);
document.getElementById('colour-layer').style.backgroundColor = getRandomRgbColour();
document.getElementById('lighten-layer').style.backgroundColor = getRandomRgbColour();

var createCircle = void 0;

if (config.layout === 'confetti') {
  var circleDiameterCounter = 0;
  var diameter = config.defaultCircleDiameter;
  var numberOfCirclesUntilDiameterChange = config.numberOfCirclesUntilDiameterChange;

  var circleOpacityCounter = 0;
  var opacity = 1;
  var numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange;

  createCircle = function createCircle() {
    var isDotsDark = config.isDotsDarkCheckPerCircle ? randomTrueOrFalse() : config.defaultIsDotsDark;

    var circle = document.createElement('div');

    if (config.isDiameterChangeEnabled) {
      if (circleDiameterCounter < numberOfCirclesUntilDiameterChange) {
        circleDiameterCounter += 1;

        if (config.diameterGradualIncrementAmount) {
          diameter += config.diameterGradualIncrementAmount;
        }
      } else {
        diameter = getRandomCircleDiameter(config.isCircleDiameterMaxRandomPerDirection, config.circleDiameterMax);

        if (config.isDiameterChangeCircleNumberReset) {
          numberOfCirclesUntilDiameterChange = getRandomNumber(0, 20);
        }

        circleDiameterCounter = 0;
      }
    }

    if (config.isOpacityChangeEnabled) {
      if (circleOpacityCounter < numberOfCirclesUntilOpacityChange) {
        circleOpacityCounter += 1;

        if (config.opacityGradualIncrementAmount) {
          opacity -= config.opacityGradualIncrementAmount;
        }
      } else {
        opacity = getRandomNumber(0, 100) / 100;

        if (config.isOpacityChangeCircleNumberReset) {
          numberOfCirclesUntilOpacityChange = getRandomNumber(0, 20);
        }

        circleOpacityCounter = 0;
      }
    }

    var color = config.colors[getRandomNumber(0, config.colors.length - 1)];

    circle.style.opacity = opacity;
    circle.style.width = diameter + 'px';
    circle.style.height = diameter + 'px';
    circle.style.borderRadius = '50%';
    circle.style.zIndex = '2';
    circle.style.position = 'absolute';
    circle.style.top = getRandomNumber(0 - diameter, window.innerHeight) + 'px';
    circle.style.left = getRandomNumber(0 - diameter, window.innerWidth) + 'px';
    circle.style.backgroundColor = color;

    var circleGlowOpacity = config.isCircleGlowOpacityPerCircle ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10 : config.defaultCircleGlowOpacity;

    var boxShadowColor = color.replace('rgb', 'rgba').replace(')', ',' + circleGlowOpacity + ')');

    circle.style.boxShadow = '0 0 ' + getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur) + 'px 0 ' + boxShadowColor;

    if (config.isMarkmakingPresent) {
      circle.style.backgroundImage = 'url(\'./dots-' + (isDotsDark ? 'dark' : 'light') + '-transparent.png\')';
      circle.style.backgroundSize = '300px auto';
      circle.style.backgroundPosition = getRandomNumber(0, 100) + '% ' + getRandomNumber(0, 100) + '%';
      circle.style.backgroundBlendMode = isDotsDark ? 'color-dodge' : 'color-burn';
    }

    return circle;
  };
} else if (config.layout === 'grid') {
  var width = window.innerWidth / Math.sqrt(config.totalCircles);
  var height = window.innerHeight / Math.sqrt(config.totalCircles);

  var _circleDiameterCounter = 0;
  var _numberOfCirclesUntilDiameterChange = config.numberOfCirclesUntilDiameterChange;
  var _diameter = config.defaultCircleDiameter;

  var circleOffsetCounter = 0;
  var numberOfCirclesUntilGridOffsetChange = config.numberOfCirclesUntilGridOffsetChange;
  var topOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  var leftOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;

  var _circleOpacityCounter = 0;
  var _opacity = 1;
  var _numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange;

  createCircle = function createCircle() {
    var isDotsDark = config.isDotsDarkCheckPerCircle ? randomTrueOrFalse() : config.defaultIsDotsDark;

    var circleContainer = document.createElement('div');
    var circle = document.createElement('div');
    var color = config.colors[getRandomNumber(0, config.colors.length - 1)];

    circleContainer.style.width = width + 'px';
    circleContainer.style.zIndex = '2';
    circleContainer.style.height = height + 'px';
    circleContainer.style.display = 'flex';
    circleContainer.style.justifyContent = 'center';
    circleContainer.style.alignItems = 'center';

    if (config.isGridOffsetChangeEnabled) {
      if (circleOffsetCounter < numberOfCirclesUntilGridOffsetChange) {
        circleOffsetCounter += 1;

        if (config.offsetGradualIncrementAmount) {
          topOffset += config.offsetGradualIncrementAmount;
          leftOffset += config.offsetGradualIncrementAmount;
        }
      } else {
        topOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));
        leftOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));

        if (config.isOffsetChangeCircleNumberReset) {
          numberOfCirclesUntilGridOffsetChange = getRandomNumber(0, 20);
        }

        circleOffsetCounter = 0;
      }
    }

    if (config.isOpacityChangeEnabled) {
      if (_circleOpacityCounter < _numberOfCirclesUntilOpacityChange) {
        _circleOpacityCounter += 1;

        if (config.opacityGradualIncrementAmount) {
          _opacity -= config.opacityGradualIncrementAmount;
        }
      } else {
        _opacity = getRandomNumber(0, 100) / 100;

        if (config.isOpacityChangeCircleNumberReset) {
          _numberOfCirclesUntilOpacityChange = getRandomNumber(0, 20);
        }

        _circleOpacityCounter = 0;
      }
    }

    circle.style.position = 'relative';
    circle.style.top = topOffset + 'px';
    circle.style.left = leftOffset + 'px';

    if (config.isDiameterChangeEnabled) {
      if (_circleDiameterCounter < _numberOfCirclesUntilDiameterChange) {
        _circleDiameterCounter += 1;

        if (config.diameterGradualIncrementAmount) {
          _diameter += config.diameterGradualIncrementAmount;
        }
      } else {
        _diameter = getRandomCircleDiameter(config.isCircleDiameterMaxRandomPerDirection, config.circleDiameterMax);

        if (config.isDiameterChangeCircleNumberReset) {
          _numberOfCirclesUntilDiameterChange = getRandomNumber(0, 20);
        }

        _circleDiameterCounter = 0;
      }
    }

    circle.style.opacity = _opacity;
    circle.style.width = _diameter + 'px';
    circle.style.height = _diameter + 'px';
    circle.style.flex = 'none';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = color;

    var circleGlowOpacity = config.isCircleGlowOpacityPerCircle ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10 : config.defaultCircleGlowOpacity;

    var boxShadowColor = color.replace('rgb', 'rgba').replace(')', ',' + circleGlowOpacity + ')');

    circle.style.boxShadow = '0 0 ' + getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur) + 'px 0 ' + boxShadowColor;

    if (config.isMarkmakingPresent) {
      circle.style.backgroundImage = 'url(\'./dots-' + (isDotsDark ? 'dark' : 'light') + '-transparent.png\')';
      circle.style.backgroundSize = '300px auto';
      circle.style.backgroundPosition = getRandomNumber(0, 100) + '% ' + getRandomNumber(0, 100) + '%';
      circle.style.backgroundBlendMode = isDotsDark ? 'color-dodge' : 'color-burn';
    }

    circleContainer.appendChild(circle);

    return circleContainer;
  };
} else if (config.layout === 'snake') {
  var topValue = void 0;
  var leftValue = void 0;
  var snakeDirection = config.defaultSnakeDirection;

  var circleDirectionCounter = 0;
  var numberOfCirclesUntilDirectionChange = config.numberOfCirclesUntilDirectionChange;

  var _circleDiameterCounter2 = 0;
  var _diameter2 = config.defaultCircleDiameter;
  var _numberOfCirclesUntilDiameterChange2 = config.numberOfCirclesUntilDiameterChange;

  var _circleOffsetCounter = 0;
  var _topOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  var _leftOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  var _numberOfCirclesUntilGridOffsetChange = config.numberOfCirclesUntilGridOffsetChange;

  var _circleOpacityCounter2 = 0;
  var _opacity2 = 1;
  var _numberOfCirclesUntilOpacityChange2 = config.numberOfCirclesUntilOpacityChange;

  createCircle = function createCircle() {
    var isDotsDark = config.isDotsDarkCheckPerCircle ? randomTrueOrFalse() : config.defaultIsDotsDark;

    if (config.isDiameterChangeEnabled) {
      if (_circleDiameterCounter2 < _numberOfCirclesUntilDiameterChange2) {
        _circleDiameterCounter2 += 1;

        if (config.diameterGradualIncrementAmount) {
          _diameter2 += config.diameterGradualIncrementAmount;
        }
      } else {
        _diameter2 = getRandomCircleDiameter(config.isCircleDiameterMaxRandomPerDirection, config.circleDiameterMax);

        if (config.isDiameterChangeCircleNumberReset) {
          _numberOfCirclesUntilDiameterChange2 = getRandomNumber(0, 20);
        }

        _circleDiameterCounter2 = 0;
      }
    }

    if (config.isGridOffsetChangeEnabled) {
      if (_circleOffsetCounter < _numberOfCirclesUntilGridOffsetChange) {
        _circleOffsetCounter += 1;

        if (config.offsetGradualIncrementAmount) {
          _topOffset += config.offsetGradualIncrementAmount;
          _leftOffset += config.offsetGradualIncrementAmount;
        }
      } else {
        _topOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));
        _leftOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));

        if (config.isOffsetChangeCircleNumberReset) {
          _numberOfCirclesUntilGridOffsetChange = getRandomNumber(0, 20);
        }

        _circleOffsetCounter = 0;
      }
    }

    if (config.isOpacityChangeEnabled) {
      if (_circleOpacityCounter2 < _numberOfCirclesUntilOpacityChange2) {
        _circleOpacityCounter2 += 1;

        if (config.opacityGradualIncrementAmount) {
          _opacity2 -= config.opacityGradualIncrementAmount;
        }
      } else {
        _opacity2 = getRandomNumber(0, 100) / 100;

        if (config.isOpacityChangeCircleNumberReset) {
          _numberOfCirclesUntilOpacityChange2 = getRandomNumber(0, 20);
        }

        _circleOpacityCounter2 = 0;
      }
    }

    if (!topValue) topValue = getRandomNumber(0 - _diameter2, window.innerHeight);
    if (!leftValue) leftValue = getRandomNumber(0 - _diameter2, window.innerWidth);

    var circle = document.createElement('div');
    var color = config.colors[getRandomNumber(0, config.colors.length - 1)];

    circle.style.opacity = _opacity2;
    circle.style.transform = 'translateY(' + _topOffset + 'px) translateX(' + _leftOffset + 'px)';
    circle.style.width = _diameter2 + 'px';
    circle.style.height = _diameter2 + 'px';
    circle.style.zIndex = '2';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = topValue + 'px';
    circle.style.left = leftValue + 'px';
    circle.style.backgroundColor = color;

    var circleGlowOpacity = config.isCircleGlowOpacityPerCircle ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10 : config.defaultCircleGlowOpacity;

    var boxShadowColor = color.replace('rgb', 'rgba').replace(')', ',' + circleGlowOpacity + ')');

    circle.style.boxShadow = '0 0 ' + getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur) + 'px 0 ' + boxShadowColor;

    if (config.isMarkmakingPresent) {
      circle.style.backgroundImage = 'url(\'./dots-' + (isDotsDark ? 'dark' : 'light') + '-transparent.png\')';
      circle.style.backgroundSize = '300px auto';
      circle.style.backgroundPosition = getRandomNumber(0, 100) + '% ' + getRandomNumber(0, 100) + '%';
      circle.style.backgroundBlendMode = isDotsDark ? 'color-dodge' : 'color-burn';
    }

    var directionIncrements = void 0;

    // if it hits the window edges in any location, find a new random starting point for everything
    if (topValue > window.innerHeight || topValue < 0 || leftValue > window.innerWidth || leftValue < 0) {
      topValue = getRandomNumber(0, window.innerHeight);
      leftValue = getRandomNumber(0, window.innerWidth);

      snakeDirection = config.isDirectionDifferentOnReset ? getSnakeDirection() : config.defaultSnakeDirection;

      directionIncrements = config.isDirectionIncrementsDifferentOnReset ? makeDirectionIncrements(0, config.isSnakeAngleRandomPerDirection, config.snakeAngleMax) : config.defaultDirectionIncrements;
    }

    if (numberOfCirclesUntilDirectionChange) {
      if (circleDirectionCounter < numberOfCirclesUntilDirectionChange) {
        circleDirectionCounter += 1;
      } else {
        snakeDirection = getSnakeDirection();

        if (config.isDirectionChangeCircleNumberReset) {
          numberOfCirclesUntilDirectionChange = getRandomNumber(0, 20);
        }

        circleDirectionCounter = 0;
      }
    }

    directionIncrements = config.isDirectionIncrementsDifferentPerCircle ? makeDirectionIncrements(0, config.isSnakeAngleRandomPerDirection, config.snakeAngleMax) : config.defaultDirectionIncrements;

    topValue += directionIncrements[snakeDirection].top;
    leftValue += directionIncrements[snakeDirection].left;

    return circle;
  };
}

var circles = [].concat(_toConsumableArray(Array(config.totalCircles))).map(function () {
  return createCircle();
});

circles.forEach(function (circle) {
  document.getElementById('background').appendChild(circle);
});

// console.log('config:', config);