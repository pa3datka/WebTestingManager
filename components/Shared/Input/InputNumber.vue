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

<style>
.number-input {
  position: relative;
}
.number-input input {
  height: 40px;
  width: 100%;
  border: 1px solid #E4E5F1;
  border-radius: 4px;
  font-size: 15px;
  padding: 0 16px;
  color: #626167;
}


.number-input input:focus,
.number-input input:focus-visible {
  outline: none !important;
  border-color: #C9C8D3;
}

input[type="number"] {
  background-image: url("/assets/img/svg/number-arrow.svg");
  background-repeat: no-repeat;
  background-position: 98% center;
  padding-right: 16px;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  opacity: 1 !important;
  background: transparent !important;
  border-width: 0;
  margin: 0;
  height: 40px;
  width: 24px;
  cursor: pointer;
}

.input-error input,
.input-error input:focus,
.input-error input:focus-visible {
  border: 1px solid #F86B6B;
  color: #F86B6B;
}
.number-input span {
  display: none;
}

.input-error span {
  display: inline-block;
  padding-top: 4px;
  font-size: 12px;
  color: #F86B6B;

  animation-duration: .4s;
  animation-name: showError;
}

@keyframes showError {
  from {
    margin-left: 10%;
  }

  to {
    margin-left: 0;
  }
}
@media (min-width: 768px) {

}

@media (min-width: 992px) {
  .number-input input {
    height: 48px;
  }
}
</style>