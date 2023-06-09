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

<style>
.v-h {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}

.checkbox-correct-answer {
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 14px;
}


.input-checkbox-error label:before {
  border: 1px solid #F86B6B!important;
}

.checkbox-correct-answer label {
  display: flex;
  align-items: center;
  column-gap: 14px;
  font-size: 13px;
  font-weight: 400;
  color: #8F8E9C;
}

.checkbox-correct-answer label:before {
  content: 'Correct answer';
  text-align: center;
  min-height: 28px;
  min-width: 132px;
  background-color: #FFFFFF;
  border: 1px solid #E4E5F1;
  border-radius: 4px;
  font-size: 11px;
  color: #8F8E9C;
  line-height: 2.5;
}
.checkbox-correct-answer input:checked ~ label:before {
  background-color: #7AC74F!important;
  color: #FFFFFF;
}

@media (min-width: 768px) {
  .checkbox-correct-answer label {
    column-gap: 0;
  }

  .checkbox-correct-answer label:before {
    content: '';
    min-height: 40px;
    min-width: 40px;
    background-image: url("/assets/img/svg/check-none.svg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 20px 20px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  .checkbox-correct-answer input:checked ~ label:before {
    background-image: url("/assets/img/svg/check-ok.svg");
    background-color: #FFFFFF!important;
  }
}

@media (min-width: 992px) {
  .checkbox-correct-answer label:before {
    content: '';
    min-height: 48px;
    min-width: 48px;
  }
}
</style>