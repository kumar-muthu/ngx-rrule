export const getDateParts = (dateObj) => {
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return {month, day, year};
}
