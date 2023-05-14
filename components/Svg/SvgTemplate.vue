<script setup lang="ts">
import MessageSvg from '@/components/Svg/parts/MessageSvg.vue';
import NotificationSvg from '@/components/Svg/parts/NotificationSvg.vue';
import SettingSvg from '@/components/Svg/parts/SettingSvg.vue';
import HomeSvg from '@/components/Svg/parts/HomeSvg.vue';
import SignOutSvg from '@/components/Svg/parts/SignOutSvg.vue';
import ArrowBackSvg from '@/components/Svg/parts/ArrowBackSvg.vue';
import AddTestSvg from '@/components/Svg/parts/AddTestSvg.vue';
import CollapseSvg from '@/components/Svg/parts/CollapseSvg.vue';

const props = defineProps({
    name: {
        type: String,
        default: ''
    }
});

const svg = {
    'message': MessageSvg,
    'notification': NotificationSvg,
    'settings': SettingSvg,
    'home': HomeSvg,
    'sign-out': SignOutSvg,
    'arrow-back': ArrowBackSvg,
    'add-test': AddTestSvg,
    'collapse': CollapseSvg
}
</script>

<template>
    <component :is="svg[props.name]" />
</template>