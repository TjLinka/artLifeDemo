<template>
  <div class="container">
    <h1>Профиль</h1>
    <div class="row">
      <div class="col">
        <g-tabs>
          <router-link class="tab" to="/profile/personal-data"><span>Персональные данные</span></router-link>
          <router-link class="tab" to="/profile/marketins-stats"><span>Показатели по маркетингу</span></router-link>
        </g-tabs>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import GTabs from '../components/GTabs.vue';

export default {
  components: { GTabs },
  name: 'Profile',
};
</script>

<style lang="scss" scoped>
.qq{
  color: red;
}
</style>
