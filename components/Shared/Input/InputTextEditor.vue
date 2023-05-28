<script setup lang="ts">
import {Ref} from "vue";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const contentRef = <Ref> ref(null);

onMounted(() => {
  const buttons = document.querySelectorAll('.button-option');
  buttons.length && buttons.forEach((button: any) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('btn-link')) {
        let userLink = prompt('Enter a URL', 'https://');
        userLink && modifyText(button.id, false, userLink);
      } else {
        button.classList.toggle('btn-editor-active')
        modifyText(button.id, false, button?.value);
      }
    });
  });
});

const eventEditor = () => {

};
const modifyText = (command: string, aShowDefaultUI: boolean, aValueArgument: string|undefined): void => {
  document.execCommand(command, false, aValueArgument);
};

const getContent = () => {
  contentRef.value && emit('update:modelValue', contentRef.value?.innerHTML);
}

const colorText = (val: any): void => {
  modifyText(val.target.id, false, val.target.value);
}
</script>

<template>
<div class="text-editor-container">
    <div class="content scroll" contenteditable="true" id="content-editor" :ref="(el: any) => contentRef = el" @input="getContent"></div>
  <div class="content-options">
    <div class="button-option btn-bold hover" id="bold"></div>
    <div class="button-option btn-cursive hover" id="italic"></div>
    <div class="button-option btn-underline hover" id="underline"></div>
    <div class="button-option btn-link hover" id="createLink"></div>
    <input type="color" class="input-text-color btn-color hover" id="foreColor" @change="colorText">
  </div>
</div>
</template>

<style lang="scss">
.text-editor-container {
  width: 100%;
  border: 1px solid #E4E5F1;
  border-radius: 4px;

  .content {
    &:focus-visible {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: none;
    }

    height: 121px;
    width: 100%;
    padding: 16px;
    color: #626167;
    word-break: break-all;
    overflow: auto;
  }
  .content-options {
    padding: 10px;
    height: 44px;
    display: flex;
    column-gap: 20px;
    justify-content: center;

    border-top: 1px solid #E4E5F1;
    .button-option,
    .input-text-color {
      height: 24px;
      width: 24px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 14px 14px;
      background-color: #E4E5F1;
      border-radius: 4px;
    }

    .btn-bold {
      background-image: url("/assets/img/svg/bold-editor.svg");
    }

    .btn-cursive {
      background-image: url("/assets/img/svg/cursive-editor.svg");
    }

    .btn-underline {
      background-image: url("/assets/img/svg/underline-editor.svg");
    }

    .btn-link {
      background-image: url("/assets/img/svg/link-editor.svg");
    }

    .btn-color {
      background-image: url("/assets/img/svg/text-color-editor.svg");

      &[type="color"]::-webkit-color-swatch-wrapper {
        //height: 3px;
        padding: 16px 3px 3px 3px;
      }
      &[type="color"]::-webkit-color-swatch {
        border: none;
      }
    }

    .btn-editor-active {
      background-color: #C9C8D3;
    }
  }
}

@media (min-width: 768px) {
  .text-editor-container {
    display: flex;

    .content {
      height: 192px;
    }

    .content-options {
      border-top: none;
      border-left: 1px solid #E4E5F1;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 10px;
      padding: 16px;
    }
  }
}

@media (min-width: 992px) {
  .text-editor-container {
    .content {
      height: 221px;
    }

    .content-options {
      border-top: none;
      border-left: 1px solid #E4E5F1;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 14px;
      padding: 22px 12px;
    }
  }
}
</style>