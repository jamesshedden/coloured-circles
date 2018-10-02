'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AVAILABLE_LAYOUTS = ['grid', 'snake'];

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

var circleGlowMinOpacity = 5; // out of 10
var circleGlowMaxOpacity = 10; // out of 10
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

var getRandomGradient = function getRandomGradient(angle) {
  return ('\n  linear-gradient(\n    ' + (angle || getRandomNumber(0, 360)) + 'deg, ' + getRandomColor() + ', ' + getRandomColor() + '\n  )\n').trim();
};

var getRandomGradientFromColors = function getRandomGradientFromColors(angle, color1, color2) {
  return ('\n  linear-gradient(\n    ' + (angle || getRandomNumber(0, 360)) + 'deg, ' + (color1 || getRandomColorFromColors()) + ', ' + (color2 || getRandomColorFromColors()) + '\n  )\n').trim();
};

var defaultCircleGradientAngle = getRandomNumber(0, 360);

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
  borderRadiusMinPercent: 5,
  borderRadiusMaxPercent: 50,

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
  isMarkmakingPresent: randomTrueOrFalse(),
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
  circleGradientProbability: getRandomNumber(0, 10) / 10,

  trianglesEnabled: randomTrueOrFalse(),
  trianglesProbability: getRandomNumber(0, 10) / 10,

  isCircleGradientAngleChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilCircleGradientAngleChange: getRandomNumber(0, 20),
  circleGradientAngleGradualIncrementAmount: getRandomNumber(2, 20),
  isCircleGradientAngleChangeCircleNumberReset: randomTrueOrFalse(),
  defaultCircleGradientAngle: defaultCircleGradientAngle
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

var circleDiameterCounter = 0;
var diameter = config.defaultCircleDiameter;
var circleOpacityCounter = 0;
var opacity = 1;
var color = void 0;
var circleOffsetCounter = 0;
var circleRotationCounter = 0;
var rotation = config.defaultRotation;
var circleBorderRadiusCounter = 0;
var borderRadius = config.defaultBorderRadius;
var topValue = void 0;
var leftValue = void 0;
var snakeDirection = config.defaultSnakeDirection;
var circleDirectionCounter = 0;

var numberOfCirclesUntilDiameterChange = config.numberOfCirclesUntilDiameterChange,
    numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange,
    numberOfCirclesUntilGridOffsetChange = config.numberOfCirclesUntilGridOffsetChange,
    isDiameterChangeEnabled = config.isDiameterChangeEnabled,
    isOpacityChangeEnabled = config.isOpacityChangeEnabled,
    isGridOffsetChangeEnabled = config.isGridOffsetChangeEnabled,
    isRotationChangeEnabled = config.isRotationChangeEnabled,
    isBorderRadiusChangeEnabled = config.isBorderRadiusChangeEnabled,
    numberOfCirclesUntilRotationChange = config.numberOfCirclesUntilRotationChange,
    numberOfCirclesUntilBorderRadiusChange = config.numberOfCirclesUntilBorderRadiusChange,
    numberOfCirclesUntilDirectionChange = config.numberOfCirclesUntilDirectionChange;


var topOffset = isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;

var leftOffset = isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;

var createCircle = function createCircle() {
  var circle = document.createElement('div');
  var circleContainer = document.createElement('div');

  if (isDiameterChangeEnabled) {
    if (circleDiameterCounter < numberOfCirclesUntilDiameterChange) {
      circleDiameterCounter += 1;

      if (config.diameterGradualIncrementAmount) {
        diameter += config.diameterGradualIncrementAmount;
      }

      // NOTE: There's a small change that diameter changes will become
      // disabled on the next circle, meaning no more following circles
      // will have diameter changes after that.
      //
      // The chance will be 1 in N where N is the total number of circles.
      isDiameterChangeEnabled = !(Math.random() < 1 / config.totalCircles);
    } else {
      diameter = getRandomCircleDiameter(config.isCircleDiameterMaxRandomPerDirection, config.circleDiameterMax);

      if (config.isDiameterChangeCircleNumberReset) {
        numberOfCirclesUntilDiameterChange = getRandomNumber(0, 20);
      }

      circleDiameterCounter = 0;
    }
  }

  if (!isDiameterChangeEnabled) {
    // NOTE: If diameter changes are initially not enabled, there's a 1 in N chance
    // that they will become enabled (where N is number of total circles)
    isDiameterChangeEnabled = Math.random() < 1 / config.totalCircles;
  }

  if (isOpacityChangeEnabled) {
    if (circleOpacityCounter < numberOfCirclesUntilOpacityChange) {
      circleOpacityCounter += 1;

      if (config.opacityGradualIncrementAmount) {
        opacity -= config.opacityGradualIncrementAmount;
      }

      // NOTE: There's a small change that opacity changes will become
      // disabled on the next circle, meaning no more following circles
      // will have opacity changes after that.
      //
      // The chance will be 1 in N where N is the total number of circles.
      isOpacityChangeEnabled = !(Math.random() < 1 / config.totalCircles);
    } else {
      opacity = getRandomNumber(0, 100) / 100;

      if (config.isOpacityChangeCircleNumberReset) {
        numberOfCirclesUntilOpacityChange = getRandomNumber(0, 20);
      }

      circleOpacityCounter = 0;
    }
  }

  if (!isOpacityChangeEnabled) {
    // NOTE: If opacity changes are initially not enabled, there's a 1 in N chance
    // that they will become enabled (where N is number of total circles)
    isOpacityChangeEnabled = Math.random() < 1 / config.totalCircles;
  }

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
      isGridOffsetChangeEnabled = !(Math.random() < 1 / config.totalCircles);
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
    isGridOffsetChangeEnabled = Math.random() < 1 / config.totalCircles;
  }

  if (isRotationChangeEnabled) {
    if (circleRotationCounter < numberOfCirclesUntilRotationChange) {
      circleRotationCounter += 1;

      if (config.rotationGradualIncrementAmount) {
        rotation += config.rotationGradualIncrementAmount;
      }

      // NOTE: There's a small change that rotation changes will become
      // disabled on the next circle, meaning no more following circles
      // will have rotation after that.
      //
      // The chance will be 1 in N where N is the total number of circles.
      isRotationChangeEnabled = !(Math.random() < 1 / config.totalCircles);
    } else {
      rotation = getRandomNumber(0, config.maxRotation);

      if (config.isRotationChangeCircleNumberReset) {
        numberOfCirclesUntilRotationChange = getRandomNumber(0, 20);
      }

      circleRotationCounter = 0;
    }
  }

  if (!isRotationChangeEnabled) {
    // NOTE: If rotation changes are initially not enabled, there's a 1 in N chance
    // that they will become enabled (where N is number of total circles)
    isRotationChangeEnabled = Math.random() < 1 / config.totalCircles;
  }

  if (isBorderRadiusChangeEnabled) {
    if (circleBorderRadiusCounter < numberOfCirclesUntilBorderRadiusChange) {
      circleBorderRadiusCounter += 1;

      if (config.borderRadiusGradualIncrementAmount) {
        borderRadius += config.borderRadiusGradualIncrementAmount;
      }

      // NOTE: There's a small change that border radius changes will become
      // disabled on the next circle, meaning no more following circles
      // will have border radius changes after that.
      //
      // The chance will be 1 in N where N is the total number of circles.
      isBorderRadiusChangeEnabled = !(Math.random() < 1 / config.totalCircles);
    } else {
      borderRadius = getRandomNumber(config.borderRadiusMinPercent, config.borderRadiusMaxPercent);

      if (config.isBorderRadiusChangeCircleNumberReset) {
        numberOfCirclesUntilBorderRadiusChange = getRandomNumber(0, 20);
      }

      circleBorderRadiusCounter = 0;
    }
  }

  if (!isBorderRadiusChangeEnabled) {
    // NOTE: If border radius changes are initially not enabled, there's a 1 in N chance
    // that they will become enabled (where N is number of total circles)
    isBorderRadiusChangeEnabled = Math.random() < 1 / config.totalCircles;
  }

  // NOTE: Either we use a gradient for the circle colour,
  // or a single colour. In either case we need a colour to
  // use for the box shadow — in the case of a single colour,
  // we just use that colour; in the case of a gradient, we
  // use one of the two colours we used for the gradient.
  var boxShadowColor = void 0;
  var color1 = getRandomColorFromColors();
  var color2 = getRandomColorFromColors();

  if (config.isCircleGradientsEnabled) {
    if (Math.random() < config.circleGradientProbability) {
      color = getRandomGradientFromColors(null, color1, color2);
      boxShadowColor = color1;
    } else {
      color = color1;
      boxShadowColor = color;
    }
  } else {
    color = getRandomColorFromColors();
    boxShadowColor = color;
  }

  var circleGlowOpacity = config.isCircleGlowOpacityPerCircle ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10 : config.defaultCircleGlowOpacity;

  boxShadowColor = boxShadowColor.replace('rgb', 'rgba').replace(')', ',' + circleGlowOpacity + ')');

  circle.style.width = diameter + 'px';
  circle.style.height = diameter + 'px';
  circle.style.opacity = opacity;
  circle.style.background = color;
  circle.style.position = 'relative';
  circle.style.top = topOffset + 'px';
  circle.style.left = leftOffset + 'px';
  circle.style.flex = 'none';
  circle.style.transform = 'rotate(' + rotation + 'deg)';
  circle.style.borderRadius = borderRadius + '%';
  circle.style.boxShadow = '0 0 ' + getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur) + 'px 0 ' + boxShadowColor;

  if (config.trianglesEnabled && Math.random() < config.trianglesProbability) {
    circle.style.borderRadius = 0;
    circle.style.clipPath = 'polygon(50% 10%, 0% 100%, 100% 100%)';
  }

  // NOTE: Commenting out the 'markmarking' behaviour
  // as this currently isn't compatible with the gradient
  // colour backgrounds
  //
  // const isDotsDark = config.isDotsDarkCheckPerCircle
  //   ? randomTrueOrFalse() : config.defaultIsDotsDark;

  // if (config.isMarkmakingPresent) {
  //   circle.style.backgroundImage = `url('./dots-${isDotsDark ? 'dark' : 'light'}-transparent.png')`;
  //   circle.style.backgroundSize = '200px auto';
  //   circle.style.backgroundPosition = `${getRandomNumber(0, 100)}% ${getRandomNumber(0, 100)}%`;
  //   circle.style.backgroundBlendMode = isDotsDark ? 'color-dodge' : 'color-burn';
  // }

  if (config.layout === 'grid') {
    var width = window.innerWidth / Math.sqrt(config.totalCircles);
    var height = window.innerHeight / Math.sqrt(config.totalCircles);

    circleContainer.style.width = width + 'px';
    circleContainer.style.zIndex = '2';
    circleContainer.style.height = height + 'px';
    circleContainer.style.display = 'flex';
    circleContainer.style.justifyContent = 'center';
    circleContainer.style.alignItems = 'center';

    circleContainer.appendChild(circle);
  } else if (config.layout === 'snake') {
    if (!topValue) topValue = getRandomNumber(0 - diameter, window.innerHeight);
    if (!leftValue) leftValue = getRandomNumber(0 - diameter, window.innerWidth);

    circle.style.transform = 'translateY(' + topOffset + 'px) translateX(' + leftOffset + 'px) rotate(' + rotation + 'deg)';
    circle.style.top = topValue + 'px';
    circle.style.left = leftValue + 'px';
    circle.style.zIndex = '2';
    circle.style.position = 'absolute';

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
  }

  return config.layout === 'grid' ? circleContainer : circle;
};

// if (config.layout === 'snake') {
//   let topValue;
//   let leftValue;
//   let snakeDirection = config.defaultSnakeDirection;

//   let circleDirectionCounter = 0;
//   let numberOfCirclesUntilDirectionChange = config.numberOfCirclesUntilDirectionChange;

//   let circleDiameterCounter = 0;
//   let diameter = config.defaultCircleDiameter;
//   let numberOfCirclesUntilDiameterChange = config.numberOfCirclesUntilDiameterChange;
//   let isDiameterChangeEnabled = config.isDiameterChangeEnabled;

//   let circleOffsetCounter = 0;
//   let topOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
//   let leftOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
//   let numberOfCirclesUntilGridOffsetChange = config.numberOfCirclesUntilGridOffsetChange;
//   let isGridOffsetChangeEnabled = config.isGridOffsetChangeEnabled;

//   let circleOpacityCounter = 0;
//   let opacity = 1;
//   let numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange;
//   let isOpacityChangeEnabled = config.isOpacityChangeEnabled;

//   let circleBorderRadiusCounter = 0;
//   let borderRadius = config.defaultBorderRadius;
//   let numberOfCirclesUntilBorderRadiusChange = config.numberOfCirclesUntilBorderRadiusChange;
//   let isBorderRadiusChangeEnabled = config.isBorderRadiusChangeEnabled;

//   let circleRotationCounter = 0;
//   let rotation = config.defaultRotation;
//   let numberOfCirclesUntilRotationChange = config.numberOfCirclesUntilRotationChange;
//   let isRotationChangeEnabled = config.isRotationChangeEnabled;

//   let circleGradientCounter = 0;
//   let circleGradient = config.defaultCircleGradient;
//   let numberOfCirclesUntilCircleGradientChange = config.numberOfCirclesUntilCircleGradientChange;
//   let isCircleGradientChangeEnabled = config.isCircleGradientChangeEnabled;

//   createCircle = () => {
//     const isDotsDark = config.isDotsDarkCheckPerCircle
//       ? randomTrueOrFalse() : config.defaultIsDotsDark;

//     if (isDiameterChangeEnabled) {
//       if (circleDiameterCounter < numberOfCirclesUntilDiameterChange) {
//         circleDiameterCounter += 1;

//         if (config.diameterGradualIncrementAmount) {
//           diameter += config.diameterGradualIncrementAmount;
//         }

//         // NOTE: There's a small change that diameter changes will become
//         // disabled on the next circle, meaning no more following circles
//         // will have diameter changes after that.
//         //
//         // The chance will be 1 in N where N is the total number of circles.
//         isDiameterChangeEnabled = Math.random() < (1 / config.totalCircles) ? false : true;
//       } else {
//         diameter = getRandomCircleDiameter(
//           config.isCircleDiameterMaxRandomPerDirection, config.circleDiameterMax,
//         );

//         if (config.isDiameterChangeCircleNumberReset) {
//           numberOfCirclesUntilDiameterChange = getRandomNumber(0, 20);
//         }

//         circleDiameterCounter = 0;
//       }
//     }

//     if (!isDiameterChangeEnabled) {
//       // NOTE: If diameter changes are initially not enabled, there's a 1 in N chance
//       // that they will become enabled (where N is number of total circles)
//       isDiameterChangeEnabled = Math.random() < (1 / config.totalCircles) ? true : false;
//     }

//     if (isCircleGradientChangeEnabled) {
//       if (circleGradientCounter < numberOfCirclesUntilCircleGradientChange) {
//         circleGradientCounter += 1;

//         if (config.rotationGradualIncrementAmount) {
//           circleGradient += config.circleGradientGradualIncrementAmount;
//         }

//         // NOTE: There's a small change that offset changes will become
//         // disabled on the next circle, meaning no more following circles
//         // will have position offsets after that.
//         //
//         // The chance will be 1 in N where N is the total number of circles.
//         isCircleGradientChangeEnabled = Math.random() < (1 / config.totalCircles) ? false : true;
//       } else {
//         circleGradient = getRandomNumber(0, 360);

//         if (config.isOffsetChangeCircleNumberReset) {
//           numberOfCirclesUntilCircleGradientChange = getRandomNumber(0, 20);
//         }

//         circleGradientCounter = 0;
//       }
//     }

//     if (!isCircleGradientChangeEnabled) {
//       // NOTE: If position offset changes are initially not enabled, there's a 1 in N chance
//       // that they will become enabled (where N is number of total circles)
//       isCircleGradientChangeEnabled = Math.random() < (1 / config.totalCircles) ? true : false;
//     }

//     if (isBorderRadiusChangeEnabled) {
//       if (circleBorderRadiusCounter < numberOfCirclesUntilBorderRadiusChange) {
//         circleBorderRadiusCounter += 1;

//         if (config.borderRadiusGradualIncrementAmount) {
//           borderRadius += config.borderRadiusGradualIncrementAmount;
//         }

//         // NOTE: There's a small change that border radius changes will become
//         // disabled on the next circle, meaning no more following circles
//         // will have border radius changes after that.
//         //
//         // The chance will be 1 in N where N is the total number of circles.
//         isBorderRadiusChangeEnabled = Math.random() < (1 / config.totalCircles) ? false : true;
//       } else {
//         borderRadius = getRandomNumber(config.borderRadiusMinPercent, config.borderRadiusMaxPercent);

//         if (config.isBorderRadiusChangeCircleNumberReset) {
//           numberOfCirclesUntilBorderRadiusChange = getRandomNumber(0, 20);
//         }

//         circleBorderRadiusCounter = 0;
//       }
//     }

//     if (!isBorderRadiusChangeEnabled) {
//       // NOTE: If border radius changes are initially not enabled, there's a 1 in N chance
//       // that they will become enabled (where N is number of total circles)
//       isBorderRadiusChangeEnabled = Math.random() < (1 / config.totalCircles) ? true : false;
//     }

//     if (isGridOffsetChangeEnabled) {
//       if (circleOffsetCounter < numberOfCirclesUntilGridOffsetChange) {
//         circleOffsetCounter += 1;

//         if (config.offsetGradualIncrementAmount) {
//           topOffset += config.offsetGradualIncrementAmount;
//           leftOffset += config.offsetGradualIncrementAmount;
//         }

//         // NOTE: There's a small change that offset changes will become
//         // disabled on the next circle, meaning no more following circles
//         // will have position offsets after that.
//         //
//         // The chance will be 1 in N where N is the total number of circles.
//         isGridOffsetChangeEnabled = Math.random() < (1 / config.totalCircles) ? false : true;
//       } else {
//         topOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));
//         leftOffset = makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset));

//         if (config.isOffsetChangeCircleNumberReset) {
//           numberOfCirclesUntilGridOffsetChange = getRandomNumber(0, 20);
//         }

//         circleOffsetCounter = 0;
//       }
//     }

//     if (!isGridOffsetChangeEnabled) {
//       // NOTE: If position offset changes are initially not enabled, there's a 1 in N chance
//       // that they will become enabled (where N is number of total circles)
//       isGridOffsetChangeEnabled = Math.random() < (1 / config.totalCircles) ? true : false;
//     }


//     if (isOpacityChangeEnabled) {
//       if (circleOpacityCounter < numberOfCirclesUntilOpacityChange) {
//         circleOpacityCounter += 1;

//         if (config.opacityGradualIncrementAmount) {
//           opacity -= config.opacityGradualIncrementAmount;
//         }

//         // NOTE: There's a small change that opacity changes will become
//         // disabled on the next circle, meaning no more following circles
//         // will have opacity changes after that.
//         //
//         // The chance will be 1 in N where N is the total number of circles.
//         isOpacityChangeEnabled = Math.random() < (1 / config.totalCircles) ? false : true;
//       } else {
//         opacity = getRandomNumber(0, 100) / 100;

//         if (config.isOpacityChangeCircleNumberReset) {
//           numberOfCirclesUntilOpacityChange = getRandomNumber(0, 20);
//         }

//         circleOpacityCounter = 0;
//       }
//     }

//     if (!isOpacityChangeEnabled) {
//       // NOTE: If opacity changes are initially not enabled, there's a 1 in N chance
//       // that they will become enabled (where N is number of total circles)
//       isOpacityChangeEnabled = Math.random() < (1 / config.totalCircles) ? true : false;
//     }

//     if (isRotationChangeEnabled) {
//       if (circleRotationCounter < numberOfCirclesUntilRotationChange) {
//         circleRotationCounter += 1;

//         if (config.rotationGradualIncrementAmount) {
//           rotation += config.rotationGradualIncrementAmount;
//         }

//         // NOTE: There's a small change that rotation changes will become
//         // disabled on the next circle, meaning no more following circles
//         // will have rotation after that.
//         //
//         // The chance will be 1 in N where N is the total number of circles.
//         isRotationChangeEnabled = Math.random() < (1 / config.totalCircles) ? false : true;
//       } else {
//         rotation = getRandomNumber(0, config.maxRotation);

//         if (config.isRotationChangeCircleNumberReset) {
//           numberOfCirclesUntilRotationChange = getRandomNumber(0, 20);
//         }

//         circleRotationCounter = 0;
//       }
//     }

//     if (!isRotationChangeEnabled) {
//       // NOTE: If rotation changes are initially not enabled, there's a 1 in N chance
//       // that they will become enabled (where N is number of total circles)
//       isRotationChangeEnabled = Math.random() < (1 / config.totalCircles) ? true : false;
//     }

//     if (!topValue) topValue = getRandomNumber(0 - diameter, window.innerHeight);
//     if (!leftValue) leftValue = getRandomNumber(0 - diameter, window.innerWidth);

//     const circle = document.createElement('div');

//     let color;

//     if (config.isCircleGradientsEnabled) {
//       color = Math.random() < config.circleGradientProbability
//         ? getRandomGradientFromColors(circleGradient) : getRandomColorFromColors();
//     } else {
//       color = getRandomColorFromColors();
//     }

//     circle.style.opacity = opacity;
//     circle.style.transform = `translateY(${topOffset}px) translateX(${leftOffset}px) rotate(${rotation}deg)`;
//     circle.style.width = `${diameter}px`;
//     circle.style.height = `${diameter}px`;
//     circle.style.zIndex = '2';
//     circle.style.borderRadius = `${borderRadius}%`;
//     circle.style.position = 'absolute';
//     circle.style.top = `${topValue}px`;
//     circle.style.left = `${leftValue}px`;
//     circle.style.background = color;

//     if (config.trianglesEnabled && Math.random() < config.trianglesProbability) {
//       circle.style.borderRadius = 0;
//       circle.style.clipPath = 'polygon(50% 10%, 0% 100%, 100% 100%)';
//     }

//     const circleGlowOpacity = config.isCircleGlowOpacityPerCircle
//       ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10
//       : config.defaultCircleGlowOpacity;

//     const boxShadowColor = getRandomColorFromColors()
//       .replace('rgb', 'rgba')
//       .replace(
//         ')',
//         `,${circleGlowOpacity})`,
//       );

//     circle.style.boxShadow = `0 0 ${getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur)}px 0 ${boxShadowColor}`;

//     if (config.isMarkmakingPresent) {
//       circle.style.backgroundImage = `url('./dots-${isDotsDark ? 'dark' : 'light'}-transparent.png')`;
//       circle.style.backgroundSize = '300px auto';
//       circle.style.backgroundPosition = `${getRandomNumber(0, 100)}% ${getRandomNumber(0, 100)}%`;
//       circle.style.backgroundBlendMode = isDotsDark ? 'color-dodge' : 'color-burn';
//     }

//     let directionIncrements;

//     // if it hits the window edges in any location, find a new random starting point for everything
//     if (
//       topValue > window.innerHeight
//       || topValue < 0
//       || leftValue > window.innerWidth
//       || leftValue < 0
//     ) {
//       topValue = getRandomNumber(0, window.innerHeight);
//       leftValue = getRandomNumber(0, window.innerWidth);

//       snakeDirection = config.isDirectionDifferentOnReset
//         ? getSnakeDirection() : config.defaultSnakeDirection;

//       directionIncrements = config.isDirectionIncrementsDifferentOnReset
//         ? makeDirectionIncrements(0, config.isSnakeAngleRandomPerDirection, config.snakeAngleMax)
//         : config.defaultDirectionIncrements;
//     }

//     if (numberOfCirclesUntilDirectionChange) {
//       if (circleDirectionCounter < numberOfCirclesUntilDirectionChange) {
//         circleDirectionCounter += 1;
//       } else {
//         snakeDirection = getSnakeDirection();

//         if (config.isDirectionChangeCircleNumberReset) {
//           numberOfCirclesUntilDirectionChange = getRandomNumber(0, 20);
//         }

//         circleDirectionCounter = 0;
//       }
//     }

//     directionIncrements = config.isDirectionIncrementsDifferentPerCircle
//       ? makeDirectionIncrements(0, config.isSnakeAngleRandomPerDirection, config.snakeAngleMax)
//       : config.defaultDirectionIncrements;

//     topValue += directionIncrements[snakeDirection].top;
//     leftValue += directionIncrements[snakeDirection].left;

//     return circle;
//   };
// }

var circles = [].concat(_toConsumableArray(Array(config.totalCircles))).map(function () {
  return createCircle();
});

circles.forEach(function (circle) {
  document.getElementById('background').appendChild(circle);
});

// console.log('config:', config);