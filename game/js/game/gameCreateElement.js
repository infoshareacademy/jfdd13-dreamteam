export const createPlayer = () => {
  return new Player(
      "player",
      "",
      id,
      {x: startLine, y: startLine},
      {w: playerWidth, h: playerHeight},
      speed,
      "player"
  );
};
export const createObstacle = () => {
  return new Obstacle(
      "obstacle",
      "",
      "",
      {x: creationLine, y: boardHeight - obstHeight},
      {w: obstWidth, h: obstHeight},
      speedObst,
      "obstacle"
  );
};
export  const createBird = () => {
  return new Obstacle(
      "bird",
      "",
      "",
      {x: creationLine, y: generateBirdY()},
      {w: birdWidth, h: birdHeight},
      speedBird,
      "obstacle"
  );
};
export  const createBirdZ = () => {
  return new Obstacle(
      "birdz",
      "",
      "",
      {x: creationLine, y: generateBirdY()},
      {w: birdWidth, h: birdHeight},
      speedBirdZ,
      "obstacle"
  );
};

export const generateBirdY = () => {
  const randPositions = [250, 300, 350, 400, 450, 480, 550, 600];
  const getPosition = Math.round(Math.random() * randPositions.length - 1); //generate random arr index
  const result = randPositions[getPosition] - 250;
  if (result !== undefined) {
    return result;
  } else {
    return randPositions[0];
  }
};