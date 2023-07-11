<script setup lang="ts">
import {reactive} from "@vue/reactivity";

definePageMeta({
  name: "test-invite",
  layout: 'dashboard',
  middleware: ['is-auth']
});

import Collapse from "~/components/Shared/Collapse/Collapse.vue";
import Selection from "~/components/Shared/Input/Selection.vue";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";

const data = reactive({
  statusTestList: <ITestSetting[]> [
    {id: 1, name: 'Виден всем пользователям'},
    {id: 2, name: 'Виден только приглашенным'},
  ],
});

</script>

<template>
<div class="container">
  <div class="page-test-invite">
    <Collapse :label-svg="'label-setting'">
      <template v-slot:Title>
        Invite settings
      </template>

      <template v-slot:content>
        <div class="invite-container">

          <div class="settings-view pt-sm-30 pt-lg-40 pl-sm-20 pl-md-30 pr-sm-20 pr-lg-30 pb-sm-30 pb-lg-40">
            <div class="input-title">Кто может проходить тест</div>
            <Selection class="pt-lg-30 pt-md-20 pt-sm-14" :id="'select-status-test'" name="staus-test" :list="data.statusTestList"/>
          </div>
          <div class="settings-user pt-sm-30 pt-lg-40 pl-sm-20 pl-md-30 pr-sm-20 pr-lg-30 pb-sm-30 pb-lg-40">
            asd
          </div>
        </div>
      </template>
    </Collapse>
  </div>
</div>
</template>

<style lang="scss">
@import "assets/css/variables.scss";
.page-test-invite {
  .invite-container {
    display: grid;
    grid-template-areas: 'users' 'views';
    .settings-view {
      grid-area: views;

      .input-title {
        color: $color-black-market;
        font-size: $font15;
        font-weight: $font-weight5;
      }
    }

    .settings-user {
      grid-area: users;
      background-color: $color-white-solid;
      border-bottom-right-radius: rem-calc(18);
      margin-top: rem-calc(5);
    }
  }
}

@media (min-width: rem-calc(768)) {
  .page-test-invite {
    .invite-container {
      grid-template-areas: 'views users';
      grid-template-columns: 50% 50%;
      .settings-view {
        .input-title {
          font-size: $font17;
        }
      }

      .settings-user {
        margin-top: rem-calc(5);
      }
    }
  }
}

@media (min-width: rem-calc(992)) {
  .page-test-invite {
    .invite-container {
      grid-template-columns: 60% 40%;
      .settings-view {

      }

      .settings-user {
        margin-top: rem-calc(14);
      }
    }
  }
}
</style>