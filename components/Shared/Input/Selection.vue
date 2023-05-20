<script setup lang="ts">
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  },
  name: {
    type: String,
    default: 'default'
  },
  placeholder: {
    type: String,
    default: ''
  },
  isLabel: {
    type: Boolean,
    default: false
  },
  list: {
    type: Object,
    default: null
  }
});

const data = reactive({
  isLabel: true
});
</script>

<template>
  <div class="custom-select hover">
    <div class="select">
      <div class="input-wrapper">
        <SvgTemplate :name="'select_list'" v-if="data.isLabel"/>
        <input type="text" placeholder="Выберите картинку">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";

.custom-select {
  position: relative;

  .select {
    height: rem-calc(48);
    width: 100%;
    border: 1px solid #E4E5F1;
    border-radius: 4px;
    background-color: $color-white;

    .input-wrapper {
      height: 100%;
      display: flex;
      column-gap: rem-calc(10);
      align-items: center;
      padding-left: rem-calc(22);
      padding-right: rem-calc(22);

      &:after {
        content: '';
        height: 100%;
        width: 10px;
        background-image: url("@/assets/img/svg/polygon-up.svg");
        background-repeat: no-repeat;
        background-position: center center;
        transform: rotate(180deg);
        opacity: .7;
      }

      svg {
        stroke: $color-grey;
      }

      input {
        border: none;
        height: 100% !important;
        width: 100%;
        font-size: $font15;

        &:focus,
        &:focus-visible {
          border: none;
          outline: none;
        }
      }
    }
  }

}
</style>