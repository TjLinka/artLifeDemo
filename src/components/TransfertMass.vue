<template>
  <div class="licevoischet__page">
    <div class="container-md">
      <h4 class="mt-4 modal_title">{{$t("Текущее состояние")}}
        <span class="close_btn" v-on:click="$emit('enlarge-text')"></span>
      </h4>
      <div class="row transfert">
        <div class="col-md-6">
          <p>{{$t("ЛО")}}:</p>
          <p>{{ transfertInfo.lo | localInt }} {{$t("баллов")}}</p>
        </div>
        <div class="col-md-6">
          <p>{{$t("Резерв")}}:</p>
          <p>{{ transfertInfo.reserve | localInt }} {{$t("баллов")}} </p>
        </div>
      </div>
      <h3 class="perevod">
        {{$t("Перевод количества баллов")}}
      </h3>
      <div class="row mt-3">
        <div class="col-md-6 perioad__picker">
        <BasePeriodPicker :currentPeriod="currentPeriod"
        v-on:next-period="nextPeriod" class="period_picker"/>
        </div>
      </div>
      <b-row align-v="end" class="row edit">
        <div class="col-xl mt-4 custom_input">
              <input type="text" name="sum" id="sum"
              required step="0.1"
              v-model="sum"
              v-currency="{

                currency: null,
                valueAsInteger: false,
                distractionFree: false,
                allowNegative: false
              }"
              @keydown="checkInput($event)"
               />
              <label for="sum">
                {{$t("Сумма")}}
              </label>
              <span class="clear_icon" @click="clearSum()"></span>
        </div>
        <div class="col custom_input">
          <input type="text" name="comm" id="comm" v-model="comm" required/>
          <label for="comm">
            {{$t("Комментарий")}}
          </label>
          <span class="clear_icon" @click="clearComm()"></span>
        </div>
        <div class="col-xl trans_btns">
          <button @click="lo2reserve"
          :disabled="isDisabled"
          :class="isDisabled ? 'disabled' : ''">
          {{$t("Перевести в резерв")}}
          </button>
          <button @click="reserve2lo"
          :disabled="isDisabled"
          :class="isDisabled ? 'disabled' : ''"
          >
          {{$t("Перевести в трансферт")}}
          </button>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>

import $ from 'jquery';
import backApi from '../assets/backApi';
import BasePeriodPicker from './BasePeriodPicker.vue';

export default {
  name: 'Transfert',
  components: {
    BasePeriodPicker,
  },
  props: ['id'],
  data() {
    return {
      transfertInfo: {},
      periods: [],
      periodIndex: 0,
      comm: null,
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
    currentPeriod() {
      try {
        return this.periods[this.periodIndex].period;
      } catch (e) {
        return '';
      }
    },
  },
  mounted() {
    backApi.get('/agent/transfer-info', { params: { another_agent_id: this.id } }).then((response) => {
      this.transfertInfo = response.data;
    });
    backApi.get('/agent/get-open-periods').then((Response) => {
      this.periods = Response.data.entries.sort((a, b) => {
        const result = a.comdte > b.comdte ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
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
    clearComm() {
      this.comm = '';
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
            sum: this.sum.replace(/,/, '.').replace(/\s/g, ''),
            direction: 'lo2reserve',
            comdte: this.currentPeriod,
          })
          .then(() => {
            this.createMessageBoxError(this.$t('Операция выполнена успешно'));
          })
          .catch(() => {
            this.createMessageBoxError(this.$t('Что-то пошло не так'));
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
            sum: this.sum.replace(/,/, '.').replace(/\s/g, ''),
            direction: 'reserve2lo',
            comdte: this.currentPeriod,
          })
          .then(() => {
            this.createMessageBoxError(this.$t('Операция выполнена успешно'));
          })
          .catch(() => {
            this.createMessageBoxError(this.$t('Что-то пошло не так'));
          });
        backApi.get('/agent/transfer-info', { params: { another_agent_id: this.id } }).then((Response) => {
          this.transfertInfo = Response.data;
        });
        this.$emit('action');
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
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
    },
  },
  // watch: {
  //   currentPeriod(v) {
  //     backApi.get('agent/bonus-detail', { params: { comdte: v } }).then((response) => {
  //       this.bonus = response.data.entries;
  //       // eslint-disable-next-line no-param-reassign
  //       response.data.header.period = this.currentPeriod;
  //       this.topTableData = [response.data.header];
  //     });
  //   },
  // },
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
