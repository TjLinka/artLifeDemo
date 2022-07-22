<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col"><h4>Маркетинг план: Линейка</h4></div>
      <div class="col">
        <h4><strong>Дата публикации</strong>: {{ new Date().toLocaleDateString() }}</h4>
      </div>
      <div class="col">
        <h4><strong>Дата редактирования</strong>: {{ new Date().toLocaleDateString() }}</h4>
      </div>
    </div>
    <!-- РАНГИ -->
    <h4>Ранги</h4>
    <ul class="rank_list">
      <li>
        Достижение ранга происходит по факту накопления необходимого НСО на конец расчётного
        периода.
      </li>
      <li>
        Подтверждение ранга происходит в конце расчётного периода по факту накопления необходимого
        ГО при условии активности.
      </li>
    </ul>
    <b-table
      bordered
      responsive
      head-variant="light"
      :fields="rankTableFields"
      :items="demoRankTableData"
    ></b-table>
    <!-- БОНУСЫ -->
    <h4 class="mt-3">Бонусы</h4>
    <p>
      Бонусы выдаются активным агентам. Агент активен, если выполнено условие активности ЛО не менее
      50 баллов.
    </p>
    <!-- ЛИЧНЫЙ БОНУС -->
    <h4 class="mt-3">
      Личный бонус
    </h4>
    <p>Составляет 5% от собственного ЛО.</p>
    <!-- ГРУППОВОЙ БОНУС -->
    <h4 class="mt-3">Групповой бонус</h4>
    <p>
      Составляет определённый процент от ЛО нижестоящих агентов в группе. Процент зависит от уровня.
      Глубина выборки зависит от подтвержденного ранга. При расчёте комиссии действует компрессия по
      неактивным и уволенным агентам.
    </p>
    <b-table
      bordered
      responsive
      head-variant="light"
      :fields="goTableFields"
      :items="demoGoTableFields"
    ></b-table>
  </div>
</template>

<script>
export default {
  name: 'MarketingPlan',
  data() {
    return {
      rankTableFields: [
        {
          key: 'rank',
          label: 'Ранг',
        },
        {
          key: 'consultant',
          label: 'Консультант',
        },
        {
          key: 'top_consultant',
          label: 'Ведущий консультант',
        },
        {
          key: 'manager',
          label: 'Менеджер',
        },
        {
          key: 'supervisor',
          label: 'Супервайзер',
        },
        {
          key: 'director',
          label: 'Директор',
        },
        {
          key: 'leader_director',
          label: 'Лидер-директор',
        },
        {
          key: 'prime_director',
          label: 'Премьер-директор',
        },
        {
          key: 'marketing_director',
          label: 'Маркетинг-директор',
        },
        {
          key: 'national_director',
          label: 'Национальный директор',
        },
      ],
      demoRankTableData: [
        {
          rank: 'НСО',
          consultant: '100',
          top_consultant: '2000',
          manager: '3000',
          supervisor: '4000',
          director: '5000',
          leader_director: '6000',
          prime_director: '7000',
          marketing_director: '8000',
          national_director: '9000',
        },
        {
          rank: 'ГО',
          consultant: '100',
          top_consultant: '1000',
          manager: '1500',
          supervisor: '2000',
          director: '2000',
          leader_director: '2000',
          prime_director: '3000',
          marketing_director: '3000',
          national_director: '3000',
        },
        {
          rank: 'Глубина группового бонуса',
          consultant: '1',
          top_consultant: '2',
          manager: '3',
          supervisor: '4',
          director: '5',
          leader_director: '6',
          prime_director: '7',
          marketing_director: '8',
          national_director: '9',
        },
      ],
      goTableFields: [
        {
          key: 'lvl',
          label: 'Уровень',
        },
        {
          key: 'lvl1',
          label: '1',
        },
        {
          key: 'lvl2',
          label: '2',
        },
        {
          key: 'lvl3',
          label: '3',
        },
        {
          key: 'lvl4',
          label: '4',
        },
        {
          key: 'lvl5',
          label: '5',
        },
        {
          key: 'lvl6',
          label: '6',
        },
        {
          key: 'lvl7',
          label: '7',
        },
        {
          key: 'lvl8',
          label: '8',
        },
        {
          key: 'lvl9',
          label: '9',
        },
      ],
      demoGoTableFields: [
        {
          lvl: 'Процент',
          lvl1: '10%',
          lvl2: '7%',
          lvl3: '5%',
          lvl4: '4%',
          lvl5: '3%',
          lvl6: '2%',
          lvl7: '2%',
          lvl8: '1%',
          lvl9: '1%',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.rank_list {
  list-style: square;
  margin-left: 10px;
  padding-left: 10px;
  & li {
  }
}
</style>
