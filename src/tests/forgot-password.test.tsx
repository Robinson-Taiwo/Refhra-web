import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ForgotPassword from "@/app/(external)/auth/sign-in/page";

describe("<ForgotPassword/>", () =>
  test("renders ForgotPassword page", () => {
    render(<ForgotPassword />);
    screen.debug();
  }));
