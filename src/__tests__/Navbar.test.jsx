import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import * as nextNavigation from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("highlights current category in navbar", () => {
    nextNavigation.usePathname.mockImplementation(() => "/category/sports");
    render(<Navbar />);
    expect(screen.getByText("sports")).toHaveClass("text-[#263b50]");
  });
});
