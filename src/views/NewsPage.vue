<template>
  <div class="container">
    <div class="news_title">
      <h2>{{ newsInfo.title }}</h2>
    </div>
    <div class="news_text" v-html="newsInfo.text"></div>
    <div class="go_back" @click="$router.go(-1)">
      Вернуться
    </div>
  </div>
</template>

<script>
import GApi from '../assets/backApi';

export default {
  name: 'NewsPage',
  data() {
    return {
      newsInfo: {},
    };
  },
  async mounted() {
    GApi.get(`/api/News/get/${this.$route.params.id}`).then((Response) => {
      this.newsInfo = Response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.go_back {
  color: #32aaa7;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 20px;
}
</style>
