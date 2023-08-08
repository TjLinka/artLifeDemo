<template>
  <div class="news_item">
    <p class="date">
      <span>{{ new Date(news.dte).toLocaleDateString() }}</span>
      <span class="news_show_more" @click="$router.push(`/news/${news.id}`)">Просмотреть</span>
    </p>
    <h4 class="news_title">{{ news.title }}</h4>
    <p class="news_text" v-html="news.text"></p>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
  props: ['news'],
};
</script>

<style lang="scss" scoped>
.news_item {
  box-shadow: 0 0.125rem 0.25rem rgba(black, 0.2);
  padding: 10px;
  margin-bottom: 20px;
}
.news_show_more {
  cursor: pointer;
  margin-left: 15px;
  color: #32aaa7;
  text-decoration: underline;
}
.news_text {
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
}
</style>
