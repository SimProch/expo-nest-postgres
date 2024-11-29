const ABSOLUTE_ZERO = 273.15;

export const kelvinToCelsius = (temperature: number): number => {
  return temperature - ABSOLUTE_ZERO;
};
