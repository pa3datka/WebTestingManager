<script setup lang="ts">
import CropperModal from "~/components/Shared/Modal/CropperModal.vue";

const data = reactive({
  image: <string> '',
  closeCropper: false,
});

const getImage = async (e: any) => {
  const file = e.target.files[0];
  const readData = async (f: any) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(f);
  });
  data.image = <string> await readData(file);
  data.closeCropper = true;
};

const clear = () => {
  data.image = '';
};

const closeCropper = (val: boolean): void => {
  data.closeCropper = val;
}

const emitImage = (image: string) => {
  data.closeCropper = true;
  data.image = image;
 // emit('update:modelValue', image);
};
</script>

<template>
<div class="input-image">
  <div class="empty-image" v-if="!data.image">
    <div class="empty-image-placeholder">Upload image min size 456x456</div>
    <input @change="getImage" type="file" >
  </div>

  <div class="thumbnail" v-if="data.image">
    <img :src="data.image">
    <div class="clear hover" @click="clear"></div>
  </div>


</div>
  <CropperModal
      v-if="data.closeCropper"
      :image="data.image"
      v-on:close-cropper="closeCropper"
      v-on:crop-image="emitImage"
      :aspect-ratio="1/1"
  />
</template>

<style scoped lang="scss">
@import "@/assets/css/variables.scss";
.input-image {
  position: relative;

  .empty-image {
    height: 40px;
    width: 100%;
    border: 1px solid #E4E5F1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 12px;
    font-size: 15px;
    color: #626167;

    &:after {
      content: '';
      height: 20px;
      width: 20px;
      background-image: url("/assets/img/svg/upload-image.svg");
      background-repeat: no-repeat;
      background-position: center;

    }

    input {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
    }

  }

  .thumbnail {
    position: relative;
    height: 165px;
    width: 165px;

    img {
      height: 100%;
      width: 100%;
      border-radius: 4px;
    }

    .clear {
      position: absolute;
      top: rem-calc(10);
      right: rem-calc(10);
      border-radius: 50%;
      height: rem-calc(24);
      width: rem-calc(24);
      background-color: $color-white;
      z-index: 2;
      background-image: url("@/assets/img/svg/close.svg");
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}
</style>