<template>
  <div>
    <!-- ТАБЛИЦА ПОКАЗАТЕЛЕЙ -->
    <b-table
      bordered
      responsive
      head-variant="light"
      class="mt-3"
      :fields="topTableFields"
    ></b-table>
    <!-- РЕЗЕРВИРОВАНИЕ ЛО -->
    <h4 class="mt-3">Резервирование ЛО</h4>
    <g-caption :title="'Состояние баллового счёта'" :text="'ЛО:45 Резерв: 15'"/>
    <div class="row mt-3">
      <div class="col-6">
        <g-input :id="'reservlo'" :placeholder="'Введите значение ЛО'" :type="'text'" v-model="reserve_lo"/>
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
            clearable
            style="width: 100%"
            placeholder="Выберите ранг"
          >
            <el-option
              v-for="rank in rankList"
              :key="rank.id"
              :label="rank.name"
              :value="rank.value"
            ></el-option>
          </el-select>
          <span>
          </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <b-table :items="demoDataConidtionForRank" :fields="rankConditionFields" bordered responsive head-variant="light">
            <template v-slot:cell(condition_check)="scope">
              <span v-if="scope.item.current_value >= scope.item.required_value">
                <img src="../assets/imgs/check_icon.svg" alt="">
              </span>
              <span >
                {{scope.item.current_value >= scope.item.required_value ? 'Условие выполнено' : 'Условие не выполнено'}}
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
          <g-caption :title="'Партнёров в сети'" :text="'235456'"/>
        </div>
        <div class="col-2">
          <g-caption :title="'Активных партнёров в сети'" :text="'254'"/>
        </div>
        <div class="col-2">
          <g-caption :title="'Прирост партнёров'" :text="'41'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      selectedRankForInfo: null,
      reserve_lo: null,
      isRankInfoShow: false,
      isStuctureInfoShow: false,
      rankList: [
        {
          id: 1,
          name: 'Привилегированный клиент',
          value: 1,
        },
        {
          id: 2,
          name: 'Консультант',
          value: 2,
        },
        {
          id: 3,
          name: 'Мастер',
          value: 3,
        },
        {
          id: 4,
          name: 'Управляющий',
          value: 4,
        },
        {
          id: 5,
          name: 'Директор',
          value: 5,
        },
        {
          id: 6,
          name: 'Серебряный Директор',
          value: 6,
        },
        {
          id: 7,
          name: 'Золотой Директор',
          value: 7,
        },
        {
          id: 8,
          name: 'Рубиновый Директор',
          value: 8,
        },
        {
          id: 9,
          name: 'Бриллиантовый Директор',
          value: 9,
        },
        {
          id: 10,
          name: 'Президент',
          value: 10,
        },
      ],
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
          key: 'activity',
          label: 'Активность',
        },
        {
          key: 'rank_beg',
          label: 'Ранг на начало',
        },
        {
          key: 'rank_end',
          label: 'Ранг на конец',
        },
      ],
      rankConditionFields: [
        {
          key: 'parametr',
          label: 'Пареметр',
        },
        {
          key: 'current_value',
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
          key: 'required_value',
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
          key: 'condition_check',
          label: 'Выполнение условия',
        },
      ],
      demoDataConidtionForRank: [
        {
          parametr: 'ЛО',
          current_value: 35,
          required_value: 45,
        },
        {
          parametr: 'ГО',
          current_value: 35,
          required_value: 1000,
        },
        {
          parametr: 'НСО',
          current_value: 3000,
          required_value: 2000,
        },
        {
          parametr: 'Активность',
          current_value: 1,
          required_value: 1,
        },
      ],
    };
  },
  computed: {
  },
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
