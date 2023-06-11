<script>
export default {
  name: "InputText",
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
    },
    name: {
      type: String,
      default: 'default-name'
    },
    placeholder: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: []
    },
    error: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    errorMessage: '',
    isPassShow: false
  }),

  computed: {
    value: {
      get() {
        this.error && (this.errorMessage += (' ' + this.error))
        return this.modelValue ? this.modelValue : '';
      },
      set(value) {
        this.errorMessage = '';
        let val = value < 0 ? 1 : value;
        this.$emit('update:modelValue', val);
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
  <div class="number-input" :class="[{ 'input-error': getErrorMessage }, classes]">
    <input v-model="value" type="number" :id="`${id}-${name}`" :name="`${id}-${name}`" :placeholder="placeholder" >
    <span>{{ getErrorMessage }}</span>
  </div>
</template>