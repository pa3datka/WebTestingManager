<script setup lang="ts">

definePageMeta({
    name: "add-test",
    layout: 'dashboard',
    middleware: ['is-auth']
});
import PreviewLoadImg from "~/components/Shared/Input/PreviewLoadImg.vue";

const data = reactive({
    img: ''
});
</script>

<template>
<div class="container">
    <PreviewLoadImg v-model="data.img"/>
</div>
</template>

<style scoped>

</style>