import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

describe("<App />", () => {
  it("renders the heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /ci\/cd beginner/i }),
    ).toBeInTheDocument();
  });

  it("increments the counter when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/clicked 0 times/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /increment/i }));
    expect(screen.getByText(/clicked 1 times/i)).toBeInTheDocument();
  });
});
