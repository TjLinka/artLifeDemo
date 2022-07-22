<template>
  <div class="container">
    <h1>Новости</h1>
    <div class="news_grid">
      <news-item />
      <news-item />
      <news-item />
    </div>
  </div>
</template>

<script>
import NewsItem from '../components/News/NewsItem.vue';

export default {
  components: { NewsItem },
};
</script>

<style lang="scss" scoped>

</style>
