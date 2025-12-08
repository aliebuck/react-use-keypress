# react-use-keypress

React hook that listens for specific key presses.

## Usage

```jsx
useKeypress(keys, handler);
```

### Parameters

- `keys` – a single key or array of [key values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) to listen for.
- `handler` – function called when a matching key is pressed.

### Examples

**Single key:**

```jsx
import useKeypress from "react-use-keypress";

const Example = (props) => {
  // ...
  useKeypress("Escape", () => {
    // Do something when the user has pressed the Escape key
  });
  // ...
};
```

**Multiple keys:**

```jsx
import useKeypress from "react-use-keypress";

const Example = (props) => {
  // ...
  useKeypress(["ArrowLeft", "ArrowRight"], (event) => {
    if (event.key === "ArrowLeft") {
      moveLeft();
    } else {
      moveRight();
    }
  });
  // ...
};
```

## Browser Support

Includes a shim for the `KeyboardEvent.key` property to handle inconsistencies in older browsers.

## Requirements

Requires React 16.8.0 or higher (Hooks API).
