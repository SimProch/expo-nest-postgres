import { isPasswordValid } from "./isPasswordValid";

describe("isPasswordValid", () => {
  describe("Invalid passwords", () => {
    it("Should fail if password has less than 8 chars", () => {
      expect(isPasswordValid("1234567")).toBe(false);
    });
    it("Should fail if password has no uppercase letter", () => {
      expect(isPasswordValid("simon123")).toBe(false);
    });
    it("Should fail if password has no lowercase letter", () => {
      expect(isPasswordValid("SIMON213")).toBe(false);
    });
    it("Should fail if password has no number letter", () => {
      expect(isPasswordValid("Simon ThePimon")).toBe(false);
    });
  });
  describe("Valid passwords", () => {
    it("Should accept", () => {
      expect(isPasswordValid("YoSoyNumero1")).toBe(true);
      expect(isPasswordValid("0b1w4nK3n0b1")).toBe(true);
    });
  });
});
