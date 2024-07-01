
// GA700, LA700, CR700 Internal Braking Transistor Data 0,75kW/HD - 75kW/HD 400V
//GA500 Internal Braking Transistor Data 0,4kW/HD - 22kW/HD 400V
const tb_70Percent = {
    brakingTorque: 70,
    brakeTime: [1.0, 10.0, 50.0, 230.0, 500.0, 760.0, 1200.0, 1600.0, 1800.0],
    dutyCycle: [90.0, 90.0, 80.0, 50.0, 30.0, 20.0, 10.0, 5.0, 3.0]
  };
  const tb_84Percent = {
    brakingTorque: 84,
    brakeTime: [1.0, 10.0, 20.0, 50.0, 90.0, 160.0, 270.0, 380.0, 420.0, 500.0],
    dutyCycle: [50.0, 50.0, 45.0, 40.0, 30.0, 20.0, 10.0, 5.0, 3.0, 1.0]
  };
  const tb_98Percent = {
    brakingTorque: 98,
    brakeTime: [1.0, 16.0, 58.0, 106.0, 150.0, 170.0, 200.0],
    dutyCycle: [35.0, 30.0, 20.0, 10.0, 5.0, 3.0, 1.0]
  };
  const tb_120Percent = {
    brakingTorque: 120,
    brakeTime: [1.0, 5.0, 20.0, 43.0, 67.0, 80.0, 85.0],
    dutyCycle: [20.0, 19.0, 16.0, 10.0, 5.0, 3.0, 1.0]
  };
  const tb_141Percent = {
    brakingTorque: 141,
    brakeTime: [1.0, 5.0, 14.0, 20.0, 35.0, 45.0, 55.0],
    dutyCycle: [14.0, 12.0, 10.0, 7.5, 5.0, 3.0, 1.0]
  };
  const tb_155Percent = {
    brakingTorque: 155,
    brakeTime: [1.0, 5.0, 10.0, 21.0, 29.0, 40.0],
    dutyCycle: [11.0, 9.0, 7.0, 5.0, 3.0, 1.0]
  };
  
  
  export const drive_OLCurves_higher_0_75_kW = [tb_155Percent, tb_141Percent, tb_120Percent, tb_98Percent, tb_84Percent, tb_70Percent];
  export const drive_OLCurves_higher_0_4_kW =drive_OLCurves_higher_0_75_kW;

  // GA700 Internal Braking Transistor Data <0,75kW/HD 400V
  const tb_70Percent_smaller_0_75_kW = {
    brakingTorque: 70,
    brakeTime: [1.0, 10.0, 50.0, 230.0, 500.0, 760.0, 1200.0, 1600.0, 1800.0],
    dutyCycle: [90.0, 90.0, 80.0, 50.0, 30.0, 20.0, 10.0, 5.0, 3.0]
  };
  const tb_97Percent_smaller_0_75_kW = {
    brakingTorque: 97,
    brakeTime: [1.0, 10.0, 20.0, 50.0, 90.0, 160.0, 270.0, 380.0, 420.0, 500.0],
    dutyCycle: [50.0, 50.0, 45.0, 40.0, 30.0, 20.0, 10.0, 5.0, 3.0, 1.0]
  };
  const tb_124Percent_smaller_0_75_kW = {
    brakingTorque: 124,
    brakeTime: [1.0, 16.0, 58.0, 106.0, 150.0, 170.0, 200.0],
    dutyCycle: [35.0, 30.0, 20.0, 10.0, 5.0, 3.0, 1.0]
  };
  const tb_168Percent_smaller_0_75_kW = {
    brakingTorque: 168,
    brakeTime: [1.0, 5.0, 20.0, 43.0, 67.0, 80.0, 85.0],
    dutyCycle: [20.0, 19.0, 16.0, 10.0, 5.0, 3.0, 1.0]
  };
  const tb_212Percent_smaller_0_75_kW = {
    brakingTorque: 213,
    brakeTime: [1.0, 5.0, 14.0, 20.0, 35.0, 45.0, 55.0],
    dutyCycle: [14.0, 12.0, 10.0, 7.5, 5.0, 3.0, 1.0]
  };
  const tb_240Percent_smaller_0_75_kW = {
    brakingTorque: 240,
    brakeTime: [1.0, 5.0, 10.0, 21.0, 29.0, 40.0],
    dutyCycle: [11.0, 9.0, 7.0, 5.0, 3.0, 1.0]
  };
  
  export const drive_OLCurves_smaller_0_75_kW = [tb_240Percent_smaller_0_75_kW, tb_212Percent_smaller_0_75_kW, tb_168Percent_smaller_0_75_kW, tb_124Percent_smaller_0_75_kW, tb_97Percent_smaller_0_75_kW, tb_70Percent_smaller_0_75_kW]
  export const drive_OLCurves_smaller_0_4_kW =drive_OLCurves_smaller_0_75_kW;

  // GA700, LA700, CR700 Internal Braking Transistor Data (Linear Approximation) 0,75kW/HD - 75kW/HD 400V
  //GA500 Internal Braking Transistor Data 0,4kW/HD - 22kW/HD 400V
  // Linear approximation between 10% - 40% ED and 10s to 300s operation time
  const tb_70P_linear = {
    brakingTorque: 70,
    slope: -0.14,
    yCrossing: 84
  };
  const tb_71P_linear = {
    brakingTorque: 71,
    slope: -0.142,
    yCrossing: 81.43
  };
  const tb_72P_linear = {
    brakingTorque: 72,
    slope: -0.14,
    yCrossing: 78.86
  };
  const tb_73P_linear = {
    brakingTorque: 73,
    slope: -0.146,
    yCrossing: 76.29
  };
  const tb_74P_linear = {
    brakingTorque: 74,
    slope: -0.149,
    yCrossing: 73.71
  };
  const tb_75P_linear = {
    brakingTorque: 75,
    slope: -0.151,
    yCrossing: 71.14
  };
  const tb_76P_linear = {
    brakingTorque: 76,
    slope: -0.153,
    yCrossing: 68.57
  };
  const tb_77P_linear = {
    brakingTorque: 77,
    slope: -0.155,
    yCrossing: 66
  };
  const tb_78P_linear = {
    brakingTorque: 78,
    slope: -0.157,
    yCrossing: 63.43
  };
  const tb_79P_linear = {
    brakingTorque: 79,
    slope: -0.159,
    yCrossing: 60.86
  };
  const tb_80P_linear = {
    brakingTorque: 80,
    slope: -0.161,
    yCrossing: 58.29
  };
  const tb_81P_linear = {
    brakingTorque: 81,
    slope: -0.164,
    yCrossing: 55.71
  };
  const tb_82P_linear = {
    brakingTorque: 82,
    slope: -0.166,
    yCrossing: 53.14
  };
  const tb_83P_linear = {
    brakingTorque: 83,
    slope: -0.168,
    yCrossing: 50.57
  };
  const tb_84P_linear = {
    brakingTorque: 84,
    slope: -0.17,
    yCrossing: 48
  };
  const tb_86P_linear = {
    brakingTorque: 86,
    slope: -0.179,
    yCrossing: 46
  };
  const tb_88P_linear = {
    brakingTorque: 88,
    slope: -0.187,
    yCrossing: 44
  };
  const tb_90P_linear = {
    brakingTorque: 90,
    slope: -0.196,
    yCrossing: 42
  };
  const tb_92P_linear = {
    brakingTorque: 92,
    slope: -0.204,
    yCrossing: 40
  };
  const tb_94P_linear = {
    brakingTorque: 94,
    slope: -0.213,
    yCrossing: 38
  };
  const tb_96P_linear = {
    brakingTorque: 96,
    slope: -0.221,
    yCrossing: 36
  };
  const tb_98P_linear = {
    brakingTorque: 98,
    slope: -0.23,
    yCrossing: 34
  };
  const tb_100P_linear = {
    brakingTorque: 100,
    slope: -0.23,
    yCrossing: 32.73
  };
  const tb_102P_linear = {
    brakingTorque: 102,
    slope: -0.23,
    yCrossing: 31.45
  };
  const tb_104P_linear = {
    brakingTorque: 104,
    slope: -0.23,
    yCrossing: 30.18
  };
  const tb_108P_linear = {
    brakingTorque: 108,
    slope: -0.23,
    yCrossing: 27.64
  };
  const tb_112P_linear = {
    brakingTorque: 112,
    slope: -0.23,
    yCrossing: 25.09
  };
  const tb_116P_linear = {
    brakingTorque: 116,
    slope: -0.23,
    yCrossing: 22.55
  };
  const tb_120P_linear = {
    brakingTorque: 120,
    slope: -0.23,
    yCrossing: 20
  };
  const tb_125P_linear = {
    brakingTorque: 125,
    slope: -0.23,
    yCrossing: 18.25
  };
  const tb_130P_linear = {
    brakingTorque: 130,
    slope: -0.23,
    yCrossing: 16.50
  };
  const tb_135P_linear = {
    brakingTorque: 135,
    slope: -0.23,
    yCrossing: 14.75
  };
  const tb_141P_linear = {
    brakingTorque: 141,
    slope: -0.23,
    yCrossing: 13
  };
  
  export const drive_OLLinear_higher_0_75_kW = [tb_141P_linear, tb_135P_linear, tb_130P_linear, tb_125P_linear, tb_120P_linear, tb_116P_linear, tb_112P_linear, tb_108P_linear, tb_104P_linear, tb_102P_linear, tb_100P_linear, tb_98P_linear, tb_96P_linear, tb_94P_linear, tb_92P_linear, tb_90P_linear, tb_88P_linear, tb_86P_linear, tb_84P_linear, tb_83P_linear, tb_82P_linear, tb_81P_linear, tb_80P_linear, tb_79P_linear, tb_78P_linear, tb_77P_linear, tb_76P_linear, tb_75P_linear, tb_74P_linear, tb_73P_linear, tb_72P_linear, tb_71P_linear, tb_70P_linear];
  
  //GA500 Internal Braking Transistor Data 0,4kW/HD - 22kW/HD 400V
  // Linear approximation between 10% - 40% ED and 10s to 300s operation time
  
  const tb_70P_linear_smaller_0_75_kW = {
    brakingTorque: 70,
    slope: -0.140,
    yCrossing: 84
  };
  
  const tb_72P_linear_smaller_0_75_kW = {
    brakingTorque: 72.25,
    slope: -0.143,
    yCrossing: 81
  };
  
  const tb_77P_linear_smaller_0_75_kW = {
    brakingTorque: 76.75,
    slope: -0.145,
    yCrossing: 78
  };
  
  const tb_79P_linear_smaller_0_75_kW = {
    brakingTorque: 79,
    slope: -0.148,
    yCrossing: 75
  };
  
  const tb_81P_linear_smaller_0_75_kW = {
    brakingTorque: 81.25,
    slope: -0.15,
    yCrossing: 72
  };
  
  const tb_84P_linear_smaller_0_75_kW = {
    brakingTorque: 83.5,
    slope: -0.153,
    yCrossing: 69
  };
  
  const tb_86P_linear_smaller_0_75_kW = {
    brakingTorque: 85.75,
    slope: -0.155,
    yCrossing: 66
  };
  
  const tb_88P_linear_smaller_0_75_kW = {
    brakingTorque: 88,
    slope: -0.158,
    yCrossing: 63
  };
  
  const tb_90P_linear_smaller_0_75_kW = {
    brakingTorque: 90.25,
    slope: -0.160,
    yCrossing: 60
  };
  
  const tb_93P_linear_smaller_0_75_kW = {
    brakingTorque: 92.5,
    slope: 0.163,
    yCrossing: 57
  };
  
  const tb_95P_linear_smaller_0_75_kW = {
    brakingTorque: 94.75,
    slope: -0.165,
    yCrossing: 54 
  };
  
  const tb_97P_linear_smaller_0_75_kW = {
    brakingTorque: 97,
    slope: -0.17,
    yCrossing: 48
  };
  
  const tb_100P_linear_smaller_0_75_kW = {
    brakingTorque: 100,
    slope: -0.177,
    yCrossing: 46.44
  };
  
  const tb_103P_linear_smaller_0_75_kW = {
    brakingTorque: 103,
    slope: -0.183,
    yCrossing: 44.89
  };
  
  const tb_106P_linear_smaller_0_75_kW = {
    brakingTorque: 106,
    slope: -0.190,
    yCrossing: 43.33 
  };
  
  const tb_109P_linear_smaller_0_75_kW = {
    brakingTorque: 109,
    slope: -0.197,
    yCrossing: 41.78
  };
  
  const tb_112P_linear_smaller_0_75_kW = {
    brakingTorque: 112,
    slope: -0.203,
    yCrossing: 40.22
  };
  
  const tb_115P_linear_smaller_0_75_kW = {
    brakingTorque: 115,
    slope: -0.210,
    yCrossing: 38.67
  };
  
  const tb_118P_linear_smaller_0_75_kW = {
    brakingTorque: 118,
    slope: -0.217,
    yCrossing: 37.11
  }; 
  
  const tb_121P_linear_smaller_0_75_kW = {
    brakingTorque: 121,
    slope: -0.223,
    yCrossing: 35.56
  };
  
  const tb_124P_linear_smaller_0_75_kW = {
    brakingTorque: 124,
    slope: -0.23,
    yCrossing: 34
  };
  
  const tb_128P_linear_smaller_0_75_kW = {
    brakingTorque: 128,
    slope: -0.230,
    yCrossing: 32.73
  };
  
  const tb_132P_linear_smaller_0_75_kW = {
    brakingTorque: 132,
    slope: -0.230,
    yCrossing: 31.45
  };
  
  const tb_136P_linear_smaller_0_75_kW = {
    brakingTorque: 136,
    slope: -0.230,
    yCrossing: 30.18
  };
  
  const tb_140P_linear_smaller_0_75_kW = {
    brakingTorque: 140,
    slope: -0.230,
    yCrossing: 28.91
  };
  
  const tb_144P_linear_smaller_0_75_kW = {
    brakingTorque: 144,
    slope: -0.230,
    yCrossing: 27.64
  };
  
  const tb_148P_linear_smaller_0_75_kW = {
    brakingTorque: 148,
    slope: -0.230,
    yCrossing: 26.36
  };
  
  const tb_152P_linear_smaller_0_75_kW = {
    brakingTorque: 152,
    slope: -0.230,
    yCrossing: 25.09
  };
  
  const tb_156P_linear_smaller_0_75_kW = {
    brakingTorque: 156,
    slope: -0.230,
    yCrossing: 23.82
  };
  
  const tb_160P_linear_smaller_0_75_kW = {
    brakingTorque: 160,
    slope: -0.230,
    yCrossing: 22.55
  };
  
  const tb_164P_linear_smaller_0_75_kW = {
    brakingTorque: 164,
    slope: -0.230,
    yCrossing: 21.27
  };
  
  const tb_168P_linear_smaller_0_75_kW = {
    brakingTorque: 168,
    slope: -0.230,
    yCrossing: 20
  };
  
  const tb_177P_linear_smaller_0_75_kW = {
    brakingTorque: 177,
    slope: -0.230,
    yCrossing: 18.6
  };
  
  const tb_186P_linear_smaller_0_75_kW = {
    brakingTorque: 186,
    slope: -0.230,
    yCrossing: 17.2
  };
  
  const tb_195P_linear_smaller_0_75_kW = {
    brakingTorque: 195,
    slope: -0.230,
    yCrossing: 15.8
  };
  
  const tb_204P_linear_smaller_0_75_kW = {
    brakingTorque: 204,
    slope: -0.230,
    yCrossing: 14.4
  };
  
  const tb_213P_linear_smaller_0_75_kW = {
    brakingTorque: 213,
    slope: -0.230,
    yCrossing: 13
  };
  
  export const drive_OLLinear_smaller_0_75_kW = [tb_213P_linear_smaller_0_75_kW, tb_204P_linear_smaller_0_75_kW, tb_195P_linear_smaller_0_75_kW, tb_186P_linear_smaller_0_75_kW, tb_177P_linear_smaller_0_75_kW, 
    tb_168P_linear_smaller_0_75_kW, tb_164P_linear_smaller_0_75_kW, tb_160P_linear_smaller_0_75_kW, tb_156P_linear_smaller_0_75_kW, tb_152P_linear_smaller_0_75_kW, tb_148P_linear_smaller_0_75_kW, 
    tb_144P_linear_smaller_0_75_kW, tb_140P_linear_smaller_0_75_kW, tb_136P_linear_smaller_0_75_kW, tb_132P_linear_smaller_0_75_kW, tb_128P_linear_smaller_0_75_kW, tb_124P_linear_smaller_0_75_kW,
    tb_121P_linear_smaller_0_75_kW, tb_118P_linear_smaller_0_75_kW, tb_115P_linear_smaller_0_75_kW, tb_112P_linear_smaller_0_75_kW, tb_109P_linear_smaller_0_75_kW,tb_103P_linear_smaller_0_75_kW,
     tb_106P_linear_smaller_0_75_kW, tb_100P_linear_smaller_0_75_kW, tb_97P_linear_smaller_0_75_kW, tb_95P_linear_smaller_0_75_kW, tb_93P_linear_smaller_0_75_kW, tb_90P_linear_smaller_0_75_kW, tb_88P_linear_smaller_0_75_kW,
     tb_86P_linear_smaller_0_75_kW, tb_84P_linear_smaller_0_75_kW, tb_81P_linear_smaller_0_75_kW, tb_79P_linear_smaller_0_75_kW, tb_77P_linear_smaller_0_75_kW, tb_72P_linear_smaller_0_75_kW, tb_70P_linear_smaller_0_75_kW
  ]
  export const drive_OLLinear_smaller_0_4_kW = drive_OLLinear_smaller_0_75_kW;