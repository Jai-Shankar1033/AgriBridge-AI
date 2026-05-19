// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock geolocation
global.navigator.geolocation = {
  getCurrentPosition: jest.fn((success) =>
    success({ coords: { latitude: 28.6139, longitude: 77.2090 } })
  ),
};

// Mock matchMedia
global.matchMedia = global.matchMedia || function () {
  return { matches: false, addListener: jest.fn(), removeListener: jest.fn() };
};
