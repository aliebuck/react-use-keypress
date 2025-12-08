import { useEffect, useRef } from "react";
import shimKeyboardEvent from "./shimKeyboardEvent";

/**
 * Registers a keydown listener that triggers a handler when one or more
 * specified keys are pressed. Accepts either a single key or an array of keys.
 * @param {string|string[]} keys - Key or list of keys to listen for.
 * @param {(event: KeyboardEvent) => void} [handler] - Function called when a matching key is pressed.
 */
const useKeypress = (keys, handler) => {
  const eventListenerRef = useRef();

  useEffect(() => {
    eventListenerRef.current = (event) => {
      shimKeyboardEvent(event);
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        handler?.(event);
      }
    };
  }, [keys, handler]);

  useEffect(() => {
    const eventListener = (event) => eventListenerRef.current(event);
    window.addEventListener("keydown", eventListener);
    return () => window.removeEventListener("keydown", eventListener);
  }, []);
};

export default useKeypress;
