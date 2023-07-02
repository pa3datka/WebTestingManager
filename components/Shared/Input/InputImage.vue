<script setup lang="ts">
import CropperModal from "~/components/Shared/Modal/CropperModal.vue";
import {reactive} from "@vue/reactivity";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  }
});
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
  emit('update:modelValue', '');
};

const closeCropper = (val: boolean): void => {
  data.closeCropper = val;
}

const emitImage = (image: string) => {
  data.closeCropper = true;
  data.image = image;
  emit('update:modelValue', image);
};

const viewImage = computed(() => {
  if (1 < props.modelValue?.indexOf('.webp')) {
    return useRuntimeConfig().public.imageApiUrl + props.modelValue;
  }

  return props.modelValue;
});
</script>

<template>
<div>
  <div class="input-image">
    <div class="empty-image" v-if="!viewImage">
      <div class="empty-image-placeholder">Upload image min size 456x456</div>
      <input @change="getImage" type="file" :id="props.id" :name="props.name + props.id" >
    </div>

    <div class="thumbnail" v-if="viewImage">
      <img :src="viewImage">
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
</div>
</template>