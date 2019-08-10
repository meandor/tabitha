import * as React from "react";
import { Pagination } from "./Pagination";
import "./Table.scss";
import { TableHeader } from "./TableHeader";
import { order } from "./tableService";

interface ITableState {
  orderBy: string;
  ascending: boolean;
  page: number;
}

interface ITableProps {
  elements: any[];
  itemsPerPage: number;
  tableId: string;
  fields: any[];
  rowRenderFunction: (element: any) => React.Component;
}

interface IField {
  name: string;
  id: string;
  sortable: boolean;
}

export class Table extends React.Component<ITableProps, ITableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ascending: true,
      orderBy: "id",
      page: 1
    };

    this.changePage = this.changePage.bind(this);
    this.changeOrderBy = this.changeOrderBy.bind(this);
  }

  public changePage(page: number) {
    this.setState({ page });
  }

  public changeOrderBy(field: string) {
    let newAscending = true;
    const { orderBy, ascending } = this.state;
    if (orderBy === field) {
      newAscending = !ascending;
    }
    this.setState({
      ascending: newAscending,
      orderBy: field
    });
  }

  public render() {
    const { page, orderBy, ascending } = this.state;
    const {
      elements,
      itemsPerPage,
      tableId,
      fields,
      rowRenderFunction
    } = this.props;
    return (
      <section id={tableId}>
        {Pagination(elements.length, itemsPerPage, page, this.changePage)}
        <table>
          <thead>
            <tr>
              {fields.map((field: IField) =>
                TableHeader(orderBy, ascending, this.changeOrderBy, field)
              )}
            </tr>
          </thead>
          <tbody>
            {order(elements, page, itemsPerPage, orderBy, ascending).map(
              rowRenderFunction
            )}
          </tbody>
        </table>
      </section>
    );
  }
}
