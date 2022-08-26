<script setup>
import { inject, ref } from 'vue';
import { injectionKey } from '@/components/Flow/keys/injectionKey.js';
import { useFlowKeys } from '@/components/Flow/composables/useFlowKeys.js';

import FlowList from './FlowList.vue';
import FlowSidebar from './FlowSidebar.vue';
import FlowSearch from './FlowSearch.vue';
import FlowFooter from './FlowFooter.vue';
import Console from './Console/Console.vue';

//inject config from parent component
const { config } = inject(injectionKey);

// handle search
const searchTerm = ref(null);
const handleFlowSearch = val => {
    searchTerm.value = val;
};

// manage selections and sidebar mode
const sidebarMode = ref('default'); // ['default','entity']
const selectedEntity = ref(null);
const hardSelectEntity = ref(false);

const handleEntityChange = value => {
    selectedEntity.value = value;
};
const handleHardSelect = val => {
    hardSelectEntity.value = val;
    sidebarMode.value = val ? 'entity' : 'default';
};

//manage console
const { showConsole, bindBaseKeys } = useFlowKeys();
const hideConsole = () => {
    showConsole.value = false;
    bindBaseKeys();
};
</script>

<template>
    <Console v-if="showConsole" :entity="selectedEntity" @close="hideConsole"></Console>
    <div class="flex flex-1 min-h-0 bg-white">
        <div class='flex flex-col' :class="config.showSidebar ? 'w-full md:w-3/4' : 'w-full'">
            <FlowSearch @search-updated="handleFlowSearch"></FlowSearch>
            <FlowList :search-string="searchTerm" @entity-changed="handleEntityChange" @hard-select="handleHardSelect"></FlowList>
        </div>
        <FlowSidebar v-if="config.showSidebar" :entity="selectedEntity" :sidebar-mode="sidebarMode" class="w-1/4 hidden md:block z-40">
            <template #content-slot="entity">
                <slot name="content-slot" :entity="entity.entity"></slot>
            </template>
            <template #default-slot>
                <slot name="default-slot"></slot>
            </template>
        </FlowSidebar>
    </div>
    <FlowFooter></FlowFooter>
</template>
