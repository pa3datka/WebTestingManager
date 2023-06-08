<template>
  <div class="auth-input" :class="[{ 'input-error': getErrorMessage }, classes]">
    <input v-model="value" :type="type" :id="`id-${name}`" :name="name" :placeholder="placeholder">
    <div v-if="classes === 'password-field'" @click="type = type === 'password' ? 'text' : 'password'"
         class="btn-pass-block">
      <div :class="[type === 'password' ? 'btn-show' : 'btn-hide']"></div>
    </div>
    <span>{{ getErrorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "InputText",
  emits: ['update:modelValue', 'errorValue'],
  props: {
    modelValue: {
      type: String,
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
        this.errorValue = '';
        this.$emit('update:modelValue', value);
      }
    },

    getErrorMessage() {
      if (this.errorMessage) {
        return this.errorMessage;
      }
    },
    errorValue: {
      get() {
        return this.$props.error;
      },
      set(value) {
        this.$emit('errorValue', value);
      }
    }
  },

  methods: {
    delete() {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  beforeDestroy () {
    this.$el.parentNode.removeChild(this.$el)
  }
}
</script>