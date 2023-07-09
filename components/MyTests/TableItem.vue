<script setup lang="ts">

import BorderRate from "~/components/Shared/Indicator/BorderRate.vue";
import LevelRate from "~/components/Shared/Indicator/LevelRate.vue";
import ButtonSvg from "~/components/Shared/Button/ButtonSvg.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";
import {PropType} from "@vue/runtime-core";
import {hideOnClickMenu} from "~/composables/shared/HideOnClickMenu";
import {useRouter} from "nuxt/app";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import {useTest} from "~/composables/test/useTest";
import {useAlertStore} from "~/store/shared/Alert";
import {ALERT_SUCCESS} from "~/store/constants/alertConst";
import {IStatusServerResponse} from "~/composables/Interfaces/IStatusServerResponse";

const {setInfo} = useAlertStore();
const {deleteTest} = useTest();
const router = useRouter();
const {hideMenu} = hideOnClickMenu();
const props = defineProps({
  testItem: {
    type: Object as PropType<ITest>,
  }
});
const data = reactive({
  show: false,
  imageBaseUrl: useRuntimeConfig().public.imageApiUrl,
  itemMenu: false,
});

onMounted(() => {
  if (props.testItem?.id) {
    hideMenu(`item-settings-${props.testItem.id}`, `item-menu-${props.testItem.id}`, 'show-item-menu', showMenu);
  }
});

const dotsString = (length: number, text: string): string => {
  return text.length > length ? text.slice(0, (length - 3)) + '...' : text;
}
const showItem = () => {
  data.show = !data.show;
};

const showMenu = () => {
  data.itemMenu = !data.itemMenu;
};

const goTo = async (name: string, param: string) => {
  await router.push({name: name, params: {id: param}});
  return;
};

const deleteItem = async (testId: number) => {
  let res = <IStatusServerResponse> await deleteTest(testId);
  if (res?.status) {
    setInfo({type: ALERT_SUCCESS, message: ["Test deleted success."]});
  }

  showMenu();
};
</script>

<template>
  <div v-if="props.testItem">
    <div class="table-item m-table-item" :class="{'m-table-item-show': data.show}">
      <div class="item-title item-title-show" @click="showItem">

        <div class="item-title-content">
          <img :src="`${data.imageBaseUrl}${props.testItem.img_path}`" height="48" width="48" alt="">
          <div class="content-title">{{dotsString(45, props.testItem.title)}}</div>
        </div>

        <SvgTemplate class="vector-rotate" name="vector" />

      </div>

      <div class="item-content item-content-show">
        <div class="statistic">
          <BorderRate :rate="String(props.testItem.average_score)" :percent="props.testItem?.average_score" title="AVG"/>
          <BorderRate :rate="String(props.testItem.passed)"  title="Passed"/>
          <LevelRate v-if="props.testItem.difficulty" :rate="String(props.testItem.difficulty.id)" title="Level"/>
        </div>
        <div class="info">
          <div class="info-category" v-if="props.testItem.category">
            <div class="preview" :class="`${props.testItem.category.color}-bg`">
              <SvgTemplate :name="props.testItem.category.svg" />
            </div>
            <div class="text">{{ props.testItem.category.name }}</div>
          </div>
          <div class="info-status">
            <SvgTemplate class="btn-delete" :name="props.testItem.status"/>
            <div>{{ props.testItem.status }}</div>
          </div>
        </div>
        <div class="actions">
          <ButtonSvg height="24px" width="24px" @click="deleteItem(props.testItem.id)">
            <template v-slot:svg>
              <SvgTemplate class="btn-delete" name="delete"/>
            </template>
          </ButtonSvg>

          <ButtonSvg height="24px" width="24px" @click="goTo(`edit-test`, `${props.testItem.id}`)">
            <template v-slot:svg>
              <SvgTemplate class="btn-edit" name="edit"/>
            </template>
          </ButtonSvg>

          <ButtonSvg height="24px" width="24px">
            <template v-slot:svg>
              <SvgTemplate class="btn-info" name="info-cycle"/>
            </template>
          </ButtonSvg>
        </div>
      </div>
    </div>

    <div class="table-item d-table-item">
      <div class="preview">
        <img :src="`${data.imageBaseUrl}${props.testItem.img_path}`" height="64" width="64" alt="">
        <div class="preview-title">{{dotsString(45, props.testItem.title)}}</div>
      </div>
      <div class="statistic">
        <div class="statistic-items">
          <BorderRate :rate="String(props.testItem.average_score)" :percent="props.testItem?.average_score" title="AVG"/>
          <BorderRate :rate="String(props.testItem.passed)"  title="Passed"/>
          <LevelRate v-if="props.testItem.difficulty" :rate="String(props.testItem.difficulty.id)" title="Level"/>
        </div>
        <div class="statistic-types">
          <div class="info-category" v-if="props.testItem.category">
            <div class="preview-category" :class="`${props.testItem.category.color}-bg`">
              <SvgTemplate :name="props.testItem.category.svg" />
            </div>
            <div class="category-text">{{ props.testItem.category.name }}</div>
          </div>
          <div class="info-type">
            <div :class="`lock-${props.testItem.status}`"></div>
          </div>
        </div>
      </div>
      <div class="settings" :class="`item-settings-${props.testItem.id}`">
        <button type="button" class="hover" @click="showMenu">
          <SvgTemplate name="menu-options"/>
        </button>

        <div class="item-menu" :class="[{'show-item-menu': data.itemMenu}, `item-menu-${props.testItem.id}`]">
          <menu class="item-menu-list">
            <li class="hover">Поделиться</li>
            <li class="hover">Сгенерировать ссылку</li>
            <li class="hover">Просмотреть</li>
            <li class="hover" @click="goTo(`edit-test`, `${props.testItem.id}`)">Редактировать</li>
            <li class="hover" @click="deleteItem(props.testItem.id)">Удалить</li>
          </menu>
        </div>
      </div>
    </div>
  </div>

</template>