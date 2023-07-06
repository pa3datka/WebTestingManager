<script setup lang="ts">
import {useAlertStore} from "~/store/shared/Alert";
import {computed} from "@vue/reactivity";

const {clearInfo} = useAlertStore();
const data = reactive({
  show: true,
});

const info = computed(() => {
  return (useAlertStore().getMessage?.message ?? null);
});

const alertType = computed(() => {
  return (useAlertStore().getMessage?.type ?? '');
});

</script>

<template>
<div class="alert" :class="{'show-alert': info}, `alert-type-${alertType}`">
  <div class="icon">O</div>
  <div class="message">
    <ul>
      <li v-for="message in (info ?? [])" :key="message">{{message}}</li>
    </ul>
  </div>
  <div class="action hover" @click="clearInfo">X</div>
</div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
.alert {
  position: fixed;
  right: -301px;
  top: rem-calc(125);
  z-index: 30;
  padding: rem-calc((10, 20, 10, 20));
  border-bottom-left-radius: rem-calc(14);
  border-top-left-radius: rem-calc(14);
  min-width: rem-calc(300);
  max-height: rem-calc(301);
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: rem-calc(10);
  transition: right .2s ease-in-out;
  .message {
    width: 100%;
    text-align: left;
  }

  .action {
    padding: rem-calc(10);
  }
}

.alert-type-error {
  border-left: rem-calc(4) solid $color-red-2;
  background-color: rgba(222, 60, 75, .7);
  .message {
    color: $color-black-market;
  }
}

.alert-type-warning {
  border-left: rem-calc(4) solid $color-salmon;
  background-color: rgba(248, 137, 107, .7);
  .message {
    color: $color-black-market;
  }
}

.alert-type-info {
  border-left: rem-calc(4) solid $color-summer-sky;
  background-color: rgba(45, 162, 236, .7);
  .message {
    color: $color-white;
  }
}

.alert-type-success {
  border-left: rem-calc(4) solid $color-mantis;
  background-color: rgba(122, 199, 79, .7);
  .message {
    color: $color-white;
  }
}

.show-alert {
  right: 0;
  transition: right .2s ease-in-out;
}
</style>