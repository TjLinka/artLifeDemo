function dateFormat(value) {
  const formatter = new Intl.DateTimeFormat('ru');
  const date = new Date(value);
  // eslint-disable-next-line no-restricted-globals
  if (value === '' || value === null || value === '-') {
    return '-';
  }
  return formatter.format(date);
}

export default dateFormat;
