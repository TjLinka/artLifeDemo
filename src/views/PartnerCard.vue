<template>
  <div class="container">
    <h1>Карточка партнёра</h1>
    <div class="row">
      <div class="col">
        <g-tabs>
          <router-link class="tab" to="/partner-card/personal-data"><span>Персональные данные</span></router-link>
          <router-link class="tab" to="/partner-card/marketins-stats"><span>Показатели по маркетингу</span></router-link>
          <router-link class="tab" to="/partner-card/marketins-stats"><span>Структура</span></router-link>
        </g-tabs>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'PartnerCard',
};
</script>

<style></style>
