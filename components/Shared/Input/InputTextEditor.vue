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