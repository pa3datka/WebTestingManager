<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
});
</script>

<template>
<button class="button-min">{{ props.text }}</button>
</template>

<style lang="scss">
.button-min {
  height: 28px;
  width: 28px;
  background-color: #FFFFFF;
  border: 1px solid #E4E5F1;
  border-radius: 4px;
  color: #8F8E9C;
  font-size: 15px;
  font-weight: 500;
}

@media (min-width: 768px) {
  .button-min {
    height: 40px;
    width: 40px;
    font-size: 17px;
  }
}

@media (min-width: 992px) {
  .button-min {
    height: 48px;
    width: 48px;
    font-size: 19px;
  }
}
</style>