<script setup lang="ts">
import {string} from "postcss-selector-parser";

const props = defineProps({
    isFooter: {
        type: Boolean,
        default: false
    },
    errors: {
        type: Array,
        default: []
    }
});
</script>

<template>
    <div class="auth-form" >
        <form class="mt-sm-20 mt-md-40 mt-lg-60" action="">
            <div class="form-title pt-sm-30 pt-md-40 pt-lg-50 pl-sm-30 pr-sm-30">
                <slot name="title"></slot>
            </div>

            <div
                class="errors pt-sm-20 pl-sm-30 pr-sm-30 pl-md-40 pr-md-40 pl-lg-50 pr-lg-50"
                v-if="props.errors?.length"
            >
                <ul>
                    <li
                        v-for="(error, key) in props.errors"
                        :key="key"
                    >{{error}}</li>
                </ul>
            </div>

            <div class="form-content mt-sm-20 mt-md-30 mb-sm-20 mb-md-30 pl-sm-30 pr-sm-30 pl-md-40 pr-md-40 pl-lg-50 pr-lg-50">
                <slot name="content"></slot>
            </div>

            <div class="form-action pb-sm-20 pb-md-30 pl-sm-30 pr-sm-30 pl-md-40 pr-md-40 pl-lg-50 pr-lg-50">
                <slot name="action"></slot>
            </div>

            <div class="form-footer d-flex align-items-center justify-content-center align-text-center w-100"
                 v-if="props.isFooter">
                <slot name="footer"></slot>
            </div>
        </form>
    </div>
</template>