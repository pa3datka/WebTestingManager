<script>
export default {
  name: "InputText",
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: 'default-name'
    },
    type: {
      type: String,
      default: 'text'
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
    numberType: {
      type: String,
      default: 'string'
    }
  },

  data: () => ({
    errorMessage: '',
    isPassShow: false
  }),

  computed: {
    value: {
      get() {
        this.error && (this.errorMessage += (' ' + this.error));
        return this.typeNumber(this.modelValue);
      },

      set(value) {
        this.errorMessage = '';
        this.$emit('update:modelValue', this.typeNumber(value));
      }
    },

    getErrorMessage() {
      if (this.errorMessage) {
        return this.errorMessage;
      }
    },
  },

  methods: {

    typeNumber(val) {
      if (this.numberType === 'string') {
        return val;
      }

      if (this.$props.numberType === 'integer') {
        let int = parseInt(val);

        if (isNaN(int)) {
          return null;
        }

        (int < 0 || int === 0) && (int = null);
        return int;
      }

    }
  }
}
</script>

<template>
  <div class="input-borderless" :class="[{ 'input-error': getErrorMessage }, classes]">
    <input v-if="numberType === 'integer'" v-model="value" :type="type"
           oninput="this.value = (this.value === 0 || this.value < 1) ? '' : Math.abs(Math.floor(this.value));"
           :id="`id-${name}`" :name="name" :placeholder="placeholder">
    <input v-if="numberType !== 'integer'" :id="`id-${name}`" :type="type" :name="name" :placeholder="placeholder">
    <span>{{ getErrorMessage }}</span>
  </div>
</template>