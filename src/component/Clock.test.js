import React from "react";
import { render, screen } from '@testing-library/react';

import { Clock } from "./Clock";

describe("Clock component", () => {
  it("shows time", () => {
    const { container } = render(<Clock interval={1000} />);

    const content = screen.getByText(/It is .*\./);
    expect(content).not.toBeNull();
    const dateRendered = new Date(container.getElementsByTagName('time')[0].getAttribute('datetime'));
    const now = new Date();
    expect(now.getTime() - dateRendered).toBeLessThan(1000);
  });
  it("should match snapshot", () => {
    render(<Clock interval={1000} />);
    // expect(container.innerHTML).toMatchInlineSnapshot();
  });
});
