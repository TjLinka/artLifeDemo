<template>
  <div class="licevoischet__page">
    <div class="container-md">
      <h4 class="mt-4 modal_title">{{$t("Передача прав")}}
        <span v-on:click="$emit('enlarge-text')" class="close_btn"></span>
      </h4>
      <div class="row transfert mt-5 edit">
        <div class="col-xl-6">
          <span v-if="state" class="custom_label">
            {{$t("Партнер получатель")}}
          </span>
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            :placeholder="`${$t('Партнер получатель')}`"
            clearable
            @clear="dd"
            @change="gg"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="col-xl-6 trans_btns">
          <button
          @click="takeRights"
          :disabled="isDisabled"
          :class="isDisabled ? 'disabled' : ''"
          >{{$t("Передать права")}}</button>
          <button
          @click="resetData"
          >{{$t("Сбросить")}}</button>
        </div>
      </div>
    </div>
    <b-toast id="my-toast-error" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">{{$t("Не был выбран партнер")}}!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
        {{$t("Выберете партнера, которому хотите передать права")}}
    </b-toast>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'RightsModalTake',
  data() {
    return {
      state: '',
      options: [],
      selectedUser: null,
    };
  },
  mounted() {
    backApi.get('/agent/profile').then(Response => {
      this.transfertInfo = Response.data;
    });
  },
  methods: {
    // remoteMethod(qr) {
    //   if (qr !== '') {
    //     backApi.get('/agent/agent-list', { params: { q: qr } }).then((Response) => {
    //       console.log(Response.data);
    //       this.options = Response.data.entries.filter((u) => u.agent_id !== this.id);
    //     });
    //   }
    // },
    querySearchAsync(queryString, cb) {
      const qr = queryString === '' ? 'а' : queryString;
      backApi.get('/agent/distr-agents-list', { params: { q: qr } }).then(Response => {
        Response.data.entries.forEach(u => {
          // eslint-disable-next-line no-param-reassign
          u.value = `${u.agent_id}-${u.name}`;
        });
        const newMass = Response.data.entries.filter(u => u.agent_id > 0);
        cb(newMass.slice(0, 10));
      });
    },
    handleSelect(item) {
      this.selectedUser = item;
    },
    gg() {
      this.state = `${this.selectedUser.agent_id}-${this.selectedUser.name}`;
      console.log('gg');
    },
    dd() {
      this.state = '';
      this.selectedUser = null;
      console.log('dd');
    },
    resetData() {
      this.selectedUser = null;
      this.$emit('enlarge-text');
    },
    async takeRights() {
      const res = await this.createMessageBox('Вы уверны, что хотите передать права?');
      if (res) {
        if (this.selectedUser !== null && this.selectedUser !== '') {
          await backApi.post('/agent/share-transfert', { agent_to: this.selectedUser.agent_id });
          await backApi.get('/agent/profile/').then(Response => {
            this.$emit('rulegiver', Response.data.agent2transfer_name);
          });
          this.$emit('enlarge-text');
          this.$emit('toast');
        } else {
          this.$bvToast.show('my-toast-error');
        }
      }
    },
    createMessageBox(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [h('h3', { class: ['text-center'] }, [messageText])]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxConfirm([messageVNode], {
        buttonSize: 'md',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'Да',
        size: 'xl',
      });
    },
  },
  computed: {
    isDisabled() {
      if (this.state === '' || this.state === null) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.transfert {
  margin-bottom: 30px;
  margin-top: 30px;
  & p {
    padding: 0;
    margin: 0;
  }
  & > .col-md-6 {
    p:nth-of-type(1) {
      color: #9a9a9a;
    }
    p:nth-of-type(2) {
      font-weight: 500;
    }
  }
}
.edit {
  & input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #dee2f3;
    padding-bottom: 10px;
    outline: none;
  }

  & button {
    width: 48%;
    padding: 8px 0px;
    background: white;
    color: #32aaa7;
    border: 1px solid #32aaa7;
    border-radius: 2px;
    font-weight: 500;
  }
}
.trans_btns {
  display: flex;
  // margin-top: 20px;
  justify-content: space-between;
  & button.disabled:nth-of-type(1){
    color: #9A9A9A;
    border-color: #C4C4C4;
    cursor: auto;
  }
}
@media (max-width: 1200px) {
  .trans_btns{
    margin-top: 20px;
  }
}
@media (max-width: 425px) {
  .perevod {
    font-size: 18px;
    text-transform: uppercase;
  }
  .trans_btns {
    flex-direction: column;
    margin-top: 0;
    button {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .edit > .col-xl-6{
    margin-bottom: 20px;
  }
  .autocomplete_input{
    margin-bottom: 25px;
  }
}
</style>
<style>
div[role='combobox']{
  width: 100%;
}
</style>
