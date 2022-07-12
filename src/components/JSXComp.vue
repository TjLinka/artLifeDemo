<script>
const options = [
  {
    value: 1,
    label: 'w',
  },
  {
    value: 2,
    label: 'q',
  },
  {
    value: 3,
    label: 'e',
  },
];
console.log(options);
export default {
  render(createElement) {
    return createElement(
      'div', // имя тега
      [
        createElement('select', [
          options.map(option => createElement('option', { attrs: { value: option.value } }, option.label)),
        ]),
      ],
    );
  },
};
</script>

<style></style>
