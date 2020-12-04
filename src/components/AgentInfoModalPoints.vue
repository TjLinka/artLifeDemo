<template>
  <div class="licevoischet__page">
    <div class="container">
      <h4 class="mt-4">
        Перевести баллы между партнёрами
        <span
          v-on:click="$emit('enlarge-text')"
          style="display: inline-block; float: right; color: #32aaa7; cursor: pointer"
          >X</span
        >
      </h4>
      <div class="row transfert">
        <div class="col-md-6">
          <p>ЛО:</p>
          <p>{{ lo }} баллов</p>
        </div>
        <div class="col-md-6 mt-4">
          <p>Резерв:</p>
          <p>{{ reserve }} баллов</p>
        </div>
      </div>
      <h3 class="perevod">Перевод количества баллов</h3>
      <div class="row edit">
        <div class="col-md-6 mt-4">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Партнер получатель"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="col-md-6 mt-4">
          <el-input placeholder="Сумма" type="number" v-model="sum" clearable class="count">
          </el-input>
        </div>
      </div>
      <div class="row edit mt-4">
        <div class="col-md trans_btns">
          <button @click="send">Перевести</button>
        </div>
      </div>
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
  name: 'AgentInfoModalPoints',
  props: ['lo', 'reserve'],
  data() {
    return {
      state: '',
      links: [],
      sum: null,
      toastCount: 0,
    };
  },
  mounted() {
  },
  methods: {
    querySearchAsync(queryString, cb) {
      const qr = queryString === '' ? 'а' : queryString;
      backApi.get('/agent/agent-list', { params: { q: qr } }).then((Response) => {
        Response.data.entries.forEach((u) => {
          // eslint-disable-next-line no-param-reassign
          u.value = `${u.agent_id}-${u.name}`;
        });
        cb(Response.data.entries.slice(0, 10));
      });
    },
    back() {
      this.$router.go(-1);
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
        await backApi
          .post('/agent/send_points', {
            to: this.selectedUser,
            amount: this.sum,
          })
          .catch(() => {
            this.$bvToast.show('my-toast');
          });
        backApi.get('/agent/profile').then((Response) => {
          this.transfertInfo = Response.data;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
  // display: flex;
  // justify-content: space-between;
  & button{
    display: block;
    float: right;
  }
}
@media (max-width: 425px) {
  .perevod {
    font-size: 18px;
    text-transform: uppercase;
  }
  .trans_btns {
    flex-direction: column;
    button {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
<style></style>
