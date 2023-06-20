<script setup lang="ts">

import BorderRate from "~/components/Shared/Indicator/BorderRate.vue";
import LevelRate from "~/components/Shared/Indicator/LevelRate.vue";
import ButtonSvg from "~/components/Shared/Button/ButtonSvg.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";
import {PropType} from "@vue/runtime-core";
import {ITests} from "~/composables/Interfaces/TestInterfaces/Response/ITest";

const props = defineProps({
  testItem: {
    type: Object as PropType<ITests>,
  }
});
const data = reactive({
  show: true,
});

const dotsString = (length: number, text: string): string => {
  return text.length > length ? text.slice(0, (length - 3)) + '...' : text;
}
const showItem = () => {
  data.show = !data.show;
};
</script>

<template>
  <div v-if="props.testItem">
    <div class="table-item m-table-item" :class="{'m-table-item-show': data.show}">
      <div class="item-title item-title-show" @click="showItem">

        <div class="item-title-content">
          <img src="/image-test-category.jpg" height="48" width="48" alt="">
          <div class="content-title">{{dotsString(45, 'Тест на знание истории Древного Рима asssssssssss')}}</div>
        </div>

        <SvgTemplate class="vector-rotate" name="vector" />

      </div>

      <div class="item-content item-content-show">
        <div class="statistic">
          <BorderRate rate="7/10" :percent="70" title="AVG"/>
          <BorderRate rate="176"  title="Passed"/>
          <LevelRate title="Level"/>
        </div>
        <div class="info">
          <div class="info-category">
            <div class="preview">
              <SvgTemplate name="history" />
            </div>
            <div class="text">History</div>
          </div>
          <div class="info-status">
            <img src="@/assets/img/svg/lock-private.svg" height="24" width="24" alt="Lock">
            <div>Private</div>
          </div>
        </div>
        <div class="actions">
          <ButtonSvg height="24px" width="24px">
            <template v-slot:svg>
              <SvgTemplate class="btn-delete" name="delete"/>
            </template>
          </ButtonSvg>

          <ButtonSvg height="24px" width="24px">
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
        <img src="/image-test-category.jpg" height="64" width="64" alt="">
        <div class="preview-title">{{dotsString(45, props.testItem.title)}}</div>
      </div>
      <div class="statistic">
        <div class="statistic-items">
          <BorderRate :rate="String(props.testItem.average_score)" :percent="props.testItem?.average_score" title="AVG"/>
          <BorderRate :rate="String(props.testItem.passed)"  title="Passed"/>
          <LevelRate :rate="String(props.testItem.difficulty.id)" title="Level"/>
        </div>
        <div class="statistic-types">
          <div class="info-category">
            <div class="preview-category" :class="`${props.testItem.category.color}-bg`">
              <SvgTemplate :name="props.testItem.category.svg" />
            </div>
            <div class="category-text">{{ props.testItem.category.name }}</div>
          </div>
          <div class="info-type">
            <img :src="`@/assets/img/svg/lock-${props.testItem.status}.svg`" height="28" width="28" alt="Lock">
          </div>
        </div>
      </div>
      <div class="settings">
        <button type="button" class="hover">
          <SvgTemplate name="menu-options"/>
        </button>
      </div>
    </div>
  </div>

</template>