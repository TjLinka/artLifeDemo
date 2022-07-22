<template>
  <img
    @click="$emit('click')"
    class="share_icon"
    :width="width"
    :height="height"
    src="../../assets/imgs/copy_icon.svg"
    alt="Share Icon"
  />
</template>

<script>
export default {
  name: 'CopyIcon',
  props: {
    width: {
      type: String,
      default: '20px;',
    },
    height: {
      type: String,
      default: '20px;',
    },
  },
};
</script>

<style lang="scss" scoped>
.share_icon {
  cursor: pointer;
}
</style>
