<script setup lang="ts">
import CropperModal from "~/components/Shared/Modal/CropperModal.vue";
import Selection from "~/components/Shared/Input/Selection.vue";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: String,
        default: null
    }
});

const data = reactive({
    isShowChose: false,
    closeCropper: false
});

const getImage = async (e: any) => {
    const file = e.target.files[0];
    const readData = async (f: any) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(f);
    });
    let image = <string> await readData(file);
    emitImage(image);
}

const emitImage = (image: string) => {
    data.closeCropper = true;
    emit('update:modelValue', image);
};

const clearImage = () => {
    emit('update:modelValue', null);
};

const closeCropper = (val: boolean): void => {
    data.closeCropper = val;
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
                    <input class="hover" type="file" accept="image/*" @change="getImage" name="upload-img1" >
                </div>

                <div class="thumbnail-img__not-empty" v-if="props.modelValue">
                    <img :src="modelValue">
                    <div class="clear-image cursor" @click="clearImage"></div>
                </div>
            </div>
            <div class="load-btn-group pt-sm-15 pt-lg-30">
                <button class="btn-cycle W-100 hover" style="height: 32px;">Chose</button>
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

    <div class="chose-image-container">
        <div class="chose-background"></div>
        <div class="chose-modal-container">
            <div class="chose-image-modal">
                <div class="chose-modal-header">
                  <div class="chose-modal-header__title">Chose a cover</div>
                  <div class="chose-modal-header__close hover"></div>
                </div>

                <div class="chose-modal-action">
                   <Selection />
                </div>

            </div>
        </div>
    </div>

</template>


<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/buttons/cycle-radius-btn";
@import "@/assets/css/components/parts/inputs/image-thumbnail-uploader";
@import "@/assets/css/components/parts/modals/cropper-modal";



.chose-image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .chose-background {
        position: fixed;
        z-index: 21;
        opacity: 0.75;
        background-color: #262342;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .chose-modal-container {
        position: absolute;
        z-index: 22;
        width: 95%;
        max-width: rem-calc(975);
        .chose-image-modal {
            width: 100%;
            height: 100%;
            max-width: rem-calc(976);
            background-color: $color-white;
            border-radius: rem-calc(14);

          .chose-modal-header {
            height: rem-calc(81);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: rem-calc(48);
            padding-right: rem-calc(15);


            .chose-modal-header__title {
              font-size: $font20;
              font-weight: $font-weight5;
            }
            .chose-modal-header__close {
              height: rem-calc(50);
              width: rem-calc(50);
              background-image: url("@/assets/img/svg/modal-close.svg");
              background-repeat: no-repeat;
              background-position: center center;
            }
          }

          .chose-modal-action {
            height: rem-calc(88);
            background-color: $color-white-2;
            border-bottom: rem-calc(1) solid $color-grey-7;
            border-top: rem-calc(1) solid $color-grey-7;
            padding: rem-calc((20, 48));
          }
        }
    }

    @media (min-width: rem-calc(768)) {
        .chose-modal-container {
            width: 80%;
        }
    }

    @media (min-width: rem-calc(992)) {
        .chose-modal-container {
            width: 70%;
        }
    }

}

</style>