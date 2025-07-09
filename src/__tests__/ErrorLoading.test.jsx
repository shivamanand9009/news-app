import React from "react";
import { render, screen } from "@testing-library/react";
import { Loader } from "@/components/Loader";
import Home from "@/app/page";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ message: "Rate limit exceeded" }),
  })
);

test("renders loading state", () => {
  render(<Loader />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("renders error state when fetch fails", async () => {
  render(<Home />);
  expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
});
