const AVAILABLE_LAYOUTS = [
  'confetti',
  'grid',
  'snake',
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

const getSnakeDirection = () => AVAILABLE_SNAKE_DIRECTIONS[
  Object.keys(AVAILABLE_SNAKE_DIRECTIONS)[
    getRandomNumber(0, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length)
  ]
];

const getRandomRgbColour = (min, max) => {
  min = min || 0;
  max = max || 255;
  return `rgb(${getRandomNumber(min, max)}, ${getRandomNumber(min, max)}, ${getRandomNumber(min, max)})`;
};

const getColors = (
  isCircleColourIncremental,
  minColorsTotal,
  isCircleRValueIncremental,
  isCircleGValueIncremental,
  isCircleBValueIncremental,
) => {
  if (isCircleColourIncremental) {
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

  return [...Array(getRandomNumber(minColorsTotal, 50))].map(() => getRandomRgbColour());
};

const circleGlowMinOpacity = 2; // out of 1
const circleGlowMaxOpacity = 7; // out of 1
const layout = AVAILABLE_LAYOUTS[getRandomNumber(0, AVAILABLE_LAYOUTS.length)];
const defaultSnakeAngle = getRandomNumber(10, 50);
const isCircleColourIncremental = randomTrueOrFalse();
const minColorsTotal = 3;
const isCircleRValueIncremental = randomTrueOrFalse();
const isCircleGValueIncremental = randomTrueOrFalse();
const isCircleBValueIncremental = randomTrueOrFalse();

const config = {
  boxShadowMaxBlur: 200,
  boxShadowMinBlur: 100,
  defaultCircleDiameter: getRandomNumber(20, 50),
  circleDiameterMax: getRandomNumber(20, 50),
  circleGlowMaxOpacity,
  circleGlowMinOpacity,
  colors: getColors(
    isCircleColourIncremental,
    minColorsTotal,
    isCircleRValueIncremental,
    isCircleGValueIncremental,
    isCircleBValueIncremental,
  ),
  defaultCircleGlowOpacity: getRandomNumber(circleGlowMinOpacity, circleGlowMaxOpacity) / 10,
  defaultDirectionIncrements: makeDirectionIncrements(defaultSnakeAngle),
  isCircleColourIncremental,
  isCircleRValueIncremental,
  isCircleGValueIncremental,
  isCircleBValueIncremental,
  isCircleDiameterMaxRandomPerDirection: randomTrueOrFalse(),
  isCircleDiameterRandomPerCircle: randomTrueOrFalse(),
  isCircleGlowOpacityPerCircle: randomTrueOrFalse(),
  isDirectionDifferentOnReset: randomTrueOrFalse(),
  isDirectionDifferentPerCircle: randomTrueOrFalse(),
  isDirectionIncrementsDifferentOnReset: randomTrueOrFalse(),
  isDirectionIncrementsDifferentPerCircle: randomTrueOrFalse(),
  isDotsBackground: randomTrueOrFalse(),
  isDotsBackgroundDark: randomTrueOrFalse(),
  isRandomOffsetPerCircle: randomTrueOrFalse(),
  defaultIsDotsDark: randomTrueOrFalse(),
  isDotsDarkCheckPerCircle: randomTrueOrFalse(),
  isMarkmakingPresent: randomTrueOrFalse(),
  isSnakeAngleMaxRandomPerDirection: randomTrueOrFalse(),
  isSnakeAngleRandomPerDirection: randomTrueOrFalse(),
  layout,
  minColorsTotal,
  defaultSnakeAngle,
  defaultSnakeDirection: getSnakeDirection(),
  snakeAngleMax: getRandomNumber(10, 50),
  totalCircles: layout === 'grid' ? getRandomSquareNumber(50, 500) : getRandomNumber(50, 500),
};

const getCircleDiameter = () => {
  if (config.isCircleDiameterRandomPerCircle) {
    return getRandomNumber(
      20,
      config.isCircleDiameterMaxRandomPerDirection
        ? getRandomNumber(20, 50) : config.circleDiameterMax,
    );
  }

  return config.defaultCircleDiameter;
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

let createCircle;

if (config.layout === 'confetti') {
  createCircle = () => {
    const isDotsDark = config.isDotsDarkCheckPerCircle
      ? randomTrueOrFalse() : config.defaultIsDotsDark;

    const circle = document.createElement('div');
    const diameter = getCircleDiameter();
    const color = config.colors[getRandomNumber(0, config.colors.length - 1)];

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.borderRadius = '50%';
    circle.style.zIndex = '2';
    circle.style.position = 'absolute';
    circle.style.top = `${getRandomNumber(0 - diameter, window.innerHeight)}px`;
    circle.style.left = `${getRandomNumber(0 - diameter, window.innerWidth)}px`;
    circle.style.backgroundColor = color;

    const circleGlowOpacity = config.isCircleGlowOpacityPerCircle
      ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10
      : config.defaultCircleGlowOpacity;

    const boxShadowColor = color
      .replace('rgb', 'rgba')
      .replace(
        ')',
        `,${circleGlowOpacity})`,
      );

    circle.style.boxShadow = `0 0 ${getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur)}px 0 ${boxShadowColor}`;

    if (config.isMarkmakingPresent) {
      circle.style.backgroundImage = `url('./dots-${isDotsDark ? 'dark' : 'light'}-transparent.png')`;
      circle.style.backgroundSize = '300px auto';
      circle.style.backgroundPosition = `${getRandomNumber(0, 100)}% ${getRandomNumber(0, 100)}%`;
      circle.style.backgroundBlendMode = isDotsDark ? 'color-dodge' : 'color-burn';
    }

    return circle;
  };
} else if (config.layout === 'grid') {
  const width = window.innerWidth / Math.sqrt(config.totalCircles);
  const height = window.innerHeight / Math.sqrt(config.totalCircles);

  createCircle = () => {
    const isDotsDark = config.isDotsDarkCheckPerCircle
      ? randomTrueOrFalse() : config.defaultIsDotsDark;

    const circleContainer = document.createElement('div');
    const circle = document.createElement('div');
    const color = config.colors[getRandomNumber(0, config.colors.length - 1)];

    circleContainer.style.width = `${width}px`;
    circleContainer.style.zIndex = '2';
    circleContainer.style.height = `${height}px`;
    circleContainer.style.display = 'flex';
    circleContainer.style.justifyContent = 'center';
    circleContainer.style.alignItems = 'center';

    if (config.isRandomOffsetPerCircle) {
      circle.style.position = 'relative';
      circle.style.top = `${makeNumberRandomlyNegative(getRandomNumber(1, 6))}px`;
      circle.style.left = `${makeNumberRandomlyNegative(getRandomNumber(1, 6))}px`;
    }

    const diameter = getCircleDiameter();

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.flex = 'none';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = color;

    const circleGlowOpacity = config.isCircleGlowOpacityPerCircle
      ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10
      : config.defaultCircleGlowOpacity;

    const boxShadowColor = color
      .replace('rgb', 'rgba')
      .replace(
        ')',
        `,${circleGlowOpacity})`,
      );

    circle.style.boxShadow = `0 0 ${getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur)}px 0 ${boxShadowColor}`;

    if (config.isMarkmakingPresent) {
      circle.style.backgroundImage = `url('./dots-${isDotsDark ? 'dark' : 'light'}-transparent.png')`;
      circle.style.backgroundSize = '300px auto';
      circle.style.backgroundPosition = `${getRandomNumber(0, 100)}% ${getRandomNumber(0, 100)}%`;
      circle.style.backgroundBlendMode = isDotsDark ? 'color-dodge' : 'color-burn';
    }

    circleContainer.appendChild(circle);

    return circleContainer;
  };
} else if (config.layout === 'snake') {
  let topValue;
  let leftValue;

  createCircle = () => {
    const isDotsDark = config.isDotsDarkCheckPerCircle
      ? randomTrueOrFalse() : config.defaultIsDotsDark;

    const diameter = getCircleDiameter();

    if (!topValue) topValue = getRandomNumber(0 - diameter, window.innerHeight);
    if (!leftValue) leftValue = getRandomNumber(0 - diameter, window.innerWidth);

    const circle = document.createElement('div');
    const color = config.colors[getRandomNumber(0, config.colors.length - 1)];

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.zIndex = '2';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = `${topValue}px`;
    circle.style.left = `${leftValue}px`;
    circle.style.backgroundColor = color;

    const circleGlowOpacity = config.isCircleGlowOpacityPerCircle
      ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10
      : config.defaultCircleGlowOpacity;

    const boxShadowColor = color
      .replace('rgb', 'rgba')
      .replace(
        ')',
        `,${circleGlowOpacity})`,
      );

    circle.style.boxShadow = `0 0 ${getRandomNumber(config.boxShadowMinBlur, config.boxShadowMaxBlur)}px 0 ${boxShadowColor}`;

    if (config.isMarkmakingPresent) {
      circle.style.backgroundImage = `url('./dots-${isDotsDark ? 'dark' : 'light'}-transparent.png')`;
      circle.style.backgroundSize = '300px auto';
      circle.style.backgroundPosition = `${getRandomNumber(0, 100)}% ${getRandomNumber(0, 100)}%`;
      circle.style.backgroundBlendMode = isDotsDark ? 'color-dodge' : 'color-burn';
    }

    let snakeDirection; let
      directionIncrements;

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
        ? makeDirectionIncrements(config.isSnakeAngleRandomPerDirection, config.snakeAngleMax)
        : config.defaultDirectionIncrements;
    }

    snakeDirection = config.isDirectionDifferentPerCircle
      ? getSnakeDirection() : config.defaultSnakeDirection;

    directionIncrements = config.isDirectionIncrementsDifferentPerCircle
      ? makeDirectionIncrements(config.isSnakeAngleRandomPerDirection, config.snakeAngleMax)
      : config.defaultDirectionIncrements;

    topValue += directionIncrements[snakeDirection].top;
    leftValue += directionIncrements[snakeDirection].left;

    return circle;
  };
}

const circles = [...Array(config.totalCircles)].map(() => createCircle());

circles.forEach((circle) => {
  document.getElementById('background').appendChild(circle);
});

console.log('config:', config);
