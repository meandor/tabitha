import * as React from "react";

export namespace Pagination {
    function paginationItem(activePage: number, currentPage: number, changePageFunction: Function) {
        let pageClass = "page";
        if (activePage === currentPage) {
            pageClass += " active";
        }

        return (
            <span
                className={pageClass}
                key={currentPage}
                onClick={() => changePageFunction(currentPage)}
                role="presentation"
            >
      {currentPage}
    </span>
        );
    }

    export function component(
        itemsCount: number,
        itemsPerPage: number,
        activePage: number,
        changePageFunction: Function
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
}
