/* eslint-disable no-unused-vars */
const GModalConfirm = {
  methods: {
    createMessageBox(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('h3', { class: ['text-center'] }, [messageText]),
      ]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxConfirm([messageVNode], {
        buttonSize: 'md',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'Да',
        size: 'xl',
      });
    },
    createMessageBoxError(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('h5', { class: ['text-center'], domProps: { innerHTML: messageText } }),
      ]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxOk([messageVNode], {
        buttonSize: 'xl',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'OK',
        size: 'xl',
      });
    },
  },
};

export default GModalConfirm;
