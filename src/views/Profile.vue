<template>
  <div class="container">
    <!-- <h1>Профиль</h1> -->
    <div class="row">
      <div class="col">
          <router-link class="tab" to="/profile/personal-data" active-class="active-link"><span>Персональные данные</span></router-link>
          <router-link class="tab ml-5" active-class="active-link" to="/profile/marketins-stats"><span>Показатели по маркетингу</span></router-link>
      </div>
    </div>
    <KeepAlive>
      <router-view />
    </KeepAlive>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style lang="scss" scoped>
.tab{
  color: black;
  font-size: 20px;
  text-decoration: none;
}
.active-link{
  color: #32aaa7;
  text-decoration: underline;
}
</style>
