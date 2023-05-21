<script setup lang="ts">
import CropperModal from "~/components/Shared/Modal/CropperModal.vue";
import ChoseImageModal from "~/components/Shared/Modal/ChoseImageModal.vue";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
});

const data = reactive({
  closeCropper: false,
  closeChose: false
});

const getImage = async (e: any) => {
  const file = e.target.files[0];
  const readData = async (f: any) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(f);
  });
  let image = <string>await readData(file);
  emitImage(image);
}

const emitImage = (image: string) => {
  data.closeCropper = true;
  emit('update:modelValue', image);
};

const choseImage = (image: string) => {
  closeModalChose();
  emit('update:modelValue', image);
}

const clearImage = () => {
  emit('update:modelValue', null);
};

const closeCropper = (val: boolean): void => {
  data.closeCropper = val;
}

const closeModalChose = () => {
  data.closeChose = !data.closeChose;
}



</script>

<template>
  <div class="upload-img-container">
    <div class="upload-wrapper">
      <div class="thumbnail-img">
        <div class="thumbnail-img__empty hover" v-if="!props.modelValue">
          <div class="thumbnail-not-img-wrapper">
            <div class="thumbnail-not-img"></div>
            <div class="thumbnail-not-img-text">Обложка</div>
          </div>
          <input class="hover" type="file" accept="image/*" @change="getImage" name="upload-img1">
        </div>

        <div class="thumbnail-img__not-empty" v-if="props.modelValue">
          <img :src="modelValue">
          <div class="clear-image cursor" @click="clearImage"></div>
        </div>
      </div>
      <div class="load-btn-group pt-sm-15 pt-lg-30">
        <button class="btn-cycle W-100 hover" style="height: 32px;" @click="closeModalChose">Chose</button>
        <input type="file" class="custom-file-input-btn" accept="image/*" name="upload-img2" @change="getImage"/>
      </div>
    </div>
  </div>

  <CropperModal
      v-if="data.closeCropper"
      :image="modelValue"
      v-on:close-cropper="closeCropper"
      v-on:crop-image="emitImage"
      :width="500"
      :height="500"
      :aspect-ratio="1/1"
  />

  <ChoseImageModal v-if="data.closeChose" v-on:chose-image="choseImage">
    <template v-slot:close>
      <div class="chose-modal-header__close hover" @click="closeModalChose"></div>
    </template>
  </ChoseImageModal>
</template>


<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/buttons/cycle-radius-btn";
@import "@/assets/css/components/parts/inputs/image-thumbnail-uploader";
@import "@/assets/css/components/parts/modals/cropper-modal";
@import "@/assets/css/components/parts/modals/chose-upload-images-modal";
@import "@/assets/css/components/parts/inputs/select-svg-label";
@import 'vue-advanced-cropper/dist/style.css';
@import 'vue-advanced-cropper/dist/theme.compact.css';

</style>