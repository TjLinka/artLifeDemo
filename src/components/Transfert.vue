<template>
  <div class="licevoischet__page">
    <div class="container-md">
      <h4 class="mt-4 modal_title">Текущее состояние
        <span class="close_btn" v-on:click="$emit('enlarge-text')"></span>
      </h4>
      <div class="row transfert">
        <div class="col-md-6">
          <p>ЛО:</p>
          <p>{{ transfertInfo.lo | localInt }} баллов</p>
        </div>
        <div class="col-md-6">
          <p>Резерв:</p>
          <p>{{ transfertInfo.reserve | localInt }} баллов</p>
        </div>
      </div>
      <h3 class="perevod">Перевод количества баллов</h3>
      <div class="row edit">
        <div class="col-xl-6 mt-4 custom_input">
              <input type="number" name="sum" id="sum"
              required step="0.1"
              v-model="sum"
              @keydown="checkInput($event)"
               />
              <label for="sum">Сумма</label>
              <span class="clear_icon" @click="clearSum()"></span>
        </div>
          <div class="col-xl-6 trans_btns">
            <button @click="lo2reserve"
            :disabled="isDisabled"
            :class="isDisabled ? 'disabled' : ''">
            Перевести в резерв</button>
            <button @click="reserve2lo"
            :disabled="isDisabled"
            :class="isDisabled ? 'disabled' : ''"
            >Перевести в трансферт</button>
          </div>
      </div>
      <!-- <div class="row edit mt-4">
        <div class="col-xl-6 trans_btns">
          <button @click="lo2reserve"
          :disabled="isDisabled"
          :class="isDisabled ? 'disabled' : ''">
          Перевести в резерв</button>
          <button @click="reserve2lo"
          :disabled="isDisabled"
          :class="isDisabled ? 'disabled' : ''"
          >Перевести в трансферт</button>
        </div>
      </div> -->
    </div>
    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Ошибка!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      Данные указаны не верно
    </b-toast>
    <b-toast id="my-toast-good" variant="success" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#32aaa7" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Успех!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      Операция выполнена успешно
    </b-toast>
  </div>
</template>

<script>
import $ from 'jquery';
import backApi from '../assets/backApi';

export default {
  name: 'Transfert',
  props: ['id'],
  data() {
    return {
      transfertInfo: {},
      sum: null,
      another_agent_id: null,
    };
  },
  computed: {
    isDisabled() {
      if (this.sum === null || this.sum === '') {
        return true;
      }
      return false;
    },
  },
  mounted() {
    backApi.get('/agent/transfer-info', { params: { another_agent_id: this.id } }).then((response) => {
      this.transfertInfo = response.data;
    });
  },
  methods: {
    // eslint-disable-next-line consistent-return
    checkInput(e) {
      // console.log(e.which);
      if (e.which === 189 || e.which === 109 || e.which === 107
      || e.which === 187 || e.which === 190) {
        // eslint-disable-next-line no-restricted-globals
        e.preventDefault();
        return false;
      }
    },
    clearSum() {
      this.sum = null;
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
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
    async lo2reserve() {
      if (this.sum !== null && this.sum !== '') {
        await backApi
          .post(`agent/transfert/${this.id}`, {
            sum: this.sum,
            direction: 'lo2reserve',
          })
          .then(() => {
            this.$bvToast.show('my-toast-good');
            this.createMessageBoxError('Операция выполнена успешно');
          })
          .catch(() => {
            this.$bvToast.show('my-toast');
            this.createMessageBoxError('Что-то пошло не так');
          });
        backApi.get('/agent/transfer-info', { params: { another_agent_id: this.id } }).then((Response) => {
          this.transfertInfo = Response.data;
        });
        this.$emit('action');
      }
    },
    async reserve2lo() {
      if (this.sum !== null && this.sum !== '') {
        await backApi
          .post(`agent/transfert/${this.id}`, {
            sum: this.sum,
            direction: 'reserve2lo',
          })
          .then(() => {
            this.$bvToast.show('my-toast-good');
            this.createMessageBoxError('Операция выполнена успешно');
          })
          .catch(() => {
            this.$bvToast.show('my-toast');
            this.createMessageBoxError('Что-то пошло не так');
          });
        backApi.get('/agent/transfer-info', { params: { another_agent_id: this.id } }).then((Response) => {
          this.transfertInfo = Response.data;
        });
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
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  & button.disabled{
    color: #9A9A9A;
    border-color: #C4C4C4;
    cursor: auto;
  }
}
@media (max-width: 1050px) {
  .trans_btns {
    margin-top: 20px;
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
