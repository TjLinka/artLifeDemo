<template>
  <div class="licevoischet__page ref_link_page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
        <p class="mobile_back noprint" @click="back">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7" />
          </svg>
        </p>
        <!-- {{ $t('Реферальные ссылки') }} -->
      </h2>
      <div class="row mb-4">
        <div class="col-6">
          <button :class="`btn_type_1 w50`" @click="$router.push('/ref-urls-create')">
            Создать реферальную ссылку
          </button>
        </div>
        <div class="col-6">
          <button
            v-if="selectedRefURL"
            :class="`btn_type_1 w50 ${selectedRefURL ? '' : 'disabled'}`"
            :disabled="!selectedRefURL"
            @click="editReflink"
          >
            Редактировать
          </button>
          <button
            v-if="selectedRefURL"
            :class="`btn_type_1 w50 mr-2 fr ${selectedRefURL ? '' : 'disabled'}`"
            :disabled="!selectedRefURL"
            @click="changeRefState"
          >
            {{ selectedRef.state ? 'Приостановить' : 'Запустить' }}
          </button>
        </div>
      </div>
      <b-table
        :fields="fields"
        :items="entries"
        head-variant="light"
        responsive
        selectable
        ref="selectableTable"
        select-mode="single"
        @row-selected="onRowSelected"
        bordered
      >
        <template v-slot:cell(url)="scope">
          <div class="link_wrapper">
            <p class="popa" :ref="`popa-${scope.item.id}`">Ссылка скопирована</p>
            <a
              class="link"
              :id="`ref-link-${scope.item.id}`"
              :href="scope.item.url"
              target="_blank"
            >
              {{ scope.item.url }}
            </a>
            <!-- <img src="../assets/imgs/copy_icon.svg" alt="" style="width: 20px; height: 20px;"> -->
            <div class="float-right">
            <img src="../assets/imgs/copy_icon.svg" alt="" style="width: 15px; height: 15px;" @click.stop="copyLink(scope.item.id)">
            <img src="../assets/imgs/share_icon.svg" alt="" style="width: 15px; height: 15px; margin-left: 15px;" v-b-modal.modal-scrollable>
            </div>
          </div>
        </template>
      </b-table>
      <!-- <footer class="container-fluid cust_modal">
        <div class="container-md">
          <div class="row desktop_search">
            <div
              class="col text-center search__btn"
              @click="searchActive = !searchActive"
              v-if="!searchActive"
            >
              {{ $t('Фильтр') }} <span class="search_icons"></span>
            </div>
          </div>
          <div v-if="searchActive" class="organization__modal">
            <h3>
              {{ $t('Фильтр') }}
              <span class="close_btn" @click="searchActive = !searchActive"></span>
            </h3>
            <div class="row edit mt-5"></div>
            <div class="row edit"></div>
            <div class="row edit"></div>
          </div>
        </div>
      </footer> -->
    </div>
    <b-modal v-model="show" id="modal-scrollable" centered hide-header-close scrollable title="Поделиться">
      <p style="text-align: center; font-size: 26px;">
        <strong>QR Code</strong>
      </p>
      <div style="text-align: center;">
        <qrcode-vue :value="qrURL" :size="200" level="H"></qrcode-vue>
      </div>
      <p style="text-align: center; font-size: 26px; margin: 0;">
        <strong>Поделиться</strong>
      </p>
      <br />
      <div class="share_links">
        <div class="share-buttons">
          <button
            class="vkontakte"
            :onClick="`window.open('https://vkontakte.ru/share.php?url=${qrURL}','sharer','status=0,toolbar=0,width=650,height=500');`"
            title="Поделиться Вконтакте"
          ></button>
          <button
            class="telegram"
            :onClick="`window.open('https://telegram.me/share/url?url=${qrURL}','sharer','status=0,toolbar=0,width=650,height=500')`"
            title="Поделиться в Телеграм"
          ></button>
          <button
            class="whatsapp"
            :onClick="`window.open('https://api.whatsapp.com/send?text=${qrURL}','sharer','status=0,toolbar=0,width=650,height=500')`"
            title="Поделиться в Whatsapp"
          ></button>
        </div>
      </div>
      <template #modal-footer>
        <b-button variant="primary" size="sm" class="float-right cls_btn" @click="show = false">
          {{ $t('Закрыть') }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions } from 'vuex';
import QrcodeVue from 'qrcode.vue';
import backAPI from '../assets/backApi';
import dateFormat from '../assets/localDateFunc';
// import RightsModalTakeVue from '../components/RightsModalTake.vue';

export default {
  name: 'RefURL',
  components: {
    QrcodeVue,
  },
  data() {
    return {
      show: false,
      qrURL: 'http://dev.artlife.ru/ref/?ref=nplHE4Q2',
      searchActive: false,
      selectedRefURL: null,
      selectedRef: null,
      access_type_enum: [
        {
          key: 1,
          name: 'Дистрибьютор',
        },
        {
          key: 0,
          name: 'Клиент',
        },
      ],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true,
        },
        {
          key: 'reflink_type_name',
          label: 'Тип',
          sortable: true,
        },
        {
          key: 'param',
          label: 'Параметр',
          sortable: true,
        },
        {
          key: 'access_level',
          label: 'Тип соглашения',
          sortable: true,
          formatter: (v) => this.access_type_enum.find((type) => type.key === v).name,
        },
        {
          key: 'cnt_links',
          label: 'Число переходов',
          thClass: 'ref_th_class',
          sortable: true,
        },
        {
          key: 'cnt_reg',
          label: 'Число регистраций',
          thClass: 'ref_th_class',
          sortable: true,
        },
        {
          key: 'count_of_purchases',
          label: 'Количество покупок',
          thClass: 'ref_th_class',
          sortable: true,
        },
        {
          key: 'purchase_amount',
          label: 'Сумма покупок',
          thClass: 'ref_th_class',
          sortable: true,
        },
        {
          key: 'created',
          label: 'Дата создания',
          sortable: true,
          formatter: (v) => dateFormat(v),
        },
        {
          key: 'last_link',
          label: 'Дата последнего перехода',
          sortable: true,
          formatter: (v) => dateFormat(v),
        },
        {
          key: 'preview_info',
          label: 'Комментарий',
          sortable: true,
        },
        {
          key: 'url',
          label: 'URL',
          thClass: 'ref_th_class_url',
          sortable: true,
        },
        {
          key: 'state',
          label: 'Статус URL',
          sortable: true,
          formatter: (v) => {
            if (v) return 'Активна';
            return 'Не активна';
          },
        },
      ],
      entries: [],
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Реферальные ссылки'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Реферальные ссылки')}`,
    };
  },
  async mounted() {
    try {
      const response = await backAPI.get('/agent/reflinks');
      this.entries = response.data.entries;
    } catch (error) {
      console.log('Произошла ошибка');
    }
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    onRowSelected(item) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedRef = item[0];
      if (item.length > 0) {
        this.selectedRefURL = item[0].id;
      } else {
        this.selectedRefURL = null;
      }
    },
    async changeRefState() {
      try {
        await backAPI.post(`/agent/reflinks/set_state/${this.selectedRef.id}/${this.selectedRef.state ? 0 : 1}`);
        const result = await backAPI.get('/agent/reflinks');
        // eslint-disable-next-line no-unused-vars
        const someData = this.selectedRef.id;
        this.entries = await result.data.entries;
        setTimeout(() => {
          const refLinkIndex = result.data.entries.indexOf(result.data.entries.find((reflink) => reflink.id === someData));
          this.$refs.selectableTable.selectRow(refLinkIndex);
        }, 0);
      } catch (error) {
        console.log(error);
      }
      // backAPI.post(`/agent/reflinks/set_state/${this.selectedRef.id}/${this.selectedRef.state ? 0 : 1}`)
      //   .then(() => {
      //     backAPI.get('/agent/reflinks').then((Response) => {
      //       this.entries = Response.data.entries;
      //       console.log(this.selectedRef);
      //       return (Response, this.selectedRef);
      //     }).then((Response, id) => {
      //       console.log(Response.data);
      //       console.log(id);
      //       const refLinkIndex = Response.data.entries.indexOf(Response.data.entries.find((reflink) => reflink.id === this.selectedRef.id));
      //       this.$refs.selectableTable.selectRow(refLinkIndex);
      //     });
      //   });
    },
    editReflink() {
      this.$router.push(`/ref-urls-update/${this.selectedRef.id}`);
    },
    copyLink(id) {
      const str = document.querySelector(`#ref-link-${id}`);
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      this.$refs[`popa-${id}`].classList.add('open');
      this.$bvToast.show('my-toast-good');
      document.body.removeChild(el);
      setTimeout(() => {
        this.$refs[`popa-${id}`].classList.remove('open');
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.share-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.share-buttons button {
    margin-bottom: 5px;
    width: 40px;
    height: 40px;
    border: 0;
}

.share-buttons a:not(:last-child) {
    margin-right: 5px;
}

.share-buttons .vkontakte {
    background: url("../assets/imgs/vk_logo.svg");
    background-size: contain;
}

.share-buttons .telegram {
    background: url("../assets/imgs/t_logo.svg") no-repeat;
    background-size: contain;
}
.share-buttons .whatsapp {
    background: url("../assets/imgs/whatsapp_logo.svg") no-repeat;
    background-size: contain;
}
.link {
  color: #32aaa7;
}
.link_wrapper {
  position: relative;
  & .popa {
    background: rgb(252, 250, 250);
    position: absolute;
    top: -35px;
    left: 20%;
    width: fit-content;
    padding: 5px;
    text-align: center;
    border-radius: 3px;
    color: black;
    display: none;
    border: 1px solid gray;
    &.open {
      display: block;
    }
    &::after {
      position: absolute;
      bottom: -5px;
      transform: rotate(45deg);
      left: 50%;
      content: '';
      width: 10px;
      height: 10px;
      background-color: rgb(252, 250, 250);
      border: 1px solid gray;
      z-index: -1;
    }
  }
}
.licevoischet__page {
  position: relative;
  &__summ {
    text-align: center;
    background-color: #dee2f3;
    font-size: 12px;
    padding: 10px 0px;
  }
  & .exp_print {
    span {
      color: #32aaa7;
      cursor: pointer;
    }
  }
  & .organization__modal {
    position: relative;
    margin: 20px 0px;
    width: 100%;
    bottom: 0;

    & .edit {
      margin-bottom: 0px;
      & > div {
        margin-bottom: 30px;
      }
      input {
        // margin-bottom: 20px;
      }
      button {
        // margin-top: 20px;
        width: 48%;
        border: 0;
        padding: 5px 30px;
        font-size: 16px;
        &:nth-of-type(1) {
          background-color: #32aaa7;
          color: white;
        }
        &:nth-of-type(2) {
          background-color: white;
          color: #32aaa7;
          border: 2px solid #32aaa7;
        }
      }
    }
  }
}
</style>
<style>
.modal-title{
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: semibold;
}
.ref_th_class{
  max-width: 100px;
}
.ref_th_class_url{
  min-width: 360px;
}
</style>
