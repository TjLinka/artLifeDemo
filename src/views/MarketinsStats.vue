<template>
  <div>
    <!-- ТАБЛИЦА ПОКАЗАТЕЛЕЙ -->
    <b-table
      bordered
      responsive
      head-variant="light"
      class="mt-3"
      :items="marketingStats"
      :fields="topTableFields"
    ></b-table>
    <!-- РЕЗЕРВИРОВАНИЕ ЛО -->
    <h4 class="mt-3">Резервирование ЛО</h4>
    <g-caption :title="'Состояние баллового счёта'" :text="'ЛО:45 Резерв: 15'" />
    <div class="row mt-3">
      <div class="col-6">
        <g-input
          :id="'reservlo'"
          :placeholder="'Введите значение ЛО'"
          :type="'text'"
          v-model="reserve_lo"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <g-grouped-button>
          <g-button :disabled="!reserve_lo" :primary="true">Перевести в резерв</g-button>
          <g-button :disabled="!reserve_lo">Вернуть из резерва</g-button>
        </g-grouped-button>
      </div>
    </div>
    <!-- ПРОВЕРКА УСЛОВИЙ НА РАНГ -->
    <h4 class="mt-3 mb-3">
      Проверка условий на ранг
      <span class="colapse_btn" @click="isRankInfoShow = !isRankInfoShow">
        {{ isRankInfoShow ? 'Скрыть' : 'Развернуть' }}</span
      >
    </h4>
    <div v-if="isRankInfoShow">
      <div class="row">
        <div class="col-2">
          <el-select
            v-model="selectedRankForInfo"
            @change="selecteRank"
            clearable
            style="width: 100%"
            placeholder="Выберите ранг"
          >
            <el-option
              v-for="rank in rankList"
              :key="rank.id"
              :label="rank.title"
              :value="rank.id"
            ></el-option>
          </el-select>
          <span> </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <b-table
            :items="demoDataConidtionForRank"
            :fields="rankConditionFields"
            bordered
            responsive
            head-variant="light"
          >
            <template v-slot:cell(cond_met)="scope">
              <span v-if="scope.item.cond_met">
                <img src="../assets/imgs/check_icon.svg" alt="" />
              </span>
              <span>
                {{
                  scope.item.cond_met
                    ? 'Условие выполнено'
                    : 'Условие не выполнено'
                }}
              </span>
            </template>
          </b-table>
        </div>
      </div>
    </div>
    <!-- ПОКАЗАТЕЛИ РАЗВИТИЯ СТРУКТУРЫ -->
    <h4 class="mb-3 mt-3">
      Показатели развития структуры
      <span class="colapse_btn" @click="isStuctureInfoShow = !isStuctureInfoShow">
        {{ isStuctureInfoShow ? 'Скрыть' : 'Развернуть' }}</span
      >
    </h4>
    <div v-if="isStuctureInfoShow">
      <div class="row">
        <div class="col-2">
          <g-caption :title="'Партнёров в сети'" :text="netGrowth.partners_cnt_curr" />
        </div>
        <div class="col-2">
          <g-caption :title="'Активных партнёров в сети'" :text="netGrowth.partners_cnt_history" />
        </div>
        <div class="col-2">
          <g-caption :title="'Прирост партнёров'" :text="netGrowth.delta" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GApi from '../assets/backApi';
import GButton from '../components/Forms/GButton.vue';
import GGroupedButton from '../components/Forms/GGroupedButton.vue';
import GInput from '../components/Forms/GInput.vue';
import GCaption from '../components/Text/GCaption.vue';

export default {
  name: 'MarketinsStats',
  components: {
    GCaption,
    GInput,
    GGroupedButton,
    GButton,
  },
  data() {
    return {
      netGrowth: {
        delta: '',
        partners_cnt_curr: '',
        partners_cnt_history: '',
      },
      selectedRankForInfo: null,
      reserve_lo: null,
      isRankInfoShow: false,
      isStuctureInfoShow: false,
      rankList: [],
      topTableFields: [
        {
          key: 'lo',
          label: 'ЛО',
        },
        {
          key: 'go',
          label: 'ГО',
        },
        {
          key: 'so',
          label: 'СО',
        },
        {
          key: 'nso',
          label: 'НСО',
        },
        {
          key: 'activ',
          label: 'Активность',
        },
        {
          key: 'rank_beg_title',
          label: 'Ранг на начало',
        },
        {
          key: 'rank_end_title',
          label: 'Ранг на конец',
        },
      ],
      rankConditionFields: [
        {
          key: 'param_name',
          label: 'Пареметр',
        },
        {
          key: 'curr_value',
          label: 'Текущеее значение',
          // eslint-disable-next-line consistent-return
          formatter: (val, key, item) => {
            if (item.parametr === 'Активность') {
              return item.current_value ? 'Да' : 'Нет';
            }
            return val;
          },
        },
        {
          key: 'need_value',
          label: 'Необходимое значение',
          // eslint-disable-next-line consistent-return
          formatter: (val, key, item) => {
            if (item.parametr === 'Активность') {
              return item.current_value ? 'Да' : 'Нет';
            }
            return val;
          },
        },
        {
          key: 'cond_met',
          label: 'Выполнение условия',
        },
      ],
      marketingStats: [],
      demoDataConidtionForRank: [],
    };
  },
  async mounted() {
    await GApi.get('/api/Agent/get-next-ranks').then((Response) => {
      this.rankList = Response.data;
    });
    GApi.post('/api/Misc/get-comdte-list').then(async (Response) => {
      GApi.get('/api/Agent/get-net-growth', { comdte: Response.data[0].comdte }).then((Response2) => {
        this.netGrowth = Response2.data;
      });
      GApi.post('/api/Agent/get-indicators', { comdte: Response.data[0].comdte }).then((Response3) => {
        this.marketingStats = [Response3.data];
      });
    });
  },
  methods: {
    async selecteRank(val) {
      if (!val) {
        this.demoDataConidtionForRank = [];
        return;
      }
      await GApi.get(`/api/Agent/get-rank-achiev-info/${val}`).then((Response) => {
        this.demoDataConidtionForRank = Response.data;
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.colapse_btn {
  color: var(--main-green);
  font-size: 18px;
  cursor: pointer;
  margin-left: 20px;
}
</style>
