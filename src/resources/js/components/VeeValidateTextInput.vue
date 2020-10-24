<template>
  <validation-provider v-slot="{ errors }" :name="name" :rules="rules">
    <v-text-field
      :value="value"
      :type="type"
      :label="label"
      :required="required"
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'VeeValidateInput',
  props: {
    rules: {
      type: [String, Object],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
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
