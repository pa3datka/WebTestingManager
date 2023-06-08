<script>
export default {
  name: "InputText",
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
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
  <div class="textarea-input" :class="[{ 'textarea-error': getErrorMessage }, classes]">
    <textarea v-model="value" class="scroll" :id="`id-${name}`" :name="name" :placeholder="placeholder" />
    <span>{{ getErrorMessage }}</span>
  </div>
</template>