import { isCityValid } from "./isCityValid";

describe("isCityValid", () => {
  it("Should pass for valid cities", () => {
    expect(isCityValid("Toronto")).toBe(true);
    expect(isCityValid("St. Catharines")).toBe(true);
    expect(isCityValid("San Fransisco")).toBe(true);
    expect(isCityValid("Val-d'Or")).toBe(true);
    expect(isCityValid("Presqu'ile")).toBe(true);
    expect(isCityValid("Niagara on the Lake")).toBe(true);
    expect(isCityValid("Niagara-on-the-Lake")).toBe(true);
    expect(isCityValid("München")).toBe(true);
    expect(isCityValid("toronto")).toBe(true);
    expect(isCityValid("toRonTo")).toBe(true);
    expect(isCityValid("villes du Québec")).toBe(true);
    expect(isCityValid("Provence-Alpes-Côte d'Azur")).toBe(true);
    expect(isCityValid("Île-de-France")).toBe(true);
    expect(isCityValid("Kópavogur")).toBe(true);
    expect(isCityValid("Garðabær")).toBe(true);
    expect(isCityValid("Sauðárkrókur")).toBe(true);
    expect(isCityValid("Þorlákshöfn")).toBe(true);
  });
  it("Should not pass for invalid cities", () => {
    expect(isCityValid("A----B")).toBe(false);
    expect(isCityValid("------")).toBe(false);
    expect(isCityValid("*******")).toBe(false);
    expect(isCityValid("&&")).toBe(false);
    expect(isCityValid("()")).toBe(false);
    expect(isCityValid("//")).toBe(false);
    expect(isCityValid("\\\\")).toBe(false);
  });
});
