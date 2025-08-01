import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ResetPassword from "@/app/(external)/auth/sign-in/page";

describe("<ResetPassword/>", () =>
  test("renders ResetPassword page", () => {
    render(<ResetPassword />);
    screen.debug();
  }));
