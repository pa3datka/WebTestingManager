<script setup lang="ts">
import ButtonCycleSvg from "~/components/Shared/Button/ButtonCycleSvg.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";

definePageMeta({
  name: "my-tests",
  layout: 'dashboard',
  middleware: ['is-auth']
});

import {useRouter} from "nuxt/app";
import MobileTableHead from "~/components/MyTests/MobileTableHead.vue";
import SearchMyTestInput from "~/components/MyTests/SearchMyTestInput.vue";
import DesktopTableHead from "~/components/MyTests/DesktopTableHead.vue";
import TableItem from "~/components/MyTests/TableItem.vue";

const router = useRouter();

const getPageName = (pageName: string) => {
  router.push({ name: pageName });
}


</script>

<template>
<div class="container">
  <div class="page-my-tests">
    <div class="title">
      <div class="btn-head" @click="getPageName('add-test')">
        <svg-template name="add-test"/>
      </div>
      <div>My Tests ({{ 12 }})</div>
      <div class="btn-head-desktop">
        <ButtonCycleSvg class="cotton-ball-bg button-active-info" @click="getPageName('add-test')" text="Add test">
          <template v-slot:svg>
            <SvgTemplate name="add-test"/>
          </template>
        </ButtonCycleSvg>
      </div>
    </div>

    <div class="page-table-tests">

      <div class="table-head">

        <MobileTableHead />

        <DesktopTableHead />

      </div>

      <div class="table-content">
        <TableItem />
      </div>
    </div>
  </div>

</div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/buttons/button-cycle-svg";

.page-my-tests {
  max-width: rem-calc(1240);

  .title {
    width: 100%;
    font-size: $font18;
    font-weight: $font-weight5;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn-head {
      padding: rem-calc((10, 10, 6, 10));
      svg {
        stroke: $color-button-blue;
      }
    }

    .btn-head-desktop {
      display: none;
      .button-cycle-svg {
        color: $color-button-blue;
        svg {
          stroke: $color-button-blue;
        }
      }
    }
  }

  .page-table-tests {
    padding-top: rem-calc(20);
    .table-head {
      width: 100%;
      height: rem-calc(48);
      background-color: $color-white;
      border-radius: rem-calc(14);
    }

    .table-content {
      padding-top: rem-calc(12);
    }
  }
}

@media (min-width: rem-calc(768)) {
  .page-my-tests {
    .title {
      text-align: left;
     justify-content: space-between;
      font-size: $font20;
      .btn-head {
        display: none;
      }
    }

    .page-table-tests {
      padding-top: rem-calc(26);
    }
  }
}

@media (min-width: rem-calc(992)) {
  .page-my-tests {
    .title {
      .btn-head-desktop {
        display: block;
      }
    }

    .page-table-tests {
      padding-top: rem-calc(32);
      .table-head {
        height: rem-calc(72);
      }

      .table-content {
        padding-top: rem-calc(20);
      }
    }
  }
}

</style>