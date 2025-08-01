import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";

describe("reset password form", () => {
  test("renders resetPasswordForm", () => {
    render(<ResetPasswordForm />);
  });
});
