<template>
  <div class="message_wrapper">
    <div class="message shadow-sm">
      <div class="message_header">
        <div class="message_header_date">
          {{ new Date().toLocaleDateString() }}
        </div>
        <div class="message_header_sender">Петя</div>
      </div>
      <hr />
      <div class="message_body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam incidunt veniam, corrupti
        consequatur mollitia qui iure molestias saepe nulla, vero sit sint dolorum magni natus
        voluptate id dolorem, magnam repellendus ad minima unde maiores vel. Labore eos cum unde
        amet ex, at ullam veritatis nostrum atque totam ad maiores odit magni omnis, facere nam
        distinctio illum saepe optio est officia?
      </div>
      <hr>
      <div class="message_nesting">
        Вложение
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogMessage',
};
</script>

<style lang="scss" scoped>
.message_wrapper {
  margin-top: 20px;
}
.message {
  margin-bottom: 20px;
  background: white;
  padding: 20px;
  &_header {
    &_date {
      display: inline-block;
      margin-right: 20px;
    }
    &_sender {
      display: inline-block;
    }
  }
}
</style>
