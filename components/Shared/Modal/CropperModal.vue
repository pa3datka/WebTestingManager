<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';
import CustomBackgroundCropper from "~/components/Shared/Modal/CustomBackgroundCropper.vue";

const emit = defineEmits(['cropImage', 'closeCropper']);
const props = defineProps({
   image: {
       type: String,
       default: ''
   },
    width: {
       type: Number,
       default: 456
    },
    height: {
        type: Number,
        default: 456
    },
    aspectRatio: {
       type: Number,
       default: 1/1
    }
});
const data = reactive({
    notification: <string> ''
});
const cropperRef = <Ref> ref(null);

const crop = async (e: any) => {
    if (e) {
        const { canvas } = e.getResult();
        emit('cropImage', canvas.toDataURL());
        emit('closeCropper', false);
    }
}

const change = ({coordinates}: any) => {
    if (coordinates.width < props.width || coordinates.height < props.height) {
        cropperRef && cropperRef.value.setCoordinates({
            width: props.width,
            height: props.height,
            left: coordinates.left,
            top: coordinates.top
        });
        console.log(coordinates)
        data.notification = `Min image size ${props.width}x${props.height}`;
        setTimeout(() => {
            data.notification = '';
        }, 2000);
    }
    if (coordinates.width > props.width || coordinates.height > props.height) {
        cropperRef && cropperRef.value.setCoordinates({
            width: props.width,
            height: props.height,
            left: coordinates.left,
            top: coordinates.top
        });

        data.notification = `Max image size ${props.width}x${props.height}`;
        setTimeout(() => {
            data.notification = '';
        }, 2000);
    }
}
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
                    :canvas="{height: props.height,width: props.width}"
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