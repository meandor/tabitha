import { formatDate } from "./formatter";

describe("formatDate()", () => {
  it("should format a date without time into german locale", () => {
    const expected = "01.01.2012";
    const actual = formatDate("2012-01-01");

    expect(actual).toBe(expected);
  });

  it("should format end of year without time into german locale", () => {
    const expected = "31.12.2012";
    const actual = formatDate("2012-12-31");

    expect(actual).toBe(expected);
  });

  it("should format day without time into german locale with time", () => {
    const expected = "31.12.2012 00:00";
    const actual = formatDate("2012-12-31", true);

    expect(actual).toBe(expected);
  });

  it("should format day with time into german locale with time", () => {
    const expected = "31.12.2012 01:30";
    const actual = formatDate("2012-12-31T01:30:11Z", true);

    expect(actual).toBe(expected);
  });

  it("should format afternoon day into german locale with time", () => {
    const expected = "31.12.2012 14:30";
    const actual = formatDate("2012-12-31T14:30:11Z", true);

    expect(actual).toBe(expected);
  });
});
