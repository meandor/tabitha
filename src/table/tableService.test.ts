import { normalize, order } from "./tableService";

describe("normalize value", () => {
  it("should lowercase a string with one uppercase", () => {
    const actual = normalize("fOo");
    const expected = "foo";

    expect(actual).toBe(expected);
  });

  it("should lowercase a uppercase string", () => {
    const actual = normalize("FOO");
    const expected = "foo";

    expect(actual).toBe(expected);
  });

  it("should do nothing to already lowercase string", () => {
    const actual = normalize("foo");
    const expected = "foo";

    expect(actual).toBe(expected);
  });

  it("should do nothing to number", () => {
    const actual = normalize(42);
    const expected = 42;

    expect(actual).toBe(expected);
  });

  it("should do nothing to object", () => {
    const actual = normalize({ foo: "Bar" });
    const expected = { foo: "Bar" };

    expect(actual).toEqual(expected);
  });
});

describe("order elements", () => {
  it("should do nothing for empty list", () => {
    const expected: never[] = [];
    const actual = order([], 0, 1, "foo", true);

    expect(actual).toEqual(expected);
  });

  it("should do nothing for list with one item and one item per page", () => {
    const expected = [{ id: "foo" }];
    const actual = order([{ id: "foo" }], 1, 1, "id", true);

    expect(actual).toEqual(expected);
  });

  it("should show page one when page is below 1", () => {
    const expected = [{ id: "foo" }];
    const actual = order([{ id: "foo" }], 0, 1, "id", true);

    expect(actual).toEqual(expected);
  });

  it("should show page two order ascending", () => {
    const expected = [{ id: "foo" }];
    const actual = order([{ id: "foo" }, { id: "bar" }], 2, 1, "id", true);

    expect(actual).toEqual(expected);
  });

  it("should show page one order ascending for multiple items", () => {
    const expected = [{ id: "0" }, { id: "bar" }];
    const actual = order(
      [{ id: "0" }, { id: "foo" }, { id: "bar" }],
      1,
      2,
      "id",
      true
    );

    expect(actual).toEqual(expected);
  });

  it("should show page one order descending for multiple items", () => {
    const expected = [{ id: "foo" }, { id: "bar" }];
    const actual = order(
      [{ id: "0" }, { id: "foo" }, { id: "bar" }],
      1,
      2,
      "id",
      false
    );

    expect(actual).toEqual(expected);
  });
});
