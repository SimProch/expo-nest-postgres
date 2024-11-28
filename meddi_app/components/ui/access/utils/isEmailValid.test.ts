import { isEmailValid } from "./isEmailValid";

describe("isEmailValid", () => {
  describe("Invalid emails", () => {
    it("Should fail for email without @", () => {
      expect(isEmailValid("simon.dot.dev")).toBe(false);
    });
    it("Should fail for email without local part", () => {
      expect(isEmailValid("@simproch.dev")).toBe(false);
    });
    it("Should fail for email without domain", () => {
      expect(isEmailValid("simon@")).toBe(false);
    });
    it("Should fail for dots as first/last/consecutive characters", () => {
      expect(isEmailValid(".simon@simproch.dev")).toBe(false);
      expect(isEmailValid("simon@simproch.dev.")).toBe(false);
      expect(isEmailValid("simon@simproch..dev.")).toBe(false);
      expect(isEmailValid("sim..on@simproch.dev.")).toBe(false);
    });
    it("Should fail for wikipedia examples", () => {
      // https://en.wikipedia.org/wiki/Email_address#Examples
      expect(isEmailValid("Abc.example.com")).toBe(false);
      expect(isEmailValid("A@b@c@example.com")).toBe(false);
      expect(isEmailValid('a"b(c)d,e:f;g<h>i[jk]l@example.com')).toBe(false);
      expect(isEmailValid('just"not"right@example.com')).toBe(false);
      expect(isEmailValid('this is"notallowed@example.com')).toBe(false);
      expect(isEmailValid('this still"not\\allowed@example.com')).toBe(false);
      expect(
        isEmailValid(
          "i_like_underscore@but_its_not_allowed_in_this_part.example.com"
        )
      ).toBe(false);
    });
  });
  describe("Valid emails", () => {
    it("Should work for correct email and + variants", () => {
      expect(isEmailValid("example@example.com")).toBe(true);
      expect(isEmailValid("simon@simproch.dev")).toBe(true);
      expect(isEmailValid("simon+test1@simproch.dev")).toBe(true);
      expect(isEmailValid("simon+1@simproch.dev")).toBe(true);
    });
    it("Should work for wikipedia valid examples", () => {
      // https://en.wikipedia.org/wiki/Email_address#Examples
      expect(isEmailValid("simple@example.com")).toBe(true);
      expect(isEmailValid("very.common@example.com")).toBe(true);
      expect(
        isEmailValid("disposable.style.email.with+symbol@example.com")
      ).toBe(true);
      expect(isEmailValid("other.email-with-hyphen@example.com")).toBe(true);
      expect(isEmailValid("fully-qualified-domain@example.com")).toBe(true);
      expect(isEmailValid("user.name+tag+sorting@example.com")).toBe(true);
      expect(isEmailValid("x@example.com")).toBe(true);
      expect(isEmailValid("example-indeed@strange-example.com")).toBe(true);
      expect(isEmailValid("test/test@test.com")).toBe(true);
      expect(isEmailValid("example@s.example")).toBe(true);
      expect(isEmailValid('"john..doe"@example.org')).toBe(true);
      expect(isEmailValid("mailhost!username@example.org")).toBe(true);
      expect(
        isEmailValid(
          '"very.(),:;<>[]".VERY."very@\\ "very".unusual"@strange.example.com'
        )
      ).toBe(true);
      expect(isEmailValid("user%example.com@example.org")).toBe(true);
      expect(isEmailValid("user-@example.org")).toBe(true);
      expect(isEmailValid("postmaster@[123.123.123.123]")).toBe(true);
    });
  });
});
