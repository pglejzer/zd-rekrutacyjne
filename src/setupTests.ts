/* eslint-disable @typescript-eslint/no-empty-function */
global.ResizeObserver =
  global.ResizeObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
