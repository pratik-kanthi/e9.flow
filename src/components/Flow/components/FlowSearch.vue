<script setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { TransitionRoot } from '@headlessui/vue';
import { useFlowKeys } from '../composables/useFlowKeys.js';

const { showSearch } = useFlowKeys();
const searchVal = ref(null);
const searchRef = ref();
const emit = defineEmits(['searchUpdated']);

const focusSearch = () => {
    searchRef.value.focus();
};
const clearSearch = () => {
    searchVal.value = '';
    emit('searchUpdated', searchVal.value);
};
const handleSearchChange = useDebounceFn(() => {
    emit('searchUpdated', searchVal.value);
}, 200);
</script>

<template>
    <div class="w-full my-2 justify-end flex">
        <TransitionRoot
            :show="showSearch"
            enter="transition-opacity duration-75"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-150"
            leave-from="opacity-100"
            leave-to="opacity-0"
            @after-enter="focusSearch"
            @after-leave="clearSearch"
        >
            <input
                v-if="showSearch"
                ref="searchRef"
                v-model="searchVal"
                class="form-control border border-primary py-0.5 px-2 rounded"
                type="text"
                placeholder="Search here..."
                @keyup="handleSearchChange"
            />
        </TransitionRoot>

        <div class="bg-primary mx-2 rounded w-8 text-center cursor-pointer">
            <i class="text-xl material-icons text-white">search</i>
        </div>
    </div>
</template>
