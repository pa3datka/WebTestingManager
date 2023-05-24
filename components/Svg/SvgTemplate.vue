<script setup lang="ts">
import MessageSvg from '@/components/Svg/parts/MessageSvg.vue';
import NotificationSvg from '@/components/Svg/parts/NotificationSvg.vue';
import SettingSvg from '@/components/Svg/parts/SettingSvg.vue';
import HomeSvg from '@/components/Svg/parts/HomeSvg.vue';
import SignOutSvg from '@/components/Svg/parts/SignOutSvg.vue';
import ArrowBackSvg from '@/components/Svg/parts/ArrowBackSvg.vue';
import AddTestSvg from '@/components/Svg/parts/AddTestSvg.vue';
import CollapseSvg from '@/components/Svg/parts/CollapseSvg.vue';
import CloseSquare from "~/components/Svg/parts/CloseSquare.vue";
import SelectListSvg from "~/components/Svg/parts/SelectListSvg.vue";
import DeleteSvg from "~/components/Svg/parts/DeleteSvg.vue";

const props = defineProps({
    name: {
        type: String,
        default: ''
    }
});
interface ISvgObject {
    [key: string]: any;
};

const svg = <ISvgObject> {
    'message': MessageSvg,
    'notification': NotificationSvg,
    'settings': SettingSvg,
    'home': HomeSvg,
    'sign-out': SignOutSvg,
    'arrow-back': ArrowBackSvg,
    'add-test': AddTestSvg,
    'collapse': CollapseSvg,
    'close': CloseSquare,
    'select_list': SelectListSvg,
    'delete': DeleteSvg,
}
</script>

<template>
    <component :is="svg[props.name]" />
</template>