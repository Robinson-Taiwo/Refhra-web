import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "@/app/(external)/auth/sign-in/page";

describe("<Login/>", () =>
  test("renders Login page", () => {
    render(<Login />);
    screen.debug();
  }));
