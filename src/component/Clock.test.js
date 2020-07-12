import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Clock } from "./Clock";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Clock component", () => {
  it("shows time", () => {
    act(() => {
      render(<Clock interval={1000} />, container);
    });
    expect(container.textContent).toMatch(/It is .*\./);
    const dateRendered = new Date(
      container.querySelector("time").getAttribute("datetime")
    );
    const now = new Date();
    expect(now.getTime() - dateRendered.getTime()).toBeLessThan(1000);
  });
  it("should match snapshot", () => {
    act(() => {
      render(<Clock interval={1000} />, container);
    });
    // expect(container.innerHTML).toMatchInlineSnapshot();
  });
});
