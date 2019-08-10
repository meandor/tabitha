import * as React from "react";
import "./Table.scss";
import {Pagination} from "./Pagination";
import {TableHeader} from "./TableHeader";
import {order} from "./tableService";

interface TableState {
  orderBy: string,
  ascending: boolean,
  page: number
}

interface TableProps {
  elements: any[],
  itemsPerPage: number,
  tableId: string,
  fields: any[],
  rowRenderFunction: Function
}

class Table extends React.Component<TableProps, TableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      orderBy: "id",
      ascending: true,
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
      orderBy: field,
      ascending: newAscending
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
        {Pagination.component(elements.length, itemsPerPage, page, this.changePage)}
        <table>
          <thead>
            <tr>
              {fields.map(
                (field: { name: string; id: string; sortable: boolean }) =>
                  TableHeader.component(orderBy, ascending, this.changeOrderBy, field)
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

export default Table;
