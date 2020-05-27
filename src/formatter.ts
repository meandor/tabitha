export const NO_DATA = "Keine Angaben";

export function formatPrice(price: number) {
  return price.toFixed(2).replace(".", ",");
}

export function formatDate(date: string, withTime = false) {
  if (date) {
    const dateObject = new Date(date);
    let formattedDate = `${dateObject.getDate().toString().padStart(2, "0")}.${(
      dateObject.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${dateObject.getFullYear()}`;
    if (withTime) {
      formattedDate += ` ${dateObject
        .getUTCHours()
        .toString()
        .padStart(2, "0")}:${dateObject
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }
    return formattedDate;
  }
  return NO_DATA;
}
