<script setup lang="ts">

const types = [
  { id: 1, type: 'text', description: 'Select one or more answers' },
  { id: 2, type: 'picture', description: 'Select one or more pictures' },
  { id: 3, type: 'Sequence (text)', description: 'Specify the sequence of answers' },
  { id: 4, type: 'Sequence (pictures)', description: 'Specify the sequence of answers' },
  { id: 5, type: 'Fill in the gaps', description: 'Insert missing characters or words' },
];
</script>

<template>
<div class="answer-types-container">
  <div class="answer-types-title">Question Format</div>

  <div class="desktop-answer-types">
      <ul>
        <li class="item hover" v-for="(type, key) in types" :key="type.id" :class="{'item-active': key === 2}">
          <div class="item-cycle">
            <div class="item-cycle_center"></div>
          </div>
          <div class="type-wrapper">
            <div class="type_type">{{ type.type }}</div>
            <div class="type_description">{{ type.description }}</div>
          </div>
        </li>
      </ul>
  </div>
</div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";

.answer-types-container {
  width: 100%;
  background-color: #F8F8FC;
  padding: rem-calc((24, 16));

  .answer-types-title {
    padding-left: rem-calc(16);
    padding-right: rem-calc(16);
    font-weight: $font-weight5;
    font-size: $font15;
  }

  .desktop-answer-types {
    display: none;
    padding-top: rem-calc(24);


    .item {
      height: rem-calc(72);
      padding: rem-calc((0, 16));
      display: flex;
      align-items: center;
      column-gap: rem-calc(16);

      &:hover {
        background-color: #FFFFFF;

        .item-cycle {
          border: rem-calc(1) solid #2C64DC;
        }
      }

      .item-cycle {
        height: rem-calc(21);
        width: rem-calc(21);
        border: rem-calc(1) solid #C4C3CD;
        border-radius: 50%;
        background-color: #FFFFFF;
      }
      .type_type {
        font-size: $font15;
        font-weight: $font-weight5;
        color: #262342;

      }

      .type_description {
        font-size: $font14;
        color: #8F8E9C;
        padding-top: rem-calc(8);
      }
    }

    .item-active {
      background-color: #FFFFFF;
      border-radius: rem-calc(4);
      .item-cycle {
        border-radius: 50%;
        border-color: #2C64DC;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;

        .item-cycle_center {
          height: rem-calc(10);
          width: rem-calc(10);
          background-color: #2C64DC;
          border-radius: 50%;
        }
      }

    }
  }
}

@media (min-width: rem-calc(768)) {
  .answer-types-container {
    //padding: rem-calc((24, 20));
  }
}

@media (min-width: rem-calc(992)) {
  .answer-types-container {
    padding: rem-calc((40, 16));
    border-right: rem-calc(1) solid #E4E5F1;

    .answer-types-title {
      font-size: $font17;
    }

    .desktop-answer-types {
      display: block;
    }
  }
}

</style>