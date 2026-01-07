import Home from "@/app/page";
import { axe } from "vitest-axe";
import { renderWithProviders } from "../test-utils/renderWithProviders";

describe("Home Page accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderWithProviders(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
