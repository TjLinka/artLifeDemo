<template>
  <div class="licevoischet__page">
    <div class="container">
      <h4 class="mt-4 modal_title">
        {{$t("Настройки партнера")}}
        <span
          v-on:click="$emit('enlarge-text')" class="close_btn"></span>
      </h4>
      <div class="row edit">
        <div class="col-md-6 mt-4">
          <span v-if="state" class="custom_label">
            {{$t("Партнер получатель")}}
          </span>
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
        <div class="col-md-6 mt-4">
          <div class="col-md trans_btns">
            <button
            v-on:click="$emit('update-data', selectedUser)"
            :disabled="isDisabled"
            :class="isDisabled ? 'disabled' : ''"
            >
            {{$t("Партнер получатель")}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">{{$t("Ошибка")}}!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      {{$t("Данные указаны не верно")}}
    </b-toast>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'PartnerIndicatorsModal',
  props: ['lo', 'reserve'],
  data() {
    return {
      state: '',
      links: [],
      options: [],
      selectedUser: '',
    };
  },
  mounted() {
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
      backApi.get('/agent/agent-list', { params: { q: qr } }).then(Response => {
        Response.data.entries.forEach(u => {
          // eslint-disable-next-line no-param-reassign
          u.value = `${u.agent_id}-${u.name}`;
        });
        cb(Response.data.entries.slice(0, 10));
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
  },
  computed: {
    isDisabled() {
      if (this.selectedUser === null || this.selectedUser === '' || this.state === null || this.state === '') {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.licevoischet__page{
  padding-bottom: 40px;
  padding-top: 0px;
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
    width: 100%;
    &.disabled{
      color: #9A9A9A;
      border-color: #C4C4C4;
      cursor: auto;
    }
  }
}
@media (max-width: 425px) {
  .perevod {
    font-size: 18px;
    text-transform: uppercase;
  }
  .trans_btns {
    flex-direction: column;
    padding: 0;
    button {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
<style></style>
