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
            <Selection :id="'select-status-test'" name="staus-test" :list="data.statusTestList"/>
          </div>
          <div class="settings-user">
          </div>
        </div>
      </template>
    </Collapse>
  </div>
</div>
</template>

<style lang="scss">
.page-test-invite {
  .invite-container {
    .settings-view {

    }
  }
}
</style>