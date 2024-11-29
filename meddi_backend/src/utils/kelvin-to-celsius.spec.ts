import { kelvinToCelsius } from './kelvin-to-celsius';

describe('kelvinToCelsius', () => {
  it('should return celsius', () => {
    expect(kelvinToCelsius(273.15)).toBe(0);
  });
});
