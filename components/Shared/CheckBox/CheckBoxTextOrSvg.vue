<script>
export default {
  name: "CheckBox",
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type:  Boolean,
    },
    id: {
      type: String
    },
    name: {
      type: String
    },
    rules: {
      type: Array,
      default: []
    }
  },

  data: () => ({
    errorMessage: '',
  }),

  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.errorMessage = '';
        this.$emit('update:modelValue', value);
      }
    },

    getErrorMessage() {
      if (this.errorMessage) {
        return this.errorMessage;
      }
    },
  }
}
</script>

<template>
  <div class="checkbox-correct-answer" :class="{ 'input-checkbox-error': getErrorMessage }">
    <input class="v-h" type="checkbox" :id="id" :name="name" @click="value = !value" :checked="value">
    <label class="hover" :for="id">
      <slot name="label"></slot>
    </label>
  </div>
</template>