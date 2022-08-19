// Define CDBR Braking Unit Data

const cdbr_time = [1, 2, 4, 10, 30, 100, 200, 300, 400, 500, 600, 800, 1000, 2000, 4000, 7000, 10000];

const cdbr_4045 = {
  type: "CDBR-4045D",
  voltageClass: "400V",
  ratedPower: "45kW",
  contCurrent: 18,
  maxCurrent: 60,
  minResistance: 12.8,
  overloadCurves: [
    {
      dutyCycle: 20,
      cdbr_time,
      current: [60.0, 60.0, 60.0, 58.0, 56.6, 52.8, 48.1, 44.6, 41.5, 38.5, 36.2, 33.0, 31.0, 25.7, 24.8, 24.4, 24.1]
    },
    {
      dutyCycle: 30,
      cdbr_time,
      current: [52.8, 52.2, 51.8, 51.0, 48.9, 45.0, 41.6, 38.8, 37.0, 35.3, 34.0, 31.5, 29.5, 25.7, 24.8, 24.4, 24.1]
    },
    {
      dutyCycle: 40,
      cdbr_time,
      current: [43.7, 43.3, 42.8, 42.0, 41.0, 39.5, 37.2, 35.6, 34.4, 33.3, 32.5, 30.9, 29.2, 25.6, 24.8, 24.4, 24.1]
    }
  ]
};

const cdbr_4090 = {
  type: "CDBR-4090D",
  voltageClass: "400V",
  ratedPower: "90kW",
  contCurrent: 30,
  maxCurrent: 100,
  minResistance: 7.6,
  overloadCurves: [
    {
      dutyCycle: 20,
      cdbr_time,
      current: [100.0, 100.0, 100.0, 100.0, 96.0, 91.4, 86.0, 81.5, 77.0, 73.5, 70.0, 64.5, 60.0, 50.8, 48.1, 47.9, 47.8]
    },
    {
      dutyCycle: 30,
      cdbr_time,
      current: [92.5, 91.3, 90.5, 89.0, 86.6, 82.1, 77.0, 72.5, 69.5, 67.0, 65.0, 61.2, 58.0, 50.8, 48.1, 47.9, 47.8]
    },
    {
      dutyCycle: 40,
      cdbr_time,
      current: [82.0, 81.0, 79.9, 78.9, 77.0, 73.7, 70.6, 67.5, 65.3, 63.5, 62.0, 59.2, 57.1, 50.7, 48.1, 47.9, 47.8]
    }
  ]
};

const cdbr_4220 = {
  type: "CDBR-4220D",
  voltageClass: "400V",
  ratedPower: "220kW",
  contCurrent: 80,
  maxCurrent: 250,
  minResistance: 3.2,
  overloadCurves: [
    {
      dutyCycle: 20,
      cdbr_time,
      current: [236.0, 235.0, 232.0, 228.0, 223.0, 213.0, 202.0, 191.0, 183.0, 176.0, 168.0, 160.0, 150.0, 128.0, 118.0, 116.0, 115.0]
    },
    {
      dutyCycle: 30,
      cdbr_time,
      current: [216.0, 215.0, 213.0, 210.0, 203.0, 193.0, 183.0, 176.0, 170.0, 165.0, 161.0, 153.0, 147.0, 128.0, 118.0, 116.0, 115.0]
    },
    {
      dutyCycle: 40,
      cdbr_time,
      current: [195.5, 194.0, 192.0, 189.0, 186.0, 180.0, 173.0, 168.0, 163.0, 159.0, 156.0, 150.0, 145.0, 128.0, 118.0, 116.0, 115.0]
    }
  ]
};

export const cdbr_data = [cdbr_4045, cdbr_4090, cdbr_4220];

// Find the maximum allowable current for a certain CDBR ED% curve and specified braking time
// Based on line function y = mx + b
export const ed_interpolate = (ed_curve, brakeTime) => {
  let timeIndex = ed_curve.cdbr_time.findIndex(brakingTime => brakeTime < brakingTime);
  //console.log(timeIndex);
  const x1 = ed_curve.current[timeIndex - 1];
  const x2 = ed_curve.current[timeIndex];
  const y1 = ed_curve.cdbr_time[timeIndex - 1];
  const y2 = ed_curve.cdbr_time[timeIndex];

  const m = ( y2 - y1 ) / ( x2 - x1 );       // Slope
  const b = y1 - m * x1;                     // Y-Crossing
  return (brakeTime - b) / m;                // Solve x (current) for another y value (brakeTime)
}