<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {IPaginate} from "~/composables/Interfaces/IPaginate";
import ButtonMin from "~/components/Shared/Button/ButtonMin.vue";
import {useRoute, useRouter} from "nuxt/app";

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['showPage']);
const props = defineProps({
  paginate: {
    type: Object as PropType<IPaginate|null>,
  }
});

const data = reactive({
  countPages: 3
});

onMounted(() => {
  const width = window.innerWidth;
  992 > width && (data.countPages = 2);
});

const pages = computed(() => {
  if (props.paginate?.current_page && props.paginate?.last_page) {
    const current = props.paginate.current_page;
    const last = props.paginate.last_page;
    let pages = {
      current: current,
      last: last,
      next: current !== last ? (current + 1) : null,
      prev: current > 1 ? (current - 1) : null,
      pages: <number[]> []
    };
    current > 4 &&  pages.pages.push(1);
    for (let i = 1; i <= last; i++) {
      if (i >= (current - data.countPages) && i <= (current + data.countPages) && i <= last) {
        pages.pages.push(i)
      }

      if (i > current + data.countPages && i === last) {
        pages.pages.push(last);
      }
    }


    return pages;
  }
  return null;
});

const showPage = (numberPage: number): void => {
  if (props.paginate?.current_page && props.paginate?.current_page !== numberPage) {
    router.push({name: route.name, query: {page: numberPage}})
  }
}

</script>

<template>
<div class="paginate d-flex" v-if="pages">
  <ButtonMin
      :disabled="pages.current === 1"
      :class="{'disable-btn': pages.current === 1}"
      text="<"
      @click="showPage((pages.current - 1))"
  />

  <ButtonMin
      v-for="page in pages.pages"
      :text="String(page)"
      class="hover button-active-info"
      :class="{'active-page': pages.current === page}"
      @click="showPage(page)"
  />

  <ButtonMin
      :disabled="pages.current === pages.last"
      :class="{'disable-btn': pages.current === pages.last}"
      text=">"
      @click="showPage((pages.current + 1))"/>
</div>
</template>

<style scoped lang="scss">
.paginate {
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  .active-page {
    background-color: #2C64DC;
    color: #FFFFFF;
  }

  .disable-btn {
    opacity: .5;
  }
}

@media (min-width: 992px) {
  .paginate {
    column-gap: 12px;
  }
}
</style>