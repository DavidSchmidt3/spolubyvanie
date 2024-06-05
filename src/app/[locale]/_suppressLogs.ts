// TODO: - delete when https://github.com/radix-ui/primitives/pull/2934 gets merged
const prevConsoleError = console.error;
const prevConsoleWarn = console.warn;

console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0]?.includes("Warning: Accessing element.ref")
  ) {
    return;
  }

  prevConsoleError(...args);
};

console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0]?.includes("Warning: Accessing element.ref")
  ) {
    return;
  }

  prevConsoleWarn(...args);
};
