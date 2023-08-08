<template>
  <div class="container">
    <h1>Новости</h1>
    <div class="news_grid">
      <news-item v-for="news in newArray" :key="news.id" :news="news"/>
    </div>
  </div>
</template>

<script>
import GApi from '../assets/backApi';
import NewsItem from '../components/News/NewsItem.vue';

export default {
  components: { NewsItem },
  data() {
    return {
      newArray: [],
    };
  },
  async mounted() {
    await GApi.get('/api/News/get-list').then((Response) => {
      this.newArray = Response.data;
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
