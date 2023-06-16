<script setup lang="ts">

const data = reactive({
  show: true
});
const showItem = () => {
  data.show = !data.show;
};
</script>

<template>
  <div class="table-item m-table-item" :class="{'m-table-item-show': data.show}">
    <div class="item-title item-title-show" @click="showItem">

      <div class="item-title-content">
        <img src="/image-test-category.jpg" height="48" width="48" alt="">
        <div class="title">{{'Тест на знание истории Древного Рима asssssssssss'}}</div>
      </div>

      <SvgTemplate class="vector-rotate" name="vector" />

    </div>

    <div class="item-content item-content-show">
      <div class="statistic">

      </div>
      <div class="info"></div>
      <div class="actions"></div>
    </div>
  </div>

  <div class="table-item d-table-item">

  </div>

</template>

<style lang="scss">
@import "@/assets/css/variables.scss";

.table-item {
  background-color: $color-white;
}

.m-table-item {
  max-height: rem-calc(325);
  border-radius: rem-calc(14);
  .item-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem-calc((14, 20, 14, 14));
    border-radius: rem-calc(14);

    .item-title-content {
      display: flex;
      align-items: center;
      column-gap: rem-calc(16);

      img {
        border-radius: rem-calc(12);
      }

      .title {
        font-size: $font13;
        color: $color-black-market;
      }
    }
    svg {
      stroke: $color-grey-suit;
      transition: transform .2s ease-in-out;
    }
  }

  .item-content {
    overflow: hidden;
    height: rem-calc(0);
    background-color: $color-white;
    border-bottom-right-radius: rem-calc(14);
    border-bottom-left-radius: rem-calc(14);
    transition: height .2s ease-in-out;

    .statistic {
      height: rem-calc(101);
    }

    .info {
      height: rem-calc(64);
      border-bottom: rem-calc(1) solid $color-solitude;
      border-top: rem-calc(1) solid $color-solitude;
    }

    .actions {
      height: rem-calc(68);
    }
  }
}

.m-table-item-show {
  .item-title-show {
    box-shadow:rem-calc((0, 5, 8)) rgba(55, 97, 186, 0.1);
    .vector-rotate {
      transform: rotate(180deg);
    }
  }
  .item-content-show {
    margin-top: rem-calc(14);
    height: rem-calc(235);
  }
}

.d-table-item {
  display: none;
}

@media (min-width: rem-calc(768)) {

}

@media (min-width: rem-calc(992)) {
  .table-item {
    height: rem-calc(112);
  }

  .m-table-item {
    display: none;
  }

  .d-table-item {
    display: block;
  }
}

</style>