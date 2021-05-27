<template>
  <div class="licevoischet__page">
    <div class="container-md">
      <h4 class="mt-4 modal_title">
        Перевести между лицевыми счетами
        <span class="close_btn" v-on:click="$emit('enlarge-text')"></span>
      </h4>
      <div class="row transfert">
        <!-- <div class="col-md-6">
          <p>ЛО:</p>
          <p>{{ lo }} баллов</p>
        </div> -->
        <div class="col-md-6">
          <p>Баланс:</p>
          <p>{{ balance | localInt }}</p>
        </div>
      </div>
      <h3 class="perevod">Перевод средств</h3>
      <div class="row edit end">
        <div class="col-md-6 mt-4">
          <span v-if="state" class="custom_label">Партнер получатель</span>
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Партнер получатель"
            clearable
            @clear="dd"
            @change="gg"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="col-md-6 mt-4 custom_input">
              <input type="text" name="sum" id="sum" required v-model="sum" step="0.1"
              v-currency="{
                currency: null,
                valueAsInteger: false,
                distractionFree: false,
                allowNegative: false
              }"
              @keydown="checkInput($event)"
              />
              <label for="sum">Сумма</label>
              <span class="clear_icon" @click="clearSum()"></span>
        </div>
      </div>
      <div class="row edit mt-4">
        <div class="col-md-6 custom_input comment">
              <input type="text" name="comm" id="comm" required v-model="comm" />
              <label for="comm">Комментарий</label>
              <span class="clear_icon" @click="clearComm()"></span>
        </div>
        <div class="col-md trans_btns">
          <button
          :disabled="!pointsGo"
          :class="pointsGo ? '' : 'disabled'"
          @click="send"
          >Перевести</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import backApi from '../assets/backApi';

export default {
  name: 'AgentInfoModalMoney',
  props: ['balance', 'id'],
  data() {
    return {
      state: '',
      comm: '',
      list: [],
      options: [],
      sum: null,
      toastCount: 0,
      selectedUser: null,
    };
  },
  mounted() {
  },
  computed: {
    pointsGo() {
      if (
        this.selectedUser !== ''
        && this.selectedUser !== null
        && this.state !== ''
        && this.sum !== null
        && this.sum !== '') {
        return true;
      // eslint-disable-next-line no-else-return
      } else {
        return false;
      }
    },
  },
  methods: {
    // eslint-disable-next-line consistent-return
    checkInput(e) {
      console.log();
      if (e.which === 189 || e.which === 109 || e.which === 107 || e.which === 187) {
        // eslint-disable-next-line no-restricted-globals
        e.preventDefault();
        return false;
      }
    },
    clearSum() {
      this.sum = null;
    },
    clearComm() {
      this.comm = null;
    },
    querySearchAsync(queryString, cb) {
      const qr = queryString === '' ? 'а' : queryString;
      backApi.get('/agent/agent-list', { params: { q: qr } }).then((Response) => {
        Response.data.entries.forEach((u) => {
          // eslint-disable-next-line no-param-reassign
          u.value = `${u.agent_id}-${u.name}`;
        });
        // eslint-disable-next-line arrow-body-style
        const newMass = Response.data.entries.filter((u) => {
          return u.agent_id > 0 && u.agent_id !== this.id;
        });
        cb(newMass.slice(0, 10));
      });
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    handleSelect(item) {
      this.selectedUser = item.agent_id;
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
    makeToast(append = false) {
      // eslint-disable-next-line no-plusplus
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: 'BootstrapVue Toast',
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
    async send() {
      if (this.sum !== null && this.sum !== '') {
        console.log('1');
        if (Number(this.sum.replace(/,/, '.').replace(/\s/g, '')) <= this.balance) {
          console.log('2');
          await backApi
            .post('/agent/send_money', {
              agent_to: this.state.replace(/\D/g, ''),
              amount: Number(this.sum.replace(/,/, '.').replace(/\s/g, '')),
              comm: this.comm,
            })
            .then(() => {
              this.createMessageBoxError('Операция выполнена успешно');
            })
            .catch(() => {
              this.createMessageBoxError('Что-то пошло не так');
            });
        } else {
          this.createMessageBoxError('Вы не можете перевести больше чем у Вас есть');
        }
      }
    },
    createMessageBoxError(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('h5', { class: ['text-center'] }, [messageText]),
      ]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxOk([messageVNode], {
        buttonSize: 'xl',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'OK',
        size: 'md',
      });
    },
  },
};
</script>
<style lang="scss" scoped>

.custom_input{
  // margin-top: 29px !important;
}
.close_btn{
  display: inline-block;
  position: absolute;
  right: 0;
}
div[role='combobox']{
  width: 100%;
}
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
  & button{
    width: 100%;
    float: right;
  }
  & button.disabled{
    color: #9A9A9A;
    border-color: #C4C4C4;
    cursor: auto;
  }
}
@media (max-width: 768px) {
  .perevod {
    font-size: 20px;
    // text-transform: uppercase;
    margin-bottom: 0;
  }
}
@media (max-width: 425px) {
  .perevod {
    font-size: 16px;
    // text-transform: uppercase;
    margin-bottom: 0;
  }
  .comment{
    margin-bottom: 30px;
  }
  .trans_btns {
    flex-direction: column;
    button {
      width: 100%;
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
  .transfert {
      & p {
        font-size: 14px;
      }
      & > .col-md-6 {
        p:nth-of-type(1) {
        }
        p:nth-of-type(2) {
        }
      }
  }
}
</style>
