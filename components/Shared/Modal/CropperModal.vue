<script setup lang="ts">
import ButtonCycle from "~/components/Shared/Button/ButtonCycleSvg.vue";
import { Cropper } from 'vue-advanced-cropper';


import CustomBackgroundCropper from "~/components/Shared/Modal/CustomBackgroundCropper.vue";
import { onUnmounted, onMounted } from "@vue/runtime-core";

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
};

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
            class="cropper-item"
            :src="image"
            :stencil-props="{movable: true, resizable: false,aspectRatio: props.aspectRatio}"
            :resize-image="{adjustStencil: false}"
            image-restriction="stencil"
            :ref="(el: any) => cropperRef = el"
            :background-wrapper-component="CustomBackgroundCropper"
        />

        <ButtonCycle
            class="W-100 white-bg mt-sm-10 button-active-info"
            text="Done"
            @click="crop(cropperRef)"
        />
    </div>
  </div>
</template>