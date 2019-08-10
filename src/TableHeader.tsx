import * as React from "react";

function sortSymbol(field: string, orderBy: string, ascending: boolean) {
  if (orderBy === field) {
    if (ascending) {
      return <i className="fas fa-sort-up" />;
    }
    return <i className="fas fa-sort-down" />;
  }
  return "";
}

export function TableHeader(
  orderBy: string,
  ascending: boolean,
  orderCallback: (orderById: string) => any,
  field: { id: string; name: string; sortable: boolean }
) {
  const { id, name, sortable } = field;
  if (!sortable) {
    return (
      <th id={id} key={id}>
        {name}
      </th>
    );
  }
  return (
    <th id={id} key={id} onClick={orderCallback(id)}>
      {name}
      {sortSymbol(id, orderBy, ascending)}
    </th>
  );
}
