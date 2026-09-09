<template>
  <label class="group relative">
    <div
      class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border"
    >
      <img :src="icon" @click="handleIconClick" class="flex size-6 shrink-0" alt="icon" />
    </div>
    <p
      class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300"
    >
      {{ label }}
    </p>
    <input
      :type="type"
      class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300"
      placeholder=""
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      :disabled="disabled"
    />
  </label>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    maxLength: {
      type: [String, Number],
      default: null,
    },
    max: {
      type: [String, Number],
      default: null,
    },
    min: {
      type: [String, Number],
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    handleIconClick: {
      type: Function,
      default: () => {},
    },
  },
  emits: ['update:modelValue'],
}
</script>
