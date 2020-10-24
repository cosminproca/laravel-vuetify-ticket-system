<template>
  <validation-observer
    v-slot="{ handleSubmit, validated, invalid }"
    ref="login"
    slim
  >
    <slot v-bind="{ handleSubmit, validated, invalid }" />
  </validation-observer>
</template>

<script>
export default {
  name: 'VeeValidateForm',
  props: {
    errors: {
      type: [Object, Array],
      default: null
    }
  },
  watch: {
    errors(errors) {
      this.$refs.login.setErrors(errors);
    }
  }
};
</script>

<style scoped></style>
