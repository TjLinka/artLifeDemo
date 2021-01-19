function formatDate(date) {
  // eslint-disable-next-line one-var
  const d = new Date(date);
  // eslint-disable-next-line prefer-template
  let month = '' + (d.getMonth() + 1);
  // eslint-disable-next-line prefer-template
  let day = '' + d.getDate();
  const year = d.getFullYear();

  // eslint-disable-next-line prefer-template
  if (month.length < 2) month = '0' + month;
  // eslint-disable-next-line prefer-template
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default formatDate;
