import {interpolateGreys} from 'd3-scale-chromatic';

export const getColor = (value, defaultColor = [255, 255, 255]) => {
  if (!Number.isFinite(value)) {
    return defaultColor;
  }
  return interpolateGreys(value)
    .match(/[0-9]+/g)
    .map(n => Number(n));
};

export const gaussianRand = (k = 2) =>
  Array.from(Array(k)).reduce((rand, _) => rand + Math.random(), 0) / k;

export const generateRandomData = (n = 50000) => {
  const VARIANCE = 6;
  const numPointsPerCluster = n / 5;

  return Array.from(Array(numPointsPerCluster))
    .map(i => [gaussianRand(VARIANCE), gaussianRand(VARIANCE)])
    .concat(
      Array.from(Array(numPointsPerCluster)).map(i => [
        gaussianRand(VARIANCE) - 0.25,
        gaussianRand(VARIANCE) - 0.25
      ])
    )
    .concat(
      Array.from(Array(numPointsPerCluster)).map(i => [
        gaussianRand(VARIANCE) - 0.25,
        gaussianRand(VARIANCE) + 0.25
      ])
    )
    .concat(
      Array.from(Array(numPointsPerCluster)).map(i => [
        gaussianRand(VARIANCE) + 0.25,
        gaussianRand(VARIANCE) - 0.25
      ])
    )
    .concat(
      Array.from(Array(numPointsPerCluster)).map(i => [
        gaussianRand(VARIANCE) + 0.25,
        gaussianRand(VARIANCE) + 0.25
      ])
    );
};

export const allocBuffer = (size = 100, defaultValue = 0) => {
  return Array.from(Array(size)).map(_ => 0);
};