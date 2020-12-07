<template>
  <validation-provider v-slot="{ errors }" :name="name" :rules="rules">
    <p
      v-if="label"
      class="mb-0 mt-5 v-label"
      :class="{ 'error--text': errors.length > 0 }"
    >
      {{ label }}
    </p>
    <quill-editor
      v-model="innerValue"
      :class="{
        'quill--error': errors.length > 0,
        'quill--dark': $vuetify.theme.dark && !errors.length,
        'quill--light': !$vuetify.theme.dark && !errors.length
      }"
    />
    <p v-if="errors.length > 0" class="error--text mt-2 mb-0 v-messages">
      {{ errors[0] }}
    </p>
  </validation-provider>
</template>

<script>
export default {
  name: 'QuillTextEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: [String, Object],
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      innerValue: ''
    };
  },
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

<style scoped></style>
