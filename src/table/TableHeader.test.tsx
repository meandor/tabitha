import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { TableHeader } from "./TableHeader";

afterEach(() => {
  cleanup();
});

describe("Pagination", () => {
  it("should return a table header that is not sortable", async () => {
    const orderCallback = jest.fn();
    const actual = TableHeader("foo", true, orderCallback, {
      id: "foo",
      name: "foo",
      sortable: false,
    });
    const { getByText, findByText } = render(
      <table>
        <tbody>
          <tr>{actual}</tr>
        </tbody>
      </table>
    );
    const fooNode = getByText("foo");

    expect(fooNode).toBeInTheDocument();

    fireEvent.click(fooNode);

    await findByText("foo");

    expect(orderCallback).not.toHaveBeenCalled();
  });

  it("should return a table header that is not sortable", async () => {
    const orderCallback = jest.fn();
    const actual = TableHeader("foo", true, orderCallback, {
      id: "foo",
      name: "foo",
      sortable: true,
    });
    const { getByText, findByText } = render(
      <table>
        <tbody>
          <tr>{actual}</tr>
        </tbody>
      </table>
    );
    const fooNode = getByText("foo");

    expect(fooNode).toBeInTheDocument();

    fireEvent.click(fooNode);

    await findByText("foo");

    expect(orderCallback).toBeCalledWith("foo");
  });
});
