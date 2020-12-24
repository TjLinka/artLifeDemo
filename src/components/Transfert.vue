<template>
  <div class="licevoischet__page">
    <div class="container-md">
      <h4 class="mt-4 modal_title">Текущее состояние
        <span class="close_btn" v-on:click="$emit('enlarge-text')"></span>
      </h4>
      <div class="row transfert">
        <div class="col-md-6">
          <p>ЛО:</p>
          <p>{{ transfertInfo.lo }} баллов</p>
        </div>
        <div class="col-md-6">
          <p>Резерв:</p>
          <p>{{ transfertInfo.reserve }} баллов</p>
        </div>
      </div>
      <h3 class="perevod">Перевод количества баллов</h3>
      <div class="row edit">
        <div class="col-xl-6 mt-4 custom_input">
              <input type="number" name="sum" id="sum" required v-model="sum" />
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
  </div>
</template>

<script>
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
    clearSum() {
      this.sum = null;
    },
    back() {
      this.$router.go(-1);
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
          .catch(() => {
            this.$bvToast.show('my-toast');
          });
        backApi.get('/agent/transfer-info', { params: { another_agent_id: this.id } }).then((Response) => {
          this.transfertInfo = Response.data;
        });
      }
    },
    async reserve2lo() {
      if (this.sum !== null && this.sum !== '') {
        await backApi
          .post(`agent/transfert/${this.id}`, {
            sum: this.sum,
            direction: 'reserve2lo',
          })
          .catch(() => {
            this.$bvToast.show('my-toast');
          });
        backApi.get('/agent/transfer-info', { params: { another_agent_id: this.id } }).then((Response) => {
          this.transfertInfo = Response.data;
        });
      }
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
