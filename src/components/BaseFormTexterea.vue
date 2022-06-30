<template>
<BaseFormField :title="title" :error="error">
  <textarea class="form__input form__input--area" v-model="dataValue" :title="title" :error="error" :placeholder="placeholder" :type="type"></textarea>
</BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  props: {
    type: {
      default: 'text'
    }
  },
  mixins: [formFieldMixin]
}
</script>
