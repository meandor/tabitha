import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Pagination } from "./Pagination";

afterEach(() => {
  cleanup();
});

describe("pagination", () => {
  it("should show pagination for one page", () => {
    const actual = Pagination(1, 1, 1, jest.fn());
    const { getByTestId, getByText } = render(actual);

    expect(getByTestId("pagination")).toHaveTextContent("Seite: 1");
    expect(getByText("1")).toHaveClass("active");
  });

  it("should show pagination for multiple pages", () => {
    const actual = Pagination(20, 4, 2, jest.fn());
    const { getByTestId, getByText } = render(actual);

    expect(getByTestId("pagination")).toHaveTextContent("Seite: 12345");
    expect(getByText("2")).toHaveClass("active");
  });

  it("should execute changePage function when clicked", async () => {
    const changePageMock = jest.fn();
    const actual = Pagination(20, 4, 2, changePageMock);
    const { getByText, findByText } = render(actual);

    const pageOneNode = getByText("1");
    expect(pageOneNode).not.toHaveClass("active");

    fireEvent.click(pageOneNode);

    await findByText("1");

    expect(changePageMock).toBeCalledWith(1);

    const pageThreeNode = getByText("3");
    expect(pageThreeNode).not.toHaveClass("active");

    fireEvent.click(pageThreeNode);

    await findByText("3");

    expect(changePageMock).toBeCalledWith(3);
  });
});
