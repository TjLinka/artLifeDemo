function removeNull(val) {
  if (val === null || val === '' || val === undefined) {
    return '-';
  }
  return val;
}

export default removeNull;
