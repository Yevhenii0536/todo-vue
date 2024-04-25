<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  prepend: {
    type: [String, Object],
    default: '',
  },
  append: {
    type: [String, Object],
    default: '',
  },
});

const emit = defineEmits(['update:value', 'addTodo'])

const onInput = (event: Event) => {
  emit('update:value', (event.target as HTMLInputElement).value)
}

const onEnter = (event: KeyboardEvent) => {
  const value = (event.target as HTMLInputElement).value

  if (event.key === 'Enter' && value) {
    emit('addTodo', value)
  }
}
</script>

<template>
  <div class="custom-input">
    <span class="input-prepend">
      <slot name="prepend"></slot>
    </span>
    <input
      :value="props.value"
      :type="props.type"
      :name="props.name"
      class="input-field"
      :placeholder="props.placeholder"
      @input="onInput"
      @keydown.enter.prevent="onEnter"
    />
    <span class="input-append cursor-pointer">
      <slot name="append"></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.custom-input {
  position: relative;
  width: 100%;
}

.input-field {
  background: #F0F0F0;
  min-height: 50px;
  border-radius: 10px;
  //width: 350px;
  width: 100%;
  padding-left: 15px;
  padding-right: 30px;

  &:focus {
    background: white;
  }
}

.input-prepend, .input-append {
  position: absolute;
  font-size: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.input-prepend {
  left: 10px;
}

.input-append {
  display: flex;
  align-items: center;
  right: 10px;
}
</style>
