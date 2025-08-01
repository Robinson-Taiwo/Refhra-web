import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import SignupForm from "@/components/forms/SignupForm";

describe("<SignupForm/>", () =>
  test("renders SignupForm component", () => {
    render(<SignupForm />);
  }));
