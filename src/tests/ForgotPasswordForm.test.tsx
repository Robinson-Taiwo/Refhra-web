import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";

describe("forgot password form", () => {
  test("renders forgotPasswordForm", () => {
    render(<ForgotPasswordForm />);
  });
});
