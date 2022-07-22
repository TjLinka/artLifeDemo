<template>
  <div class="container">
    <!-- <h1>Реферальные ссылки</h1> -->
    <div class="row col-6">
      <g-button :primary="true" :width="'50%'">
        Создать реферальную ссылку
      </g-button>
    </div>
    <b-row align-v="center" class="row mt-3">
      <div class="col">
        <g-radio
          :label="'Статус ссылки'"
          :radios="referalLinkStatusList"
          v-model="referalLinkStatus"
        />
      </div>
      <div class="col" v-show="selectedRow">
        <g-grouped-button>
          <g-button :primary="true">Активировать</g-button>
          <g-button :primary="true">В архив</g-button>
        </g-grouped-button>
      </div>
    </b-row>
    <b-table
      select-mode="single"
      selectable
      @row-selected="onRowSelected"
      :fields="fields"
      :items="filteredTableData"
      bordered
      responsive
      head-variant="light"
    >
      <template v-slot:cell(url)="scope">
        <div class="referal_url_block">
          <a
            :id="`ref-link-${scope.item.id}`"
            class="referal_url_block_link"
            :href="scope.item.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ scope.item.url }}
          </a>
          <div class="referal_url_block_icons">
            <copy-icon @click="copyLink(scope.item.id)" :height="'100%'" width="20px" />
            <share-icon @click="showRefLinkModal(scope.item.url)" :height="'100%'" width="20px" />
          </div>
        </div>
      </template>
    </b-table>
    <g-modal-ref-link
      v-if="refLinkModalShow"
      :qrURL="urlForModal"
      :size="'sm'"
      :noCloseByClick="true"
      @close="refLinkModalShow = false"
    />
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import GApi from '../assets/backApi';
import dateFormat from '../assets/localDateFunc';
import removeNull from '../assets/removeNull';
import GRadio from '../components/Forms/GRadio.vue';
import ShareIcon from '../components/Icons/ShareIcon.vue';
import CopyIcon from '../components/Icons/CopyIcon.vue';
import GModalRefLink from '../components/Modals/GModalRefLink.vue';
import GGroupedButton from '../components/Forms/GGroupedButton.vue';
import GButton from '../components/Forms/GButton.vue';

export default {
  components: {
    GRadio,
    ShareIcon,
    CopyIcon,
    GModalRefLink,
    GGroupedButton,
    GButton,
  },
  name: 'ReferalLinks',
  data() {
    return {
      refLinkModalShow: false,
      selectedRow: null,
      urlForModal: '',
      referalLinkStatus: 1,
      referalLinkStatusList: [
        {
          key: 1,
          label: 'Все',
          value: 0,
        },
        {
          key: 2,
          label: 'Только активные',
          value: 1,
        },
        {
          key: 3,
          label: 'Телько архивные',
          value: 2,
        },
      ],
      fields: [
        {
          key: 'id',
          label: 'ID',
        },
        {
          key: 'cnt_links',
          label: 'Число переходов',
        },
        {
          key: 'cnt_reg',
          label: 'Число регистраций',
        },
        {
          key: 'created',
          label: 'Дата создания',
          formatter: val => dateFormat(val),
        },
        {
          key: 'last_link',
          label: 'Дата последнего перехода',
          formatter: val => dateFormat(val),
        },
        {
          key: 'last_reg_dte',
          label: 'Дата последней регистрации',
          formatter: val => dateFormat(val),
        },
        {
          key: 'state_name',
          label: 'Статус URL',
        },
        {
          key: 'url',
          label: 'Ссылка ',
        },
      ],
      tableData: [],
    };
  },
  mounted() {
    GApi.getReferalLinks().then(Response => {
      Response.data.entries.forEach(data => {
        Object.keys(data).forEach(key => {
          data[key] = removeNull(data[key]);
        });
      });
      this.tableData = Response.data.entries;
    });
  },
  methods: {
    copyLink(id) {
      console.log(id);
      const str = document.querySelector(`#ref-link-${id}`);
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      str.classList.add('coped');
      document.body.removeChild(el);
      setTimeout(() => {
        str.classList.remove('coped');
      }, 1500);
    },
    showRefLinkModal(url) {
      this.refLinkModalShow = true;
      this.urlForModal = url;
    },
    onRowSelected(rows) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedRow = rows[0];
    },
  },
  computed: {
    filteredTableData() {
      if (this.referalLinkStatus === 0) {
        return this.tableData;
      }
      return this.tableData.filter(link => link.state === this.referalLinkStatus);
    },
  },
};
</script>

<style lang="scss" scoped>
.referal_url_block {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  &_link {
    position: relative;
    &.coped::before {
      display: block;
    }
  }
  &_link::before {
    display: none;
    top: -30px;
    left: 0%;
    content: 'Ссылка скопирована';
    position: absolute;
    white-space: nowrap;
    border: 1px solid lightgray;
    padding: 2px 5px;
    color: black;
    pointer-events: none;
    background: white;
    box-shadow: 2px 0px 10px -5px black;
  }
  &_icons {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
</style>
