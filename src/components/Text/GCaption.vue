<template>
  <div class="g_caption">
    <p class="g_caption_title">
      {{ title }}:
    </p>
    <br>
    <span class="g_caption_text">
      {{ textT }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GCaption',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    text: {
      type: [String, Number, Date],
    },
  },
  computed: {
    textT() {
      return this.text ? this.text : '-';
    },
  },
};
</script>

<style lang="scss" scoped>
.g_caption{
    &_title{
        display: inline-block;
        padding: 0;
        margin: 0;
        color: var(--text-gray);
        font-size: 16px;
    }
    &_text{
      font-size: 16px;
      font-weight: bold;
      letter-spacing: .5px;
    }
}
</style>
