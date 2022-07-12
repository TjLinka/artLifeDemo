<template>
  <div class="g_tabs mt-4">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GTabs',
};
</script>

<style lang="scss" scoped>
.g_tabs{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid lightgray;
    & .tab{
        position: relative;
        display: inline-block;
        padding: 10px 5px;
        height: 100%;
        cursor: pointer;
        margin-right: 20px;
        &::after{
            position: absolute;
            content: '';
            width: 100%;
            height: 2px;
            left: 0;
            bottom: -1px;
        }
        &.active::after{
            background-color: var(--main-green);
        }
    }
}
</style>
