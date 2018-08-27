function getClosestToZero() {
  let closest = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    if (Math.abs(arguments[i]) < Math.abs(closest)) {
      closest = arguments[i];
    }
  }
  return closest;
}