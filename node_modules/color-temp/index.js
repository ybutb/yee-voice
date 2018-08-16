var rgb2temp, temp2rgb;

module.exports.temp2rgb = temp2rgb = function(T) {
  var RGB, T100;
  T100 = T / 100;
  RGB = [];
  if (T <= 6504) {
    RGB[0] = 255;
    RGB[1] = T100;
    RGB[1] = 99.4708025861 * Math.log(RGB[1]) - 161.1195681661;
    if (RGB[1] < 0) {
      RGB[1] = 0;
    }
    if (RGB[1] > 255) {
      RGB[1] = 255;
    }
  } else {
    RGB[0] = T100 - 60;
    RGB[0] = 329.698727446 * Math.pow(RGB[0], -0.1332047592);
    if (RGB[0] < 0) {
      RGB[0] = 0;
    }
    if (RGB[0] > 255) {
      RGB[0] = 255;
    }
    RGB[1] = T100 - 60;
    RGB[1] = 288.1221695283 * Math.pow(RGB[1], -0.0755148492);
    if (RGB[1] < 0) {
      RGB[1] = 0;
    }
    if (RGB[1] > 255) {
      RGB[1] = 255;
    }
  }
  if (T >= 6504) {
    RGB[2] = 255;
  } else {
    if (T100 <= 19) {
      RGB[2] = 0;
    } else {
      RGB[2] = T100 - 10;
      RGB[2] = 138.5177312231 * Math.log(RGB[2]) - 305.0447927307;
      if (RGB[2] < 0) {
        RGB[2] = 0;
      }
      if (RGB[2] > 255) {
        RGB[2] = 255;
      }
    }
  }
  return RGB;
};

module.exports.rgb2temp = rgb2temp = function(RGB) {
  var T, Tmax, Tmin, testRGB;
  Tmin = 1000;
  Tmax = 40000;
  while (Tmax - Tmin > 0.4) {
    T = (Tmax + Tmin) / 2;
    testRGB = temp2rgb(T);
    if ((testRGB[2] / testRGB[0]) >= (RGB[2] / RGB[0])) {
      Tmax = T;
    } else {
      Tmin = T;
    }
  }
  return Math.round(T);
};
