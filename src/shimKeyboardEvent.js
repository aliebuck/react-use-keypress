/**
 * Maps legacy or inconsistent `KeyboardEvent.key` values to modern standard values.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */
const aliases = {
  Win: "Meta",
  Scroll: "ScrollLock",
  Spacebar: " ",
  Down: "ArrowDown",
  Left: "ArrowLeft",
  Right: "ArrowRight",
  Up: "ArrowUp",
  Del: "Delete",
  Crsel: "CrSel",
  Exsel: "ExSel",
  Apps: "ContextMenu",
  Esc: "Escape",
  Decimal: ".",
  Multiply: "*",
  Add: "+",
  Subtract: "-",
  Divide: "/",
};

/**
 * Normalizes `KeyboardEvent.key` values across older browsers.
 * Mutates the `event.key` property in-place if an alias exists.
 * @param {KeyboardEvent} event - The event to normalize.
 */
const shimKeyboardEvent = (event) => {
  const originalKey = event.key;
  if (Object.hasOwn(aliases, originalKey)) {
    const key = aliases[originalKey];
    Object.defineProperty(event, "key", {
      configurable: true,
      enumerable: true,
      get: () => key,
    });
  }
};

export default shimKeyboardEvent;
