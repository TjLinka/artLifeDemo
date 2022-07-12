<template>
  <div>
    <div>
      <div @click="$emit('prev')">-</div>
      <div>
        {{ currentPeriod }}
      </div>
      <div @click="$emit('next')">+</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GPeriod',
  props: {
    currentPeriod: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
