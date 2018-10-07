const AVAILABLE_LAYOUTS = [
  'grid',
  'snake',
  'inline', // NOTE: This will just place circles one after the other inline
];

const AVAILABLE_SNAKE_DIRECTIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOP_RIGHT: 'top_right',
  BOTTOM_RIGHT: 'bottom_right',
  BOTTOM_LEFT: 'bottom_left',
  TOP_LEFT: 'top_left',
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const isSquare = n => n > 0 && Math.sqrt(n) % 1 === 0;

const getRandomSquareNumber = (min, max) => {
  const number = getRandomNumber(min, max);
  return isSquare(number) ? number : getRandomSquareNumber(min, max);
};

const randomTrueOrFalse = () => Math.random() < 0.5;

const makeNumberRandomlyNegative = (number) => {
  if (randomTrueOrFalse()) return -number;
  return number;
};

const getRandomSnakeAngle = (isSnakeAngleMaxRandomPerDirection, snakeAngleMax) => getRandomNumber(
  10, isSnakeAngleMaxRandomPerDirection ? getRandomNumber(10, 50) : snakeAngleMax,
);

const makeDirectionIncrements = (snakeAngle, isSnakeAngleRandomPerDirection, snakeAngleMax) => ({
  [AVAILABLE_SNAKE_DIRECTIONS.TOP]: {
    top: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: 0,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.RIGHT]: {
    top: 0,
    left: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
  },
  [AVAILABLE_SNAKE_DIRECTIONS.BOTTOM]: {
    top: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: 0,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.LEFT]: {
    top: 0,
    left: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
  },
  [AVAILABLE_SNAKE_DIRECTIONS.TOP_RIGHT]: {
    top: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
  },
  [AVAILABLE_SNAKE_DIRECTIONS.BOTTOM_RIGHT]: {
    top: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
  },
  [AVAILABLE_SNAKE_DIRECTIONS.BOTTOM_LEFT]: {
    top: snakeAngle || getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
  },
  [AVAILABLE_SNAKE_DIRECTIONS.TOP_LEFT]: {
    top: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
    left: -snakeAngle || -getRandomSnakeAngle(isSnakeAngleRandomPerDirection, snakeAngleMax),
  },
});

const getRandomColor = (min, max) => {
  min = min || 0;
  max = max || 255;
  return `rgb(${getRandomNumber(min, max)}, ${getRandomNumber(min, max)}, ${getRandomNumber(min, max)})`;
};

const getRandomCircleDiameter = (
  isCircleDiameterMaxRandomPerDirection,
  circleDiameterMax,
) => getRandomNumber(
  20,
  isCircleDiameterMaxRandomPerDirection
    ? getRandomNumber(20, 50) : circleDiameterMax,
);

const getColors = (
  isCircleColorIncremental,
  minColorsTotal,
  isCircleRValueIncremental,
  isCircleGValueIncremental,
  isCircleBValueIncremental,
) => {
  if (isCircleColorIncremental) {
    let rValue;
    let gValue;
    let bValue;

    return [...Array(getRandomNumber(minColorsTotal, 50))].map(() => {
      if (!rValue || rValue > 255 || rValue < 0) rValue = getRandomNumber(0, 255);
      if (!gValue || gValue > 255 || gValue < 0) gValue = getRandomNumber(0, 255);
      if (!bValue || bValue > 255 || bValue < 0) bValue = getRandomNumber(0, 255);

      const color = `rgb(${rValue}, ${gValue}, ${bValue})`;

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

  return [...Array(getRandomNumber(minColorsTotal, 50))].map(() => getRandomColor());
};

const circleGlowMinOpacity = 5; // out of 10
const circleGlowMaxOpacity = 10; // out of 10
const layout = AVAILABLE_LAYOUTS[getRandomNumber(0, AVAILABLE_LAYOUTS.length)];
const defaultSnakeAngle = getRandomNumber(10, 50);
const isCircleColorIncremental = randomTrueOrFalse();
const minColorsTotal = 3;
const isCircleRValueIncremental = randomTrueOrFalse();
const isCircleGValueIncremental = randomTrueOrFalse();
const isCircleBValueIncremental = randomTrueOrFalse();

const colors = getColors(
  isCircleColorIncremental,
  minColorsTotal,
  isCircleRValueIncremental,
  isCircleGValueIncremental,
  isCircleBValueIncremental,
);

const getRandomColorFromColors = () => colors[getRandomNumber(0, colors.length - 1)];

const allowedSnakeDirections = Object.keys(AVAILABLE_SNAKE_DIRECTIONS).slice(
  0,
  getRandomNumber(1, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length - 1),
);

const getSnakeDirection = () => AVAILABLE_SNAKE_DIRECTIONS[
  allowedSnakeDirections[
    getRandomNumber(0, allowedSnakeDirections.length - 1)
  ]
];

const getRandomGradient = angle => `
  linear-gradient(
    ${angle || getRandomNumber(0, 360)}deg, ${getRandomColor()}, ${getRandomColor()}
  )
`.trim();

const getRandomGradientFromColors = (angle, color1, color2) => `
  linear-gradient(
    ${angle || getRandomNumber(0, 360)}deg, ${color1 || getRandomColorFromColors()}, ${color2 || getRandomColorFromColors()}
  )
`.trim();

const defaultCircleGradientAngle = getRandomNumber(0, 360);

const config = {
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
  circleDiameterMax: getRandomNumber(20, 120),
  circleGlowMaxOpacity,
  circleGlowMinOpacity,
  colors,

  defaultCircleGlowOpacity: getRandomNumber(circleGlowMinOpacity, circleGlowMaxOpacity) / 10,
  defaultDirectionIncrements: makeDirectionIncrements(defaultSnakeAngle),
  isCircleColorIncremental,
  isCircleRValueIncremental,
  isCircleGValueIncremental,
  isCircleBValueIncremental,
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
  layout,
  minColorsTotal,
  defaultSnakeAngle,
  allowedSnakeDirections,
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
  defaultCircleGradientAngle,

  innerCircleEnabled: randomTrueOrFalse(),
  innerCircleProbability: getRandomNumber(0, 10) / 10,
  innerCircleTotalMax: 3,
};

if (!config.isDotsBackground) {
  document.getElementById('dots-dark-background').remove();
  document.getElementById('dots-light-background').remove();
} else if (config.isDotsBackgroundDark) {
  document.getElementById('dots-light-background').remove();
} else {
  document.getElementById('dots-dark-background').remove();
}

const circlesContainer = config.isCirclesContainerInsideFrame
  ? document.getElementById('frame-middle-centre')
  : document.getElementById('background');

if (config.isFrameEnabled) {
  if (config.isFrameAboveCircles) {
    document.getElementById('frame').style.zIndex = '3';
  }

  document.getElementById('frame-top').style.height = `${config.frameDimension}px`;
  document.getElementById('frame-top').style.backgroundColor = getRandomColorFromColors();

  document.getElementById('frame-bottom').style.height = `${config.frameDimension}px`;
  document.getElementById('frame-bottom').style.backgroundColor = getRandomColorFromColors();

  document.getElementById('frame-middle-left').style.width = `${config.frameDimension}px`;
  document.getElementById('frame-middle-left').style.backgroundColor = getRandomColorFromColors();

  document.getElementById('frame-middle-right').style.width = `${config.frameDimension}px`;
  document.getElementById('frame-middle-right').style.backgroundColor = getRandomColorFromColors();
}

document.getElementById('background').style.background = config.backgroundColor;

let circleDiameterCounter = 0;
let diameter = config.defaultCircleDiameter;
let circleOpacityCounter = 0;
let opacity = 1;
let color;
let circleOffsetCounter = 0;
let circleRotationCounter = 0;
let rotation = config.defaultRotation;
let circleBorderRadiusCounter = 0;
let borderRadius = config.defaultBorderRadius;
let topValue;
let leftValue;
let snakeDirection = config.defaultSnakeDirection;
let circleDirectionCounter = 0;

let {
  numberOfCirclesUntilDiameterChange,
  numberOfCirclesUntilOpacityChange,
  numberOfCirclesUntilGridOffsetChange,
  isDiameterChangeEnabled,
  isOpacityChangeEnabled,
  isGridOffsetChangeEnabled,
  isRotationChangeEnabled,
  isBorderRadiusChangeEnabled,
  numberOfCirclesUntilRotationChange,
  numberOfCirclesUntilBorderRadiusChange,
  numberOfCirclesUntilDirectionChange,
} = config;

let topOffset = isGridOffsetChangeEnabled
  ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset))
  : 0;

let leftOffset = isGridOffsetChangeEnabled
  ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset))
  : 0;

const insertCircleInGridItem = (circle) => {
  const circleContainer = document.createElement('div');

  circleContainer.classList.add('circle-container');

  const width = circlesContainer.offsetWidth / Math.sqrt(config.totalCircles);
  const height = circlesContainer.offsetHeight / Math.sqrt(config.totalCircles);

  circleContainer.style.width = `${width}px`;
  circleContainer.style.height = `${height}px`;

  circleContainer.appendChild(circle);

  return circleContainer;
};

const positionCircle = (circle) => {
  const element = circle;

  if (!topValue) topValue = getRandomNumber(0 - diameter, circlesContainer.offsetHeight);
  if (!leftValue) leftValue = getRandomNumber(0 - diameter, circlesContainer.offsetWidth);

  element.style.transform = `translateY(${topOffset}px) translateX(${leftOffset}px) rotate(${rotation}deg)`;
  element.style.top = `${topValue}px`;
  element.style.left = `${leftValue}px`;
  element.style.zIndex = '2';
  element.style.position = 'absolute';

  let directionIncrements;

  // if it hits the window edges in any location, find a new random starting point for everything
  if (
    topValue > window.innerHeight
    || topValue < 0
    || leftValue > window.innerWidth
    || leftValue < 0
  ) {
    topValue = getRandomNumber(0, window.innerHeight);
    leftValue = getRandomNumber(0, window.innerWidth);

    snakeDirection = config.isDirectionDifferentOnReset
      ? getSnakeDirection() : config.defaultSnakeDirection;

    directionIncrements = config.isDirectionIncrementsDifferentOnReset
      ? makeDirectionIncrements(0, config.isSnakeAngleRandomPerDirection, config.snakeAngleMax)
      : config.defaultDirectionIncrements;
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

  directionIncrements = config.isDirectionIncrementsDifferentPerCircle
    ? makeDirectionIncrements(0, config.isSnakeAngleRandomPerDirection, config.snakeAngleMax)
    : config.defaultDirectionIncrements;

  topValue += directionIncrements[snakeDirection].top;
  leftValue += directionIncrements[snakeDirection].left;

  return element;
};

const createCircle = () => {
  const circle = document.createElement('div');

  const circleContainer = document.createElement('div');
  circleContainer.classList.add('circle-container');

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
      isDiameterChangeEnabled = !(Math.random() < (1 / config.totalCircles));
    } else {
      diameter = getRandomCircleDiameter(
        config.isCircleDiameterMaxRandomPerDirection, config.circleDiameterMax,
      );

      if (config.isDiameterChangeCircleNumberReset) {
        numberOfCirclesUntilDiameterChange = getRandomNumber(0, 20);
      }

      circleDiameterCounter = 0;
    }
  }

  if (!isDiameterChangeEnabled) {
    // NOTE: If diameter changes are initially not enabled, there's a 1 in N chance
    // that they will become enabled (where N is number of total circles)
    isDiameterChangeEnabled = Math.random() < (1 / config.totalCircles);
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
      isOpacityChangeEnabled = !(Math.random() < (1 / config.totalCircles));
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
    isOpacityChangeEnabled = Math.random() < (1 / config.totalCircles);
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
      isGridOffsetChangeEnabled = !(Math.random() < (1 / config.totalCircles));
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
    isGridOffsetChangeEnabled = Math.random() < (1 / config.totalCircles);
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
      isRotationChangeEnabled = !(Math.random() < (1 / config.totalCircles));
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
    isRotationChangeEnabled = Math.random() < (1 / config.totalCircles);
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
      isBorderRadiusChangeEnabled = !(Math.random() < (1 / config.totalCircles));
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
    isBorderRadiusChangeEnabled = Math.random() < (1 / config.totalCircles);
  }

  // NOTE: Either we use a gradient for the circle colour,
  // or a single colour. In either case we need a colour to
  // use for the box shadow — in the case of a single colour,
  // we just use that colour; in the case of a gradient, we
  // use one of the two colours we used for the gradient.
  let boxShadowColor;
  const color1 = getRandomColorFromColors();
  const color2 = getRandomColorFromColors();

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

  const circleGlowOpacity = config.isCircleGlowOpacityPerCircle
    ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10
    : config.defaultCircleGlowOpacity;

  boxShadowColor = boxShadowColor
    .replace('rgb', 'rgba')
    .replace(
      ')',
      `,${circleGlowOpacity})`,
    );

  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.opacity = opacity;
  circle.style.overflow = 'hidden';
  circle.style.background = color;
  circle.style.position = 'relative';
  circle.style.top = `${topOffset}px`;
  circle.style.left = `${leftOffset}px`;
  circle.style.flex = 'none';
  circle.style.transform = `rotate(${rotation}deg)`;
  circle.style.borderRadius = `${borderRadius}%`;
  circle.style.boxShadow = `0 0 ${getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur)}px 0 ${boxShadowColor}`;

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

  return circle;
};

const insertInnerCircle = (containerElement, innerElement) => {
  const circle = containerElement;
  const innerCircle = innerElement || createCircle();

  const innerCircleDimension = parseFloat(innerCircle.style.width.replace('px', ''));
  const dimensionFraction = innerCircleDimension * (getRandomNumber(7, 9) / 10);

  innerCircle.style.width = `${dimensionFraction}px`;
  innerCircle.style.height = `${dimensionFraction}px`;

  circle.style.display = 'flex';
  circle.style.justifyContent = 'center';
  circle.style.alignItems = 'center';

  circle.appendChild(innerCircle);
  return circle;
};

const circles = [...Array(config.totalCircles)].map(() => {
  let circle = createCircle();

  const totalInnerCircles = getRandomNumber(0, config.innerCircleTotalMax);

  if (totalInnerCircles) {
    let elementToAppendTo = circle;

    [...Array(totalInnerCircles)].forEach(() => {
      const newCircle = createCircle();
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

circles.forEach((circle) => {
  circlesContainer.appendChild(circle);
});

console.log('config:', config);
