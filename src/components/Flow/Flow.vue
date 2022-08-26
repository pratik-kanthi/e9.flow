<script setup>
import { provide, toRefs } from 'vue';
import { injectionKey } from './keys/injectionKey.js';
import FlowWindow from './components/FlowWindow.vue';

const props = defineProps({
    name: {
        type: String,
        default() {
            return 'flow';
        },
    },
    items: {
        type: Array,
        default() {
            return [];
        },
    },
    config: {
        type: Object,
        default() {
            return {};
        },
    },
    headers: {
        type: Array,
        default() {
            return [];
        },
    },
    actions: {
        type: Array,
        default() {
            return [];
        },
    },
});

provide(injectionKey, toRefs(props));
</script>

<template>
    <FlowWindow>
        <template #content-slot="entity">
            <slot name="content-slot" :data="entity"></slot>
        </template>
        <template #default-slot>
            <slot name="default-slot"></slot>
        </template>
    </FlowWindow>
</template>
