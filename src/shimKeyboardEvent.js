// Fixing inconsistencies from older browsers
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
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

const shimKeyboardEvent = (event) => {
  const originalKey = event.key;
  if (Object.hasOwn(aliases, originalKey)) {
    Object.defineProperty(event, "key", {
      configurable: true,
      enumerable: true,
      get: () => aliases[originalKey],
    });
  }
};

export default shimKeyboardEvent;
