export function normalize(element: any) {
  if (typeof element === "string") {
    return element.toLowerCase();
  }

  return element;
}

export function order(
  elements: any[],
  page: number,
  itemsPerPage: number,
  orderBy: string,
  ascending: boolean
) {
  const sanitizedPage = Math.max(page, 1);
  const start = (sanitizedPage - 1) * itemsPerPage;
  const end = sanitizedPage * itemsPerPage;

  return elements
    .sort((a: any, b: any) => {
      const elementA = normalize(a[orderBy]);
      const elementB = normalize(b[orderBy]);
      if (elementA < elementB && ascending) {
        return -1;
      }
      if (elementA > elementB && ascending) {
        return 1;
      }
      if (elementA < elementB && !ascending) {
        return 1;
      }
      if (elementA > elementB && !ascending) {
        return -1;
      }
      return 0;
    })
    .slice(start, end);
}
