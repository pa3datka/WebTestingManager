<script setup lang="ts">
import {Cropper} from 'vue-advanced-cropper';


import CustomBackgroundCropper from "~/components/Shared/Modal/CustomBackgroundCropper.vue";
import {onUnmounted, onMounted} from "@vue/runtime-core";

const emit = defineEmits(['cropImage', 'closeCropper']);
const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  minWidth: {
    type: Number,
    default: 456
  },
  minHeight: {
    type: Number,
    default: 456
  },
  aspectRatio: {
    type: Number,
    default: 1 / 1
  }
});
const data = reactive({
  notification: <string>''
});
const cropperRef = <Ref>ref(null);

const crop = async (e: any) => {
  if (e) {
    const {canvas} = e.getResult();
    emit('cropImage', canvas.toDataURL());
    emit('closeCropper', false);
  }
}

const change = ({coordinates}: any) => {
  // if (coordinates.width < props.minWidth || coordinates.height < props.minHeight) {
  //   console.log(coordinates)
  //   data.notification = `Min image size ${props.minWidth}x${props.minHeight}`;
  //
  //   setTimeout(() => {
  //     data.notification = '';
  //     emit('cropImage', '');
  //     emit('closeCropper', false);
  //   }, 2000);
  // }
}

onMounted(() => {
  const body = document.querySelector('body');
  body && (body.style.overflow = 'hidden');
});

onUnmounted(() => {
  const body = document.querySelector('body');
  body && (body.style.overflow = '');
});
</script>

<template>
  <div class="cropper-container" v-if="props.image">
    <div class="cropper-background"></div>
    <div class="cropper-info" v-show="data.notification">
      {{ data.notification }}
    </div>
    <div class="cropper-wrapper">
      <cropper
          @change="change"
          class="cropper-item"
          :src="image"

          :stencil-props="{movable: true, resizable: false,aspectRatio: props.aspectRatio}"
          :resize-image="{adjustStencil: false}"
          image-restriction="stencil"
          :ref="(el: any) => cropperRef = el"
          :background-wrapper-component="CustomBackgroundCropper"
      />

      <button class="btn-cycle W-100 hover mt-sm-10" @click="crop(cropperRef)">
        Done
      </button>
    </div>
  </div>
</template>