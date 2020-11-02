export function ReplaceNull(data) {
  Object.keys(data).forEach((e) => {
    // eslint-disable-next-line no-param-reassign
    data[e] = ['', null].includes(data[e]) ? '-' : data[e];
  });
  return data;
}
export function ferESlint() {
  return 42;
}
