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
          <p>{{ balance }}</p>
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
            @select="handleSelect"
            clearable
          ></el-autocomplete>
        </div>
        <div class="col-md-6 mt-4 custom_input">
              <input type="number" name="sum" id="sum" required v-model="sum" />
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
      links: [],
      sum: null,
      toastCount: 0,
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
    showToast(title, message, status) {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      // Create the message
      const vNodesMsg = h('p', { class: ['text-center', 'mb-0'] }, [
        h('strong', { class: 'mr-2' }, message),
      ]);
      // Create the title
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          h('strong', { class: 'mr-2' }, title),
        ],
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        variant: status,
      });
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
        if (this.sum <= this.balance) {
          await backApi
            .post('/agent/send_money', {
              agent_to: this.selectedUser,
              amount: this.sum,
              comm: this.comm,
            })
            .then(() => {
              this.$bvToast.show('my-toast-money');
            })
            .catch(() => {
              // this.$bvToast.show('my-toast');
            });
          backApi.get('/agent/profile').then((Response) => {
            this.transfertInfo = Response.data;
          });
          this.$emit('enlarge-text');
        } else {
          this.showToast('Ошибка операции!', 'Введённая вами сумма превышает ваш баланс!', 'danger');
        }
      }
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
