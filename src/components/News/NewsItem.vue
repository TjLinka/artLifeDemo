<template>
  <div class="news_item">
    <p class="date">10.10.2001</p>
    <h4 class="news_title">Lorem, ipsum.</h4>
    <p class="news_text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis minus et voluptas
      consequuntur iusto, quidem sint odit, quos expedita in officia asperiores facere? Praesentium
      dolore eligendi accusantium ipsam quaerat, dolorum sequi nemo aliquam. Minus itaque cupiditate
      a consequatur unde maxime, sit nihil, iste quidem deleniti ratione reprehenderit molestiae
      officiis. Reprehenderit minus itaque corporis ipsum suscipit, repellendus dignissimos
      doloremque tempora nemo eveniet debitis perspiciatis doloribus ipsam minima, ex quibusdam
      velit dolorem culpa sint rerum officia optio quia totam fuga. Vitae, distinctio, laborum
      molestias iure laudantium aliquid minima assumenda cumque odit quidem explicabo repellat
      nesciunt perferendis, aliquam qui soluta dicta illum in!
    </p>
    <p class="news_show_more">Развернуть</p>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
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
}
.news_text {
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
}
</style>
