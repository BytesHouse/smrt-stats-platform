export function convertIsoToYyyyMmDd(isoDate: string) {
  try {
    const dateObject = new Date(isoDate);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    return formattedDate;
  } catch (error) {
    return '';
  }
}
