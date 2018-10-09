'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AVAILABLE_LAYOUTS = ['grid', 'snake', 'inline'];

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

var AVAILABLE_LINE_STYLES = ['solid', 'dotted', 'dashed'];

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

var getRandomLineStyle = function getRandomLineStyle() {
  return AVAILABLE_LINE_STYLES[getRandomNumber(0, AVAILABLE_LINE_STYLES.length - 1)];
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
var circleDiameterMaxDimension = 250;
var lineLengthMin = 3;
var lineLengthMax = circleDiameterMaxDimension; // NOTE: Same as max diameter

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
  // NOTE: Get between 4 - 10% of the window's height to use as the
  // height/width of a frame
  frameDimension: window.innerHeight * (getRandomNumber(3, 7) / 100),
  isFrameAboveCircles: randomTrueOrFalse(),
  // isFrameEnabled: randomTrueOrFalse(),
  isFrameEnabled: false,
  // isCirclesContainerInsideFrame: randomTrueOrFalse(),
  isCirclesContainerInsideFrame: false,
  boxShadowMaxBlur: 200,
  boxShadowMinBlur: 100,
  defaultCircleDiameter: getRandomNumber(20, 50),
  circleDiameterMax: getRandomNumber(20, circleDiameterMaxDimension),
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
  totalCircles: layout === 'grid' ? getRandomSquareNumber(100, 600) : getRandomNumber(300, 600),

  isCircleGradientsEnabled: randomTrueOrFalse(),
  circleGradientProbability: getRandomNumber(0, 10) / 10,

  trianglesEnabled: randomTrueOrFalse(),
  trianglesProbability: getRandomNumber(0, 10) / 10,

  isCircleGradientAngleChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilCircleGradientAngleChange: getRandomNumber(0, 20),
  circleGradientAngleGradualIncrementAmount: getRandomNumber(2, 20),
  isCircleGradientAngleChangeCircleNumberReset: randomTrueOrFalse(),
  defaultCircleGradientAngle: defaultCircleGradientAngle,

  innerCircleEnabled: randomTrueOrFalse(),
  innerCircleProbability: getRandomNumber(0, 10) / 10,
  innerCircleTotalMax: 3,

  // NOTE: This determines whether lines & other shapes
  // will only appear within the parent circle (or whether
  // they can overflow)
  isParentCircleOverflowHidden: randomTrueOrFalse(),

  isLinesEnabled: randomTrueOrFalse(),

  isLineLengthChangeEnabled: randomTrueOrFalse(),
  numberOfCirclesUntilLineLengthChange: getRandomNumber(0, 10),
  lineLengthGradualIncrementAmount: getRandomNumber(0, 2),
  isLineLengthChangeCircleNumberReset: randomTrueOrFalse(),
  defaultLineLength: getRandomNumber(lineLengthMin, lineLengthMax),
  defaultLineStyle: getRandomLineStyle(),
  defaultLineWidth: 2,
  isLineStyleRandomPerCircle: randomTrueOrFalse(),
  lineLengthMin: lineLengthMin,
  lineLengthMax: lineLengthMax
};

if (!config.isDotsBackground) {
  document.getElementById('dots-dark-background').remove();
  document.getElementById('dots-light-background').remove();
} else if (config.isDotsBackgroundDark) {
  document.getElementById('dots-light-background').remove();
} else {
  document.getElementById('dots-dark-background').remove();
}

var circlesContainer = config.isCirclesContainerInsideFrame ? document.getElementById('frame-middle-centre') : document.getElementById('background');

if (config.isFrameEnabled) {
  if (config.isFrameAboveCircles) {
    document.getElementById('frame').style.zIndex = '3';
  }

  document.getElementById('frame-top').style.height = config.frameDimension + 'px';
  document.getElementById('frame-top').style.backgroundColor = getRandomColorFromColors();

  document.getElementById('frame-bottom').style.height = config.frameDimension + 'px';
  document.getElementById('frame-bottom').style.backgroundColor = getRandomColorFromColors();

  document.getElementById('frame-middle-left').style.width = config.frameDimension + 'px';
  document.getElementById('frame-middle-left').style.backgroundColor = getRandomColorFromColors();

  document.getElementById('frame-middle-right').style.width = config.frameDimension + 'px';
  document.getElementById('frame-middle-right').style.backgroundColor = getRandomColorFromColors();
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
var lineLength = config.defaultLineLength;
var circleDirectionCounter = 0;
var circleLineLengthCounter = 0;

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
    numberOfCirclesUntilDirectionChange = config.numberOfCirclesUntilDirectionChange,
    isLineLengthChangeEnabled = config.isLineLengthChangeEnabled,
    numberOfCirclesUntilLineLengthChange = config.numberOfCirclesUntilLineLengthChange;


var topOffset = isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;

var leftOffset = isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;

var insertCircleInGridItem = function insertCircleInGridItem(circle) {
  var circleContainer = document.createElement('div');

  circleContainer.classList.add('circle-container');

  var width = circlesContainer.offsetWidth / Math.sqrt(config.totalCircles);
  var height = circlesContainer.offsetHeight / Math.sqrt(config.totalCircles);

  circleContainer.style.width = width + 'px';
  circleContainer.style.height = height + 'px';

  circleContainer.appendChild(circle);

  return circleContainer;
};

var positionCircle = function positionCircle(circle) {
  var element = circle;

  if (!topValue) topValue = getRandomNumber(0 - diameter, circlesContainer.offsetHeight);
  if (!leftValue) leftValue = getRandomNumber(0 - diameter, circlesContainer.offsetWidth);

  element.style.transform = 'translateY(' + topOffset + 'px) translateX(' + leftOffset + 'px) rotate(' + rotation + 'deg)';
  element.style.top = topValue + 'px';
  element.style.left = leftValue + 'px';
  element.style.zIndex = '2';
  element.style.position = 'absolute';

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

  return element;
};

var createCircle = function createCircle() {
  var circle = document.createElement('div');

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

  if (config.isParentCircleOverflowHidden) {
    circle.style.overflow = 'hidden';
  }

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

  if (config.isLinesEnabled) {
    if (isLineLengthChangeEnabled) {
      if (circleLineLengthCounter < numberOfCirclesUntilLineLengthChange) {
        circleLineLengthCounter += 1;

        if (config.lineLengthGradualIncrementAmount) {
          lineLength += config.lineLengthGradualIncrementAmount;
        }

        // NOTE: There's a small change that line length changes will become
        // disabled on the next circle, meaning no more following circles
        // will have line length changes after that.
        //
        // The chance will be 1 in N where N is the total number of circles.
        isLineLengthChangeEnabled = !(Math.random() < 1 / config.totalCircles);
      } else {
        lineLength = getRandomNumber(config.lineLengthMin, diameter * 1.5);

        if (config.isLineLengthChangeCircleNumberReset) {
          numberOfCirclesUntilLineLengthChange = getRandomNumber(0, 20);
        }

        circleLineLengthCounter = 0;
      }
    }

    if (!isLineLengthChangeEnabled) {
      // NOTE: If line length changes are initially not enabled, there's a 1 in N chance
      // that they will become enabled (where N is number of total circles)
      isLineLengthChangeEnabled = Math.random() < 1 / config.totalCircles;
    }

    var line = document.createElement('div');
    line.style.width = lineLength + 'px';
    line.style.height = lineLength + 'px';
    line.style.borderRadius = borderRadius + 'px';
    // line.style.borderWidth = '2px 0 0 0';
    line.style.borderWidth = config.defaultLineWidth + 'px';

    line.style.borderStyle = config.isLineStyleRandomPerCircle ? getRandomLineStyle() : config.defaultLineStyle;

    line.style.borderColor = getRandomColorFromColors();
    line.style.zIndex = '3';
    line.style.position = 'absolute';
    line.style.top = circle.style.width / 2 + 'px';
    line.style.left = circle.style.height / 2 + 'px';

    circle.appendChild(line);
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

  return circle;
};

var insertInnerCircle = function insertInnerCircle(containerElement, innerElement) {
  var circle = containerElement;
  var innerCircle = innerElement || createCircle();

  var innerCircleDimension = parseFloat(innerCircle.style.width.replace('px', ''));
  var dimensionFraction = innerCircleDimension * (getRandomNumber(5, 8) / 10);

  innerCircle.style.width = dimensionFraction + 'px';
  innerCircle.style.height = dimensionFraction + 'px';

  circle.style.display = 'flex';
  circle.style.justifyContent = 'center';
  circle.style.alignItems = 'center';

  circle.appendChild(innerCircle);
  return circle;
};

var circles = [].concat(_toConsumableArray(Array(config.totalCircles))).map(function () {
  var circle = createCircle();

  var totalInnerCircles = getRandomNumber(0, config.innerCircleTotalMax);

  if (totalInnerCircles) {
    var elementToAppendTo = circle;

    [].concat(_toConsumableArray(Array(totalInnerCircles))).forEach(function () {
      var newCircle = createCircle();
      elementToAppendTo = insertInnerCircle(elementToAppendTo, newCircle);
      elementToAppendTo = newCircle;
    });
  }

  if (config.innerCircleEnabled && Math.random() < config.innerCircleProbability) {
    circle = insertInnerCircle(circle, null);
  }

  if (config.layout === 'grid') {
    circle = insertCircleInGridItem(circle);
  } else if (config.layout === 'snake') {
    circle = positionCircle(circle);
  }

  return circle;
});

circles.forEach(function (circle) {
  circlesContainer.appendChild(circle);
});

console.log('config:', config);