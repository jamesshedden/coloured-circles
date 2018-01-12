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

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

const makeNumberRandomlyNegative = (number) => {
  if (Math.random() < 0.5) return -number;
  return number;
};

const SNAKE_ANGLE = getRandomNumber(10, 50);

const DIRECTION_INCREMENTS = {
  [AVAILABLE_SNAKE_DIRECTIONS.TOP]: {
    top: SNAKE_ANGLE,
    left: 0,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.RIGHT]: {
    top: 0,
    left: SNAKE_ANGLE,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.BOTTOM]: {
    top: -SNAKE_ANGLE,
    left: 0,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.LEFT]: {
    top: 0,
    left: SNAKE_ANGLE,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.TOP_RIGHT]: {
    top: -SNAKE_ANGLE,
    left: SNAKE_ANGLE,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.BOTTOM_RIGHT]: {
    top: SNAKE_ANGLE,
    left: SNAKE_ANGLE,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.BOTTOM_LEFT]: {
    top: SNAKE_ANGLE,
    left: -SNAKE_ANGLE,
  },
  [AVAILABLE_SNAKE_DIRECTIONS.TOP_LEFT]: {
    top: -SNAKE_ANGLE,
    left: -SNAKE_ANGLE,
  },
};

const isSquare = (n) => {
  return n > 0 && Math.sqrt(n) % 1 === 0;
};

const getRandomSquareNumber = (min, max) => {
  let number = getRandomNumber(min, max);

  if (isSquare(number)) {
    return number;
  } else {
    return getRandomSquareNumber(min, max);
  }
};

let TOTAL_CIRCLES;

const LAYOUT = AVAILABLE_LAYOUTS[getRandomNumber(0, AVAILABLE_LAYOUTS.length)];

if (LAYOUT === 'grid') {
  TOTAL_CIRCLES = getRandomSquareNumber(50, 500)
} else {
  TOTAL_CIRCLES = getRandomNumber(50, 500);
}

const getRandomRgbColour = () => {
  return `rgb(${ getRandomNumber(0, 255) }, ${ getRandomNumber(0, 255) }, ${ getRandomNumber(0, 255) })`;
}

let IS_CIRCLE_COLOR_INCREMENTAL = Math.random() < 0.5;
let IS_CIRCLE_R_VALUE_INCREMENTAL;
let IS_CIRCLE_G_VALUE_INCREMENTAL;
let IS_CIRCLE_B_VALUE_INCREMENTAL;

if (IS_CIRCLE_COLOR_INCREMENTAL) {
  IS_CIRCLE_R_VALUE_INCREMENTAL = Math.random() < 0.5;
  IS_CIRCLE_G_VALUE_INCREMENTAL = Math.random() < 0.5;
  IS_CIRCLE_B_VALUE_INCREMENTAL = Math.random() < 0.5;

  if (
    !IS_CIRCLE_R_VALUE_INCREMENTAL &&
    !IS_CIRCLE_G_VALUE_INCREMENTAL &&
    !IS_CIRCLE_B_VALUE_INCREMENTAL
  ) {
    IS_CIRCLE_COLOR_INCREMENTAL = false;
  }
}

let colors;
let rValue;
let gValue;
let bValue;

if (IS_CIRCLE_COLOR_INCREMENTAL) {
  colors = [...Array(getRandomNumber(1, 50))].map(() => {
    if (!rValue || rValue > 255 || rValue < 0) rValue = getRandomNumber(0, 255);
    if (!gValue || gValue > 255 || gValue < 0) gValue = getRandomNumber(0, 255);
    if (!bValue || bValue > 255 || bValue < 0) bValue = getRandomNumber(0, 255);

    let color = `rgb(${ rValue }, ${ gValue }, ${ bValue })`;

    if (IS_CIRCLE_R_VALUE_INCREMENTAL) rValue = rValue + makeNumberRandomlyNegative(getRandomNumber(5, 50));
    if (IS_CIRCLE_G_VALUE_INCREMENTAL) gValue = gValue + makeNumberRandomlyNegative(getRandomNumber(5, 50));
    if (IS_CIRCLE_B_VALUE_INCREMENTAL) bValue = bValue + makeNumberRandomlyNegative(getRandomNumber(5, 50));

    return color;
  });
} else {
  colors = [...Array(getRandomNumber(1, 50))].map(() => {
    return getRandomRgbColour();
  });
}

document.body.style.backgroundColor = getRandomRgbColour();
document.getElementById('colour-layer').style.backgroundColor = getRandomRgbColour();
document.getElementById('lighten-layer').style.backgroundColor = getRandomRgbColour();

let createCircle;

if (LAYOUT === 'confetti') {
  createCircle = () => {
    let circle = document.createElement('div');

    circle.style.width = '20px';
    circle.style.height = '20px';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = `${ getRandomNumber(0, window.innerHeight) }px`;
    circle.style.left = `${ getRandomNumber(0, window.innerWidth) }px`;
    circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)];

    return circle;
  }

  const circles = [...Array(TOTAL_CIRCLES)].map(() => {
    return createCircle();
  });

  circles.map((circle) => {
    document.body.appendChild(circle);
  })
} else if (LAYOUT === 'grid') {
  let width = window.innerWidth / Math.sqrt(TOTAL_CIRCLES);
  let height = window.innerHeight / Math.sqrt(TOTAL_CIRCLES);
  let color;

  const IS_RANDOM_OFFSET_PER_CIRCLE = Math.random() < 0.5;

  createCircle = () => {
    let circleContainer = document.createElement('div');
    let circle = document.createElement('div');

    circleContainer.style.width = `${ width }px`;
    circleContainer.style.height = `${ height }px`;
    circleContainer.style.display = 'flex';
    circleContainer.style.justifyContent = 'center';
    circleContainer.style.alignItems = 'center';

    if (IS_RANDOM_OFFSET_PER_CIRCLE) {
      circle.style.position = 'relative';
      circle.style.top = `${ makeNumberRandomlyNegative(getRandomNumber(1, 6)) }px`;
      circle.style.left = `${ makeNumberRandomlyNegative(getRandomNumber(1, 6)) }px`;
    }

    circle.style.width = '20px';
    circle.style.height = '20px';
    circle.style.flex = 'none';
    circle.style.borderRadius = '50%';
    circle.margin = '20px';
    circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)];

    circleContainer.appendChild(circle);

    return circleContainer;
  }

  const circles = [...Array(TOTAL_CIRCLES)].map(() => {
    return createCircle();
  });

  circles.map((circle) => {
    document.body.appendChild(circle);
  })
} else if (LAYOUT === 'snake') {

  const IS_DIRECTION_DIFFERENT_PER_CIRCLE = Math.random() < 0.5;
  const IS_DIRECTION_DIFFERENT_ON_RESET = Math.random() < 0.5;

  let SNAKE_DIRECTION;
  SNAKE_DIRECTION = AVAILABLE_SNAKE_DIRECTIONS[Object.keys(AVAILABLE_SNAKE_DIRECTIONS)[getRandomNumber(0, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length)]];

  let topValue;
  let leftValue;

  createCircle = () => {
    if (!topValue) topValue = getRandomNumber(0, window.innerHeight);
    if (!leftValue) leftValue = getRandomNumber(0, window.innerWidth);

    let circle = document.createElement('div');

    circle.style.width = '20px';
    circle.style.height = '20px';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = `${ topValue }px`;
    circle.style.left = `${ leftValue }px`;
    circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)];

    // if it hits the window edges in any location, find a new random starting point for everything
    if (
      topValue > window.innerHeight ||
      topValue < 0 ||
      leftValue > window.innerWidth ||
      leftValue < 0
    ) {
      topValue = getRandomNumber(0, window.innerHeight)
      leftValue = getRandomNumber(0, window.innerWidth)

      if (IS_DIRECTION_DIFFERENT_ON_RESET) {
        SNAKE_DIRECTION = AVAILABLE_SNAKE_DIRECTIONS[Object.keys(AVAILABLE_SNAKE_DIRECTIONS)[getRandomNumber(0, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length)]];
      }
    };

    if (IS_DIRECTION_DIFFERENT_PER_CIRCLE) {
      SNAKE_DIRECTION = AVAILABLE_SNAKE_DIRECTIONS[Object.keys(AVAILABLE_SNAKE_DIRECTIONS)[getRandomNumber(0, Object.keys(AVAILABLE_SNAKE_DIRECTIONS).length)]];
    }

    topValue = topValue + DIRECTION_INCREMENTS[SNAKE_DIRECTION].top;
    leftValue = leftValue + DIRECTION_INCREMENTS[SNAKE_DIRECTION].left;

    return circle;
  }

  const circles = [...Array(TOTAL_CIRCLES)].map(() => {
    return createCircle();
  });

  circles.map((circle) => {
    document.body.appendChild(circle);
  })
}
