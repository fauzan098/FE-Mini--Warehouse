<template>
  <label
    class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden"
  >
    <div
      class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border"
    >
      <img :src="icon" class="flex size-6 shrink-0" alt="icon" />
    </div>
    <p
      class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300"
    >
      {{ label }}
    </p>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :disabled="disabled"
      class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
    >
      <option value="" disabled>{{ placeholderText || `Select ${label}` }}</option>
      <slot></slot>
    </select>
    <img
      src="@/assets/images/icons/arrow-down-grey.svg"
      class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6"
      alt="icon"
    />
  </label>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
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
    required: {
      type: Boolean,
      default: false,
    },
    placeholderText: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
}
</script>
