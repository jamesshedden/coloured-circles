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

const circleGlowMinOpacity = 2; // out of 1
const circleGlowMaxOpacity = 7; // out of 1
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

const getRandomGradient = () => `
  linear-gradient(
    ${getRandomNumber(0, 360)}deg, ${getRandomColor()}, ${getRandomColor()}
  )
`.trim();

const getRandomGradientFromColors = () => `
  linear-gradient(
    ${getRandomNumber(0, 360)}deg, ${getRandomColorFromColors()}, ${getRandomColorFromColors()}
  )
`.trim();

const config = {
  boxShadowMaxBlur: 200,
  boxShadowMinBlur: 100,
  defaultCircleDiameter: getRandomNumber(20, 50),
  circleDiameterMax: getRandomNumber(20, 50),
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
  // isMarkmakingPresent: randomTrueOrFalse(),
  isMarkmakingPresent: false,
  isSnakeAngleMaxRandomPerDirection: randomTrueOrFalse(),
  isSnakeAngleRandomPerDirection: randomTrueOrFalse(),
  layout,
  minColorsTotal,
  defaultSnakeAngle,
  allowedSnakeDirections,
  backgroundColor: randomTrueOrFalse() ? getRandomColor() : getRandomGradient(),
  defaultSnakeDirection: getSnakeDirection(),
  snakeAngleMax: getRandomNumber(10, 50),
  totalCircles: layout === 'grid' ? getRandomSquareNumber(50, 500) : getRandomNumber(50, 500),

  isCircleGradientsEnabled: randomTrueOrFalse(),
  circleGradientProbability: getRandomNumber(0, 10) / 10,
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

let createCircle;

if (config.layout === 'confetti') {
  let circleDiameterCounter = 0;
  let diameter = config.defaultCircleDiameter;
  let numberOfCirclesUntilDiameterChange = config.numberOfCirclesUntilDiameterChange;

  let circleOpacityCounter = 0;
  let opacity = 1;
  let numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange;

  createCircle = () => {
    const isDotsDark = config.isDotsDarkCheckPerCircle
      ? randomTrueOrFalse() : config.defaultIsDotsDark;

    const circle = document.createElement('div');

    if (config.isDiameterChangeEnabled) {
      if (circleDiameterCounter < numberOfCirclesUntilDiameterChange) {
        circleDiameterCounter += 1;

        if (config.diameterGradualIncrementAmount) {
          diameter += config.diameterGradualIncrementAmount;
        }
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

    let color;

    if (config.isCircleGradientsEnabled) {
      color = Math.random() < config.circleGradientProbability
        ? getRandomGradientFromColors() : getRandomColorFromColors();
    } else {
      color = getRandomColorFromColors();
    }

    circle.style.opacity = opacity;
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.borderRadius = '50%';
    circle.style.zIndex = '2';
    circle.style.position = 'absolute';
    circle.style.top = `${getRandomNumber(0 - diameter, window.innerHeight)}px`;
    circle.style.left = `${getRandomNumber(0 - diameter, window.innerWidth)}px`;
    circle.style.background = color;

    const circleGlowOpacity = config.isCircleGlowOpacityPerCircle
      ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10
      : config.defaultCircleGlowOpacity;

    const boxShadowColor = getRandomColorFromColors()
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

  let circleDiameterCounter = 0;
  let numberOfCirclesUntilDiameterChange = config.numberOfCirclesUntilDiameterChange;
  let diameter = config.defaultCircleDiameter;

  let circleOffsetCounter = 0;
  let numberOfCirclesUntilGridOffsetChange = config.numberOfCirclesUntilGridOffsetChange;
  let topOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  let leftOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;

  let circleOpacityCounter = 0;
  let opacity = 1;
  let numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange;

  createCircle = () => {
    const isDotsDark = config.isDotsDarkCheckPerCircle
      ? randomTrueOrFalse() : config.defaultIsDotsDark;

    const circleContainer = document.createElement('div');
    const circle = document.createElement('div');

    let color;

    if (config.isCircleGradientsEnabled) {
      color = Math.random() < config.circleGradientProbability
        ? getRandomGradientFromColors() : getRandomColorFromColors();
    } else {
      color = getRandomColorFromColors();
    }

    circleContainer.style.width = `${width}px`;
    circleContainer.style.zIndex = '2';
    circleContainer.style.height = `${height}px`;
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

    circle.style.position = 'relative';
    circle.style.top = `${topOffset}px`;
    circle.style.left = `${leftOffset}px`;

    if (config.isDiameterChangeEnabled) {
      if (circleDiameterCounter < numberOfCirclesUntilDiameterChange) {
        circleDiameterCounter += 1;

        if (config.diameterGradualIncrementAmount) {
          diameter += config.diameterGradualIncrementAmount;
        }
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

    circle.style.opacity = opacity;
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.flex = 'none';
    circle.style.borderRadius = '50%';
    circle.style.background = color;

    const circleGlowOpacity = config.isCircleGlowOpacityPerCircle
      ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10
      : config.defaultCircleGlowOpacity;

    const boxShadowColor = getRandomColorFromColors()
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
  let snakeDirection = config.defaultSnakeDirection;

  let circleDirectionCounter = 0;
  let numberOfCirclesUntilDirectionChange = config.numberOfCirclesUntilDirectionChange;

  let circleDiameterCounter = 0;
  let diameter = config.defaultCircleDiameter;
  let numberOfCirclesUntilDiameterChange = config.numberOfCirclesUntilDiameterChange;

  let circleOffsetCounter = 0;
  let topOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  let leftOffset = config.isGridOffsetChangeEnabled ? makeNumberRandomlyNegative(getRandomNumber(1, config.maxGridCircleOffset)) : 0;
  let numberOfCirclesUntilGridOffsetChange = config.numberOfCirclesUntilGridOffsetChange;

  let circleOpacityCounter = 0;
  let opacity = 1;
  let numberOfCirclesUntilOpacityChange = config.numberOfCirclesUntilOpacityChange;

  createCircle = () => {
    const isDotsDark = config.isDotsDarkCheckPerCircle
      ? randomTrueOrFalse() : config.defaultIsDotsDark;

    if (config.isDiameterChangeEnabled) {
      if (circleDiameterCounter < numberOfCirclesUntilDiameterChange) {
        circleDiameterCounter += 1;

        if (config.diameterGradualIncrementAmount) {
          diameter += config.diameterGradualIncrementAmount;
        }
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

    if (!topValue) topValue = getRandomNumber(0 - diameter, window.innerHeight);
    if (!leftValue) leftValue = getRandomNumber(0 - diameter, window.innerWidth);

    const circle = document.createElement('div');

    let color;

    if (config.isCircleGradientsEnabled) {
      color = Math.random() < config.circleGradientProbability
        ? getRandomGradientFromColors() : getRandomColorFromColors();
    } else {
      color = getRandomColorFromColors();
    }

    circle.style.opacity = opacity;
    circle.style.transform = `translateY(${topOffset}px) translateX(${leftOffset}px)`;
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.zIndex = '2';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = `${topValue}px`;
    circle.style.left = `${leftValue}px`;
    circle.style.background = color;

    const circleGlowOpacity = config.isCircleGlowOpacityPerCircle
      ? getRandomNumber(config.circleGlowMinOpacity, config.circleGlowMaxOpacity) / 10
      : config.defaultCircleGlowOpacity;

    const boxShadowColor = getRandomColorFromColors()
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

    return circle;
  };
}

const circles = [...Array(config.totalCircles)].map(() => createCircle());

circles.forEach((circle) => {
  document.getElementById('background').appendChild(circle);
});

// console.log('config:', config);
