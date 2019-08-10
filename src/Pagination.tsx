import * as React from "react";

function paginationItem(
  activePage: number,
  currentPage: number,
  changePageFunction: (page: number) => any
) {
  let pageClass = "page";
  if (activePage === currentPage) {
    pageClass += " active";
  }

  return (
    <span
      className={pageClass}
      key={currentPage}
      onClick={changePageFunction(currentPage)}
      role="presentation"
    >
      {currentPage}
    </span>
  );
}

export function Pagination(
  itemsCount: number,
  itemsPerPage: number,
  activePage: number,
  changePageFunction: (page: number) => any
) {
  const pages = Math.ceil(itemsCount / itemsPerPage) + 1;
  const pagesRange = Array.from(Array(pages).keys());
  pagesRange.shift();
  const mapPageFunction = (page: number) => {
    return paginationItem(activePage, page, changePageFunction);
  };

  return (
    <p className="pagination" data-testid="pagination">
      {"Seite: "}
      {pagesRange.map(mapPageFunction)}
    </p>
  );
}
