<template>
  <div class="g_grouped_btns">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'GGroupedButton',
};
</script>

<style lang="scss" scoped>
.g_grouped_btns{
    display: flex;
    gap: 10px;
}
</style>
