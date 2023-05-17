<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    load: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <button type="button">{{ props.text }}</button>
</template>