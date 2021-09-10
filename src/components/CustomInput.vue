<template>
  <div class="custom_input">
    <input
      type="text"
      :value="transValue"
      @change="editTrans($event, userId)"
      :class="[changed? 'changed' : '', isError? 'error' : '']"
      required
    />
    <label :for="`trans${userId}`">Трансферт</label>
    <span class="clear_icon" @click="clearTranfer($event, userId)"></span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CustomInput',
  props: ['rowa'],
  computed: {
    ...mapGetters('transStore', ['getTransfert']),
    transValue() {
      return this.getTransfert(this.rowa.id).transData.transfert;
    },
    userId() {
      return this.getTransfert(this.rowa.id).id;
    },
    changed() {
      // eslint-disable-next-line max-len
      return Number(this.getTransfert(this.rowa.id).transData.transfert) !== this.getTransfert(this.rowa.id).transData.lo;
    },
    isError() {
      // eslint-disable-next-line max-len
      return Number(this.getTransfert(this.rowa.id).transData.transfert) > this.getTransfert(this.rowa.id).transData.lo + this.getTransfert(this.rowa.id).transData.reserve;
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions('transStore', ['setDefault', 'setNewTransfert']),
    clearTranfer(evt, id) {
      this.setDefault(id);
      evt.stopPropagation();
    },
    editTrans(e, id) {
      if (e.target.value === '') {
        e.target.value = 0;
        this.setNewTransfert({ val: e.target.value, userid: id });
        return;
      }
      this.setNewTransfert({ val: e.target.value, userid: id });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom_input{
  input{
    padding-left: 0;
    background: transparent;
    border-bottom: 1px solid black;
    &:hover ~ label{
      // color: white;
    }
    &:hover{
      border-bottom: 1px solid black;
    }
    &.error{
      border-bottom: 1px solid red !important;
    }
    &.changed{
      border-bottom: 1px solid green;
    }
  }
  label{
    color: black;
    left: 0;
    z-index: 1;
    &:hover{
      color: white;
    }
  }
  .clear_icon{
    right: 0;
    background-image: url('../assets/imgs/close_btn_white.svg');
  }
}
</style>
