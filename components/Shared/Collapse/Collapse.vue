<script setup lang="ts">

const props = defineProps({
  labelSvg: {
    type: String, //label-setting, label-edit
    default: ''
  }
});

const collapseRef = <Ref>ref(null);

const collapse = async () => {
  const btnHeight = collapseRef.value.querySelector('.btn-collapse').clientHeight;
  const contentHeight = collapseRef.value.querySelector('.content-collapse').clientHeight;

  if (!collapseRef.value.classList.contains('hide-collapse')) {
    collapseRef.value.style.overflow = 'hidden';
    collapseRef.value.style.height = ((btnHeight + contentHeight) + 'px');
    collapseRef.value.classList.add('hide-collapse');
    collapseRef.value.style.height = (btnHeight + 'px');
    return;
  }

  if (collapseRef.value.classList.contains('hide-collapse')) {
    collapseRef.value.classList.remove('hide-collapse');

    collapseRef.value.style.height = ((btnHeight + contentHeight) + 'px');
    await setTimeout(() => {
      collapseRef.value.style.height = 'auto';
      collapseRef.value.style.overflow = 'inherit';
    }, 400);
    return;
  }
}
</script>

<template>
  <div class="collapse " :ref="(el: any) => collapseRef = el">
    <div class="btn-collapse hover" @click="collapse">
      <div class="btn-collapse__name" :class="props.labelSvg">
        <div>
          <slot name="Title"></slot>
        </div>
      </div>
    </div>

    <div class="">
      <slot name="content"></slot>
    </div>

  </div>
</template>