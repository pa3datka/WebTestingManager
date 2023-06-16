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
import ExportSvg from "~/components/Svg/parts/ExportSvg.vue";
import Password from "~/components/Svg/parts/PasswordSvg.vue"
import CheckSvg from "~/components/Svg/parts/CheckSvg.vue";

//categories
import MathematicsSvg from "~/components/Svg/parts/Categories/MathematicsSvg.vue";
import GeographySvg from "~/components/Svg/parts/Categories/GeographySvg.vue";
import HistorySvg from "~/components/Svg/parts/Categories/HistorySvg.vue";
import LanguageSvg from "~/components/Svg/parts/Categories/LanguageSvg.vue";
import AstronomySvg from "~/components/Svg/parts/Categories/AstronomySvg.vue";
import MyTestsSvg from "~/components/Svg/parts/MyTestsSvg.vue";
import SearchFieldSvg from "~/components/Svg/parts/SearchFieldSvg.vue";
import FilterSvg from "~/components/Svg/parts/FilterSvg.vue";
import MenuOptionsSvg from "~/components/Svg/parts/MenuOptionsSvg.vue";
import VectorSvg from "~/components/Svg/parts/VectorSvg.vue";

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
});

interface ISvgObject {
  [key: string]: any;
};

const svg = <ISvgObject>{
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
  'export': ExportSvg,
  'password': Password,
  'check': CheckSvg,
  'my-tests': MyTestsSvg,
  'search-field': SearchFieldSvg,
  'filter': FilterSvg,
  'menu-options': MenuOptionsSvg,
  'vector': VectorSvg,

  // categories
  'mathematics': MathematicsSvg,
  'history': HistorySvg,
  'geography': GeographySvg,
  'language': LanguageSvg,
  'astronomy': AstronomySvg,
}
</script>

<template>
  <component :is="svg[props.name]"/>
</template>