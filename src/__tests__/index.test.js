import { act, renderHook } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import useKeypress from "..";

const createKeydownEvent = (key) => new KeyboardEvent("keydown", { key });

const dispatchWindowEvent = (event) =>
  act(() => {
    window.dispatchEvent(event);
  });

const renderUseKeypressHook = (...args) =>
  renderHook(() => useKeypress(...args));

test("calls handler when matching key has been pressed", () => {
  const handler = vi.fn();
  renderUseKeypressHook("Escape", handler);

  const event = createKeydownEvent("Escape");

  dispatchWindowEvent(event);

  expect(handler).toHaveBeenCalledWith(event);
});

test("calls handler when matching keys has been pressed", () => {
  const handler = vi.fn();
  renderUseKeypressHook(["Enter", " "], handler);

  const event1 = createKeydownEvent("Enter");
  const event2 = createKeydownEvent(" ");

  dispatchWindowEvent(event1);
  dispatchWindowEvent(event2);

  expect(handler).toHaveBeenNthCalledWith(1, event1);
  expect(handler).toHaveBeenNthCalledWith(2, event2);
});

test("does not call handler when non-matching key has been pressed", () => {
  const handler = vi.fn();
  renderUseKeypressHook("Escape", handler);

  dispatchWindowEvent(createKeydownEvent("Enter"));

  expect(handler).not.toHaveBeenCalled();
});

test("supports older browsers", () => {
  const handler = vi.fn();
  renderUseKeypressHook("Escape", handler);

  const event = createKeydownEvent("Esc");

  dispatchWindowEvent(event);

  expect(handler).toHaveBeenCalledWith(event);
});
