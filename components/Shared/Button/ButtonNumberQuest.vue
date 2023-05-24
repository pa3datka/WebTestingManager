<script setup lang="ts">
import {reactive} from "@vue/reactivity";

const emit = defineEmits(['active']);
const props = defineProps({
  activeValue: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: null
  }
});
const data = reactive({
  active: <boolean> false
});

const active = (): void => {
  emit('active', {active: true, id: props.id});
};
</script>

<template>
<div class="button-square" :class="{'button-square-active': props.isActive}" @click="active">
  <div class="button-square__value">
    <div class="button-square__value-inactive">{{ props.value }}</div>
    <div class="button-square__value-active d-none">{{ props.value + ' ' + props.activeValue }}</div>
  </div>
</div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";

.button-square {
  height: rem-calc(32);
  width: rem-calc(32);
  min-width: rem-calc(32);
  font-size: $font11;
  color: #262342;
  border: rem-calc(1) solid $color-grey-7;
  border-radius: rem-calc(4);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;


  &:hover {
    cursor: pointer;
    background-color: #2C64DC;
    color: #FFFFFF;
    font-weight: $font-weight5;
  }

  .button-square__value-active {
    display: none;
  }
}

.button-square-active {
  width: max-content;
  background-color: #2C64DC;
  color: #FFFFFF;
  font-weight: $font-weight5;

  &:after {
    content: '';
    width: rem-calc(32);
    height: 100%;
    background-image: url("/assets/img/svg/clear2.svg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: rem-calc((16, 16));
    border-left: rem-calc(1) solid rgba(45,162,236, 0.3);
  }

  .button-square__value-inactive {
    display: none;
  }
  .button-square__value-active {
    display: block;
    padding-left: rem-calc(14);
    padding-right: rem-calc(14);
  }
}


@media (min-width: rem-calc(768)) {
  
}

@media (min-width: rem-calc(992)) {
  .button-square {
    height: rem-calc(48);
    width: rem-calc(48);
    min-width: rem-calc(48);
    font-size: $font15;

    .button-square__value-active {
      display: none;
    }
  }

  .button-square-active {
    width: max-content;
    background-color: #2C64DC;
    color: #FFFFFF;
    font-weight: $font-weight5;

    &:after {
      width: rem-calc(48);
      background-size: rem-calc((24, 24));
    }

    .button-square__value-inactive {
      display: none;
    }
    .button-square__value-active {
      display: block;
      padding-left: rem-calc(14);
      padding-right: rem-calc(14);
    }
  }
}

</style>