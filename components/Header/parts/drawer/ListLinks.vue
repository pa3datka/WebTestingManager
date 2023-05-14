<script setup lang="ts">
import { hideOnClickMenu } from "~/composables/shared/HideOnClickMenu";
const hide = hideOnClickMenu();
const links = [
    { link: '/about', name: 'About us' },
    { link: '/tests', name: 'Tests' },
    { link: '/faq', name: 'FAQ' },
    { link: '/contact', name: 'Contact us' },
];
</script>

<template>
<div class="list-links">
    <ul>
        <li
            class="list-link-item"
            v-for="(link, key) in links"
            :key="key"
            @click="hide.hideDrawerForcibly()"
        >
            <nuxt-link class="link" :to="link.link">{{ link.name }}</nuxt-link>
        </li>
    </ul>
</div>
</template>