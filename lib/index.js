'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AVAILABLE_LAYOUTS = [
// 'confetti',
'grid', 'snake'];

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

var getRandomColor = function getRandomColor(min, max) {
  min = min || 0;
  max = max || 255;
  return 'rgb(' + getRandomNumber(min, max) + ', ' + getRandomNumber(min, max) + ', ' + getRandomNumber(min, max) + ')';
};

var getRandomCircleDiameter = function getRandomCircleDiameter(isCircleDiameterMaxRandomPerDirection, circleDiameterMax) {
  return getRandomNumber(20, isCircleDiameterMaxRandomPerDirection ? getRandomNumber(20, 50) : circleDiameterMax);
};

var getColors = function getColors(isCircleColorIncremental, minColorsTotal, isCircleRValueIncremental, isCircleGValueIncremental, isCircleBValueIncremental) {
  if (isCircleColorIncremental) {
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
    return getRandomColor();
  });
};

var circleGlowMinOpacity = 2; // out of 1
var circleGlowMaxOpacity = 7; // out of 1
var layout = AVAILABLE_LAYOUTS[getRandomNumber(0, AVAILABLE_LAYOUTS.length)];
var defaultSnakeAngle = getRandomNumber(10, 50);
var isCircleColorIncremental = randomTrueOrFalse();
var minColorsTotal = 3;
var isCircleRValueIncremental = randomTrueOrFalse();
var isCircleGValueIncremental = randomTrueOrFalse();
var isCircleBValueIncremental = randomTrueOrFalse();

var colors = getColors(isCircleColorIncremental, minColorsTotal, isCircleRValueIncremental, isCircleGValueIncremental, isCircleBValueIncremental);

var getRandomColorFromColors = function getRandomColorFromColors() {
  return colors[getRandomNumber(0, colors.length - 1)];
};

var allowedSnakeDirections = Object.keys(AVAILABLE_SNAKE_DIRECTIONS).slice(0, getRandomNumber(1, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length - 1));

var getSnakeDirection = function getSnakeDirection() {
  return AVAILABLE_SNAKE_DIRECTIONS[allowedSnakeDirections[getRandomNumber(0, allowedSnakeDirections.length - 1)]];
};

var getRandomGradient = function getRandomGradient() {
  return ('\n  linear-gradient(\n    ' + getRandomNumber(0, 360) + 'deg, ' + getRandomColor() + ', ' + getRandomColor() + '\n  )\n').trim();
};

var getRandomGradientFromColors = function getRandomGradientFromColors() {
  return ('\n  linear-gradient(\n    ' + getRandomNumber(0, 360) + 'deg, ' + getRandomColorFromColors() + ', ' + getRandomColorFromColors() + '\n  )\n').trim();
};

var config = {
  boxShadowMaxBlur: 200,
  boxShadowMinBlur: 100,
  defaultCircleDiameter: getRandomNumber(20, 50),
  circleDiameterMax: getRandomNumber(20, 50),
  circleGlowMaxOpacity: circleGlowMaxOpacity,
  circleGlowMinOpacity: circleGlowMinOpacity,
  colors: colors,
  defaultCircleGlowOpacity: getRandomNumber(circleGlowMinOpacity, circleGlowMaxOpacity) / 10,
  defaultDirectionIncrements: makeDirectionIncrements(defaultSnakeAngle),
  isCircleColorIncremental: isCircleColorIncremental,
  isCircleRValueIncremental: isCircleRValueIncremental,
  isCircleGValueIncremental: isCircleGValueIncremental,
  isCircleBValueIncremental: isCircleBValueIncremental,
  maxGridCircleOffset: getRandomNumber(6, 50),
  isCircleDiameterMaxRandomPerDirection: randomTrueOrFalse(),

  isDiameterChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilDiameterChange: getRandomNumber(0, 20),
  diameterGradualIncrementAmount: getRandomNumber(0, 5),
  isDiameterChangeCircleNumberReset: randomTrueOrFalse(),

  isBorderRadiusChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilBorderRadiusChange: getRandomNumber(0, 10),
  borderRadiusGradualIncrementAmount: getRandomNumber(0, 2),
  isBorderRadiusChangeCircleNumberReset: randomTrueOrFalse(),
  defaultBorderRadius: 50,

  isOpacityChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilOpacityChange: getRandomNumber(0, 20),
  opacityGradualIncrementAmount: getRandomNumber(0, 0.05),
  isOpacityChangeCircleNumberReset: randomTrueOrFalse(),

  isRotationChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilRotationChange: getRandomNumber(0, 20),
  rotateGradualIncrementAmount: getRandomNumber(0, 5),
  isRotationChangeCircleNumberReset: randomTrueOrFalse(),
  defaultRotation: 0,
  maxRotation: 360,

  isCircleGlowOpacityPerCircle: randomTrueOrFalse(),
  isDirectionDifferentOnReset: randomTrueOrFalse(),

  numberOfCirclesUntilDirectionChange: getRandomNumber(0, 10),
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
  // isMarkmakingPresent: randomTrueOrFalse(),
  isMarkmakingPresent: false,
  isSnakeAngleMaxRandomPerDirection: randomTrueOrFalse(),
  isSnakeAngleRandomPerDirection: randomTrueOrFalse(),
  layout: layout,
  minColorsTotal: minColorsTotal,
  defaultSnakeAngle: defaultSnakeAngle,
  allowedSnakeDirections: allowedSnakeDirections,
  backgroundColor: randomTrueOrFalse() ? getRandomColor() : getRandomGradient(),
  defaultSnakeDirection: getSnakeDirection(),
  snakeAngleMax: getRandomNumber(10, 50),
  totalCircles: layout === 'grid' ? getRandomSquareNumber(50, 500) : getRandomNumber(150, 500),

  isCircleGradientsEnabled: randomTrueOrFalse(),
  circleGradientProbability: getRandomNumber(0, 10) / 10
};

if (!config.isDotsBackground) {
  document.getElementById('dots-dark-background').remove();
  document.getElementById('dots-light-background').remove();
} else if (config.isDotsBackgroundDark) {
  document.getElementById('dots-light-background').remove();
} else {
  document.getElementById('dots-dark-background').remove();
}

document.getElementById('background').style.background = config.backgroundColor;

var createCircle = void 0;

if (config.layout === 'confetti') {
  var circleDiameterCounter = 0;
  var diameter = config.defaultCircleDiameter;
  var numberOfCirclesUntilDiameterChange = config.numberOfCirclesUntilDiameterChange;

  var circleOpacityCounter = 0;
  var opacity = 1;
  var numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange;

  var circleBorderRadiusCounter = 0;
  var borderRadius = config.defaultBorderRadius;
  var numberOfCirclesUntilBorderRadiusChange = config.numberOfCirclesUntilBorderRadiusChange;

  var circleRotationCounter = 0;
  var rotation = config.defaultRotation;
  var numberOfCirclesUntilRotationChange = config.numberOfCirclesUntilRotationChange;

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

    if (config.isBorderRadiusChangeEnabled) {
      if (circleBorderRadiusCounter < numberOfCirclesUntilBorderRadiusChange) {
        circleBorderRadiusCounter += 1;

        if (config.borderRadiusGradualIncrementAmount) {
          borderRadius += config.borderRadiusGradualIncrementAmount;
        }
      } else {
        borderRadius = getRandomNumber(0, 50);

        if (config.isBorderRadiusChangeCircleNumberReset) {
          numberOfCirclesUntilBorderRadiusChange = getRandomNumber(0, 20);
        }

        circleBorderRadiusCounter = 0;
      }
    }

    if (config.isRotationChangeEnabled) {
      if (circleRotationCounter < numberOfCirclesUntilRotationChange) {
        circleRotationCounter += 1;

        if (config.rotationGradualIncrementAmount) {
          rotation += config.rotationGradualIncrementAmount;
        }
      } else {
        rotation = getRandomNumber(0, config.maxRotation);

        if (config.isRotationChangeCircleNumberReset) {
          numberOfCirclesUntilRotationChange = getRandomNumber(0, 20);
        }

        circleRotationCounter = 0;
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

    var color = void 0;

    if (config.isCircleGradientsEnabled) {
      color = Math.random() < config.circleGradientProbability ? getRandomGradientFromColors() : getRandomColorFromColors();
    } else {
      color = getRandomColorFromColors();
    }

    circle.style.opacity = opacity;
    circle.style.width = diameter + 'px';
    circle.style.height = diameter + 'px';
    circle.style.borderRadius = borderRadius + '%';
    circle.style.zIndex = '2';
    circle.style.position = 'absolute';
    circle.style.top = getRandomNumber(0 - diameter, window.innerHeight) + 'px';
    circle.style.left = getRandomNumber(0 - diameter, window.innerWidth) + 'px';
    circle.style.background = color;
    circle.style.transform = 'rotate(' + rotation + 'deg)';

    var circleGlowOpacity = config.isCircleGlowOpacityPerCircle ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10 : config.defaultCircleGlowOpacity;

    var boxShadowColor = getRandomColorFromColors().replace('rgb', 'rgba').replace(')', ',' + circleGlowOpacity + ')');

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
  var isDiameterChangeEnabled = config.isDiameterChangeEnabled;

  var circleOffsetCounter = 0;
  var numberOfCirclesUntilGridOffsetChange = config.numberOfCirclesUntilGridOffsetChange;
  var topOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  var leftOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  var isGridOffsetChangeEnabled = config.isGridOffsetChangeEnabled;

  var _circleOpacityCounter = 0;
  var _opacity = 1;
  var _numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange;
  var isOpacityChangeEnabled = config.isOpacityChangeEnabled;

  var _circleBorderRadiusCounter = 0;
  var _borderRadius = config.defaultBorderRadius;
  var _numberOfCirclesUntilBorderRadiusChange = config.numberOfCirclesUntilBorderRadiusChange;
  var isBorderRadiusChangeEnabled = config.isBorderRadiusChangeEnabled;

  var _circleRotationCounter = 0;
  var _rotation = config.defaultRotation;
  var _numberOfCirclesUntilRotationChange = config.numberOfCirclesUntilRotationChange;
  var isRotationChangeEnabled = config.isRotationChangeEnabled;

  createCircle = function createCircle() {
    var isDotsDark = config.isDotsDarkCheckPerCircle ? randomTrueOrFalse() : config.defaultIsDotsDark;

    var circleContainer = document.createElement('div');
    var circle = document.createElement('div');

    var color = void 0;

    if (config.isCircleGradientsEnabled) {
      color = Math.random() < config.circleGradientProbability ? getRandomGradientFromColors() : getRandomColorFromColors();
    } else {
      color = getRandomColorFromColors();
    }

    circleContainer.style.width = width + 'px';
    circleContainer.style.zIndex = '2';
    circleContainer.style.height = height + 'px';
    circleContainer.style.display = 'flex';
    circleContainer.style.justifyContent = 'center';
    circleContainer.style.alignItems = 'center';

    if (isGridOffsetChangeEnabled) {
      if (circleOffsetCounter < numberOfCirclesUntilGridOffsetChange) {
        circleOffsetCounter += 1;

        if (config.offsetGradualIncrementAmount) {
          topOffset += config.offsetGradualIncrementAmount;
          leftOffset += config.offsetGradualIncrementAmount;
        }

        // NOTE: There's a small change that offset changes will become
        // disabled on the next circle, meaning no more following circles
        // will have position offsets after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        isGridOffsetChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        topOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));
        leftOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));

        if (config.isOffsetChangeCircleNumberReset) {
          numberOfCirclesUntilGridOffsetChange = getRandomNumber(0, 20);
        }

        circleOffsetCounter = 0;
      }
    }

    if (!isGridOffsetChangeEnabled) {
      // NOTE: If position offset changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      isGridOffsetChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (isRotationChangeEnabled) {
      if (_circleRotationCounter < _numberOfCirclesUntilRotationChange) {
        _circleRotationCounter += 1;

        if (config.rotationGradualIncrementAmount) {
          _rotation += config.rotationGradualIncrementAmount;
        }

        // NOTE: There's a small change that rotation changes will become
        // disabled on the next circle, meaning no more following circles
        // will have rotation after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        isRotationChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _rotation = getRandomNumber(0, config.maxRotation);

        if (config.isRotationChangeCircleNumberReset) {
          _numberOfCirclesUntilRotationChange = getRandomNumber(0, 20);
        }

        _circleRotationCounter = 0;
      }
    }

    if (!isRotationChangeEnabled) {
      // NOTE: If rotation changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      isRotationChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (isBorderRadiusChangeEnabled) {
      if (_circleBorderRadiusCounter < _numberOfCirclesUntilBorderRadiusChange) {
        _circleBorderRadiusCounter += 1;

        if (config.borderRadiusGradualIncrementAmount) {
          _borderRadius += config.borderRadiusGradualIncrementAmount;
        }

        // NOTE: There's a small change that border radius changes will become
        // disabled on the next circle, meaning no more following circles
        // will have border radius changes after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        isBorderRadiusChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _borderRadius = getRandomNumber(0, 50);

        if (config.isBorderRadiusChangeCircleNumberReset) {
          _numberOfCirclesUntilBorderRadiusChange = getRandomNumber(0, 20);
        }

        _circleBorderRadiusCounter = 0;
      }
    }

    if (!isBorderRadiusChangeEnabled) {
      // NOTE: If border radius changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      isBorderRadiusChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (isOpacityChangeEnabled) {
      if (_circleOpacityCounter < _numberOfCirclesUntilOpacityChange) {
        _circleOpacityCounter += 1;

        if (config.opacityGradualIncrementAmount) {
          _opacity -= config.opacityGradualIncrementAmount;
        }

        // NOTE: There's a small change that opacity changes will become
        // disabled on the next circle, meaning no more following circles
        // will have opacity changes after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        isOpacityChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _opacity = getRandomNumber(0, 100) / 100;

        if (config.isOpacityChangeCircleNumberReset) {
          _numberOfCirclesUntilOpacityChange = getRandomNumber(0, 20);
        }

        _circleOpacityCounter = 0;
      }
    }

    if (!isOpacityChangeEnabled) {
      // NOTE: If opacity changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      isOpacityChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (isDiameterChangeEnabled) {
      if (_circleDiameterCounter < _numberOfCirclesUntilDiameterChange) {
        _circleDiameterCounter += 1;

        if (config.diameterGradualIncrementAmount) {
          _diameter += config.diameterGradualIncrementAmount;
        }

        // NOTE: There's a small change that diameter changes will become
        // disabled on the next circle, meaning no more following circles
        // will have diameter changes after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        isDiameterChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _diameter = getRandomCircleDiameter(config.isCircleDiameterMaxRandomPerDirection, config.circleDiameterMax);

        if (config.isDiameterChangeCircleNumberReset) {
          _numberOfCirclesUntilDiameterChange = getRandomNumber(0, 20);
        }

        _circleDiameterCounter = 0;
      }
    }

    if (!isDiameterChangeEnabled) {
      // NOTE: If diameter changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      isDiameterChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    circle.style.position = 'relative';
    circle.style.top = topOffset + 'px';
    circle.style.left = leftOffset + 'px';
    circle.style.transform = 'rotate(' + _rotation + 'deg)';
    circle.style.opacity = _opacity;
    circle.style.width = _diameter + 'px';
    circle.style.height = _diameter + 'px';
    circle.style.flex = 'none';
    circle.style.borderRadius = _borderRadius + '%';
    circle.style.background = color;

    var circleGlowOpacity = config.isCircleGlowOpacityPerCircle ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10 : config.defaultCircleGlowOpacity;

    var boxShadowColor = getRandomColorFromColors().replace('rgb', 'rgba').replace(')', ',' + circleGlowOpacity + ')');

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
  var _isDiameterChangeEnabled = config.isDiameterChangeEnabled;

  var _circleOffsetCounter = 0;
  var _topOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  var _leftOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  var _numberOfCirclesUntilGridOffsetChange = config.numberOfCirclesUntilGridOffsetChange;
  var _isGridOffsetChangeEnabled = config.isGridOffsetChangeEnabled;

  var _circleOpacityCounter2 = 0;
  var _opacity2 = 1;
  var _numberOfCirclesUntilOpacityChange2 = config.numberOfCirclesUntilOpacityChange;
  var _isOpacityChangeEnabled = config.isOpacityChangeEnabled;

  var _circleBorderRadiusCounter2 = 0;
  var _borderRadius2 = config.defaultBorderRadius;
  var _numberOfCirclesUntilBorderRadiusChange2 = config.numberOfCirclesUntilBorderRadiusChange;
  var _isBorderRadiusChangeEnabled = config.isBorderRadiusChangeEnabled;

  var _circleRotationCounter2 = 0;
  var _rotation2 = config.defaultRotation;
  var _numberOfCirclesUntilRotationChange2 = config.numberOfCirclesUntilRotationChange;
  var _isRotationChangeEnabled = config.isRotationChangeEnabled;

  createCircle = function createCircle() {
    var isDotsDark = config.isDotsDarkCheckPerCircle ? randomTrueOrFalse() : config.defaultIsDotsDark;

    if (_isDiameterChangeEnabled) {
      if (_circleDiameterCounter2 < _numberOfCirclesUntilDiameterChange2) {
        _circleDiameterCounter2 += 1;

        if (config.diameterGradualIncrementAmount) {
          _diameter2 += config.diameterGradualIncrementAmount;
        }

        // NOTE: There's a small change that diameter changes will become
        // disabled on the next circle, meaning no more following circles
        // will have diameter changes after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        _isDiameterChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _diameter2 = getRandomCircleDiameter(config.isCircleDiameterMaxRandomPerDirection, config.circleDiameterMax);

        if (config.isDiameterChangeCircleNumberReset) {
          _numberOfCirclesUntilDiameterChange2 = getRandomNumber(0, 20);
        }

        _circleDiameterCounter2 = 0;
      }
    }

    if (!_isDiameterChangeEnabled) {
      // NOTE: If diameter changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      _isDiameterChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (_isBorderRadiusChangeEnabled) {
      if (_circleBorderRadiusCounter2 < _numberOfCirclesUntilBorderRadiusChange2) {
        _circleBorderRadiusCounter2 += 1;

        if (config.borderRadiusGradualIncrementAmount) {
          _borderRadius2 += config.borderRadiusGradualIncrementAmount;
        }

        // NOTE: There's a small change that border radius changes will become
        // disabled on the next circle, meaning no more following circles
        // will have border radius changes after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        _isBorderRadiusChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _borderRadius2 = getRandomNumber(0, 50);

        if (config.isBorderRadiusChangeCircleNumberReset) {
          _numberOfCirclesUntilBorderRadiusChange2 = getRandomNumber(0, 20);
        }

        _circleBorderRadiusCounter2 = 0;
      }
    }

    if (!_isBorderRadiusChangeEnabled) {
      // NOTE: If border radius changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      _isBorderRadiusChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (_isGridOffsetChangeEnabled) {
      if (_circleOffsetCounter < _numberOfCirclesUntilGridOffsetChange) {
        _circleOffsetCounter += 1;

        if (config.offsetGradualIncrementAmount) {
          _topOffset += config.offsetGradualIncrementAmount;
          _leftOffset += config.offsetGradualIncrementAmount;
        }

        // NOTE: There's a small change that offset changes will become
        // disabled on the next circle, meaning no more following circles
        // will have position offsets after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        _isGridOffsetChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _topOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));
        _leftOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));

        if (config.isOffsetChangeCircleNumberReset) {
          _numberOfCirclesUntilGridOffsetChange = getRandomNumber(0, 20);
        }

        _circleOffsetCounter = 0;
      }
    }

    if (!_isGridOffsetChangeEnabled) {
      // NOTE: If position offset changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      _isGridOffsetChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (_isOpacityChangeEnabled) {
      if (_circleOpacityCounter2 < _numberOfCirclesUntilOpacityChange2) {
        _circleOpacityCounter2 += 1;

        if (config.opacityGradualIncrementAmount) {
          _opacity2 -= config.opacityGradualIncrementAmount;
        }

        // NOTE: There's a small change that opacity changes will become
        // disabled on the next circle, meaning no more following circles
        // will have opacity changes after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        _isOpacityChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _opacity2 = getRandomNumber(0, 100) / 100;

        if (config.isOpacityChangeCircleNumberReset) {
          _numberOfCirclesUntilOpacityChange2 = getRandomNumber(0, 20);
        }

        _circleOpacityCounter2 = 0;
      }
    }

    if (!_isOpacityChangeEnabled) {
      // NOTE: If opacity changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      _isOpacityChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (_isRotationChangeEnabled) {
      if (_circleRotationCounter2 < _numberOfCirclesUntilRotationChange2) {
        _circleRotationCounter2 += 1;

        if (config.rotationGradualIncrementAmount) {
          _rotation2 += config.rotationGradualIncrementAmount;
        }

        // NOTE: There's a small change that rotation changes will become
        // disabled on the next circle, meaning no more following circles
        // will have rotation after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        _isRotationChangeEnabled = Math.random() < 1 / config.totalCircles ? false : true;
      } else {
        _rotation2 = getRandomNumber(0, config.maxRotation);

        if (config.isRotationChangeCircleNumberReset) {
          _numberOfCirclesUntilRotationChange2 = getRandomNumber(0, 20);
        }

        _circleRotationCounter2 = 0;
      }
    }

    if (!_isRotationChangeEnabled) {
      // NOTE: If rotation changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      _isRotationChangeEnabled = Math.random() < 1 / config.totalCircles ? true : false;
    }

    if (!topValue) topValue = getRandomNumber(0 - _diameter2, window.innerHeight);
    if (!leftValue) leftValue = getRandomNumber(0 - _diameter2, window.innerWidth);

    var circle = document.createElement('div');

    var color = void 0;

    if (config.isCircleGradientsEnabled) {
      color = Math.random() < config.circleGradientProbability ? getRandomGradientFromColors() : getRandomColorFromColors();
    } else {
      color = getRandomColorFromColors();
    }

    circle.style.opacity = _opacity2;
    circle.style.transform = 'translateY(' + _topOffset + 'px) translateX(' + _leftOffset + 'px) rotate(' + _rotation2 + 'deg)';
    circle.style.width = _diameter2 + 'px';
    circle.style.height = _diameter2 + 'px';
    circle.style.zIndex = '2';
    circle.style.borderRadius = _borderRadius2 + '%';
    circle.style.position = 'absolute';
    circle.style.top = topValue + 'px';
    circle.style.left = leftValue + 'px';
    circle.style.background = color;

    var circleGlowOpacity = config.isCircleGlowOpacityPerCircle ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10 : config.defaultCircleGlowOpacity;

    var boxShadowColor = getRandomColorFromColors().replace('rgb', 'rgba').replace(')', ',' + circleGlowOpacity + ')');

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