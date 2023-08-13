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
import InputText from "~/components/Shared/Input/AuthInput.vue";
import ButtonMin from "~/components/Shared/Button/ButtonMin.vue";
import InviteItem from "~/components/Shared/Label/InviteItem.vue";

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

            <div class="add-invites d-flex justify-space-between pt-sm-30 pt-lg-40">
              <div class="input-title">Мои приглашения</div>
              <div class="add-group hover t-blue d-flex align-items-center" >
                <svg-template class="primary-stroke" name="add-test"/>
                Добавить группу
              </div>
            </div>

            <div class="my-invites ">
              <div class="invite-group mt-sm-32">
                <div class="invite-group__header d-flex align-items-center pl-sm-20">
                  <svg-template class="primary-stroke" name="edit-no-border"/>
                  <div class="group-name t-blue">Группа 1</div>
                </div>
                <div class="invite-group__items W-100">
                  <InviteItem />
                  <InviteItem />
                  <InviteItem />
                  <InviteItem />
                  <InviteItem />
                  <InviteItem />
                  <InviteItem />
                  <InviteItem />
                </div>
              </div>
            </div>
          </div>
          <div class="settings-user pt-sm-25 pt-lg-25 pl-sm-20 pl-md-30 pr-sm-20 pr-lg-30 pb-sm-30 pb-lg-40">
            <div class="invite-email">
              <div class="input-title">Пригласить по почте</div>
              <InputText class="pt-lg-30" placeholder="Email"/>
              <div class="pt-lg-15 d-flex column-gam-1 align-items-center">
                <InputText class=" W-100" placeholder="Name"/>
                <ButtonMin class="mantis-bg hover t-white" text="+"></ButtonMin>
              </div>
            </div>
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
    .input-title {
      color: $color-black-market;
      font-size: $font15;
      font-weight: $font-weight5;
    }

    display: grid;
    grid-template-areas: 'users' 'views';
    .settings-view {
      grid-area: views;

      .add-invites {
        .add-group {
          column-gap: rem-calc(8);
        }
      }

      .my-invites {
        .invite-group {
          border-radius: rem-calc(4);
          border: rem-calc(1) solid $color-iris-ice;

          .invite-group__header {
            height: rem-calc(52);
            background-color: $color-white-solid;
            border-bottom: rem-calc(1) solid $color-iris-ice;
            column-gap: rem-calc(8);
            svg {
              height: rem-calc(24);
              width: rem-calc(24);
            }

            .group-name {
              font-size: $font17;
              font-weight: $font-weight5;
            }
          }

          .invite-group__items {
            padding: rem-calc((20, 18, 32));
            display: flex;
            flex-wrap: wrap;
            column-gap: rem-calc(10);
            row-gap: rem-calc(10);

            .invite-item {
              height: rem-calc(32);
              width: 100px;
              background-color: #2C64DC;
              border-radius: rem-calc(3);
            }
          }
        }
      }
    }

    .settings-user {
      grid-area: users;
      background-color: $color-white-solid;
      border-bottom-right-radius: rem-calc(18);
      margin-top: rem-calc(5);

      input {
        color: $color-black-market;
      }
    }
  }
}

@media (min-width: rem-calc(768)) {
  .page-test-invite {
    .invite-container {
      grid-template-areas: 'views users';
      grid-template-columns: 50% 50%;

      .input-title {
        font-size: $font17;
      }

      .settings-view {

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