import { describe, test } from "vitest";
import { render} from "@testing-library/react";
import SignUp from "@/app/(external)/auth/sign-in/page";

describe("<SignUp/>", () =>
  test("renders SignUp page", () => {
    render(<SignUp />);
  }));
