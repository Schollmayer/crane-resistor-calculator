// Get slope and y-crossing for a given line defined by 2 points
export const getLineParameters = (x1, y1, x2, y2) => {
  const m = (y2 - y1) / (x2 - x1);     // Slope
  return {
    m,
    b: y1 - m * x1                     // Y-Crossing
  }
}

// Determine if a given point (xPoint, yPoint) is below a given line (y = mx + b)
export const pointBelowLine = (xPoint, yPoint, m, b) => {
  let yLine = m*xPoint + b;
  let deltaY = yLine - yPoint;
  //console.log(`Slope = ${m}, deltaY = ${deltaY}`);
  if (( m < 0) && (deltaY > 0)) return true;
  else if (( m > 0) && (deltaY > 0)) return true;
  else return false;
}
