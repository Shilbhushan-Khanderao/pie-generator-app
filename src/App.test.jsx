import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Feedback Generator heading", () => {
  render(<App />);
  const heading = screen.getByText(/feedback generator/i);
  expect(heading).toBeInTheDocument();
});
