<script setup>
defineProps({
    entity: {
        type: Object,
        default() {
            return {};
        },
    },
    sidebarMode: {
        type: String,
        default() {
            return 'default';
        },
    },
});
</script>

<template>
    <div class="h-full bg-white border-l">
        <div v-if="sidebarMode === 'default'">
            <slot name="default-slot"></slot>
        </div>
        <div v-else>
            <slot name="content-slot" :entity="entity"></slot>
        </div>
    </div>
</template>
