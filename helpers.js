// Get slope and y-crossing for a given line defined by 2 points
export const getLineParameters = (x1, y1, x2, y2) => {
  const m = (y2 - y1) / (x2 - x1);     // Slope
  return {
    m,
    b: y1 - m * x1                     // Y-Crossing
  }
}