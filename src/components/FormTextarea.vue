<template>
  <label
    class="flex py-4 px-6 rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300"
  >
    <div class="flex h-full pr-4 pt-2 border-r-[1.5px] border-monday-border">
      <img :src="icon" class="flex size-6 shrink-0" alt="icon" />
    </div>
    <div class="flex flex-col gap-[6px] pl-4 w-full">
      <p class="placeholder font-medium text-monday-gray text-sm">{{ label }}</p>
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
        :disabled="disabled"
        :rows="rows"
        :maxlength="maxlength"
        class="appearance-none outline-none w-full font-semibold text-lg leading-[160%]"
        placeholder=""
      ></textarea>
      <div v-if="showCounter && maxlength" class="text-sx text-gray-500 text-right">
        {{ modelValue ? modelValue.length : 0 }} / {{ maxlength }}
      </div>
    </div>
  </label>
</template>

<script>
export default {
  name: 'FormTextarea',
  props: {
    modelValue: {
      type: String,
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
    disabled: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: [Number, String],
      default: 5,
    },
    maxlength: {
      type: [Number, String],
      default: null,
    },
    showCounter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
}
</script>
