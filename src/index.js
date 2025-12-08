import { useEffect, useRef } from "react";
import shimKeyboardEvent from "./shimKeyboardEvent";

/**
 * Registers a global `keydown` listener and calls the provided handler
 * when matching keys are pressed.
 * @param {string|string[]} keys - Key or array of keys to listen for.
 * @param {(event: KeyboardEvent) => void} handler - Function called when a matching key is pressed.
 * @example
 * useKeypress("Escape", handler);
 * useKeypress(["ArrowUp", "ArrowDown"], handler);
 */
const useKeypress = (keys, handler) => {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = (event) => {
      shimKeyboardEvent(event);
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        handler?.(event);
      }
    };
  }, [keys, handler]);

  useEffect(() => {
    const listener = (event) => callbackRef.current?.(event);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
};

export default useKeypress;
