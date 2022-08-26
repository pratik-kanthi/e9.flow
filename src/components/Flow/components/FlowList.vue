<script setup>
import { createEntityString } from '../helpers';
import { inject, watch, ref, onMounted } from 'vue';
import { injectionKey } from '../keys/injectionKey.js';
import { RecycleScroller } from 'vue-virtual-scroller';
import { useFlowKeys } from '../composables/useFlowKeys.js';
import { useFlowSort } from '../composables/useFlowSort.js';
import RuntimeTemplate from './RuntimeTemplate.vue';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const flowListItems = ref([]);

const { config, items, headers } = inject(injectionKey);
const { currIndex, hardSelect } = useFlowKeys();
const { sortedColumn, sort, sorted } = useFlowSort();

const props = defineProps({
    searchString: {
        type: String,
        default() {
            return '';
        },
    },
});

const emit = defineEmits(['entityChanged', 'hardSelect']);
const selectEntityRow = i => {
    currIndex.value = i;
    emit('entityChanged', flowListItems.value[i]);
};
const scroller = ref();
onMounted(() => {
    flowListItems.value = items.value.map(val => {
        val._searchableString = createEntityString(val);
        return val;
    });
});

watch(
    () => props.searchString,
    value => {
        flowListItems.value = items.value.filter(item => {
            return item._searchableString.includes(value);
        });
        currIndex.value = 0;
        scroller.value.scrollToPosition(0);
    }
);
watch(
    () => items.value,
    value => {
        flowListItems.value = value;
    }
);
watch(
    () => currIndex.value,
    value => {
        emit('entityChanged', flowListItems.value[value]);
    }
);
watch(
    () => hardSelect.value,
    value => {
        emit('hardSelect', value);
    }
);
watch(
    () => sorted.value,
    value => {
        flowListItems.value = value;
    }
);
</script>

<template>
    <div class="flex flex-col min-h-0">
        <div class="flex text-base border-b py-1 px-4 font-semibold bg-background border-b">
            <div v-for="(h, key) in headers" :key="key" class="basis-0" :style="{ 'flex-grow': h.size || 1 }">
                <header class="py-2 text-left text-sm font-semibold text-gray-900 flex justify-between items-center mx-2">
                    <span class="flex items-center">
                        <span>{{ h.label }}</span>
                        <span v-if="h.sortable" class="material-icons text-sm ml-2 cursor-pointer" @click="sort(h, flowListItems)">
                            {{ sortedColumn && sortedColumn.type === 1 ? 'south' : 'north' }}</span
                        >
                    </span>
                </header>
            </div>
        </div>

        <RecycleScroller ref="scroller" :buffer="200" class="overflow-x-scroll" :items="flowListItems" :item-size="config.itemSize" :key-field="config.keyField">
            <template #default="{ item, index }">
                <div
                    :style="{ height: config.itemSize + 'px' }"
                    class="flex items-center px-4"
                    :class="{ 'bg-white': index % 2 === 0, 'bg-primary text-white': currIndex === index, 'bg-background': index % 2 !== 0 && currIndex !== index }"
                >
                    <div v-for="(h, i) in headers" :key="i" class="basis-0 cursor-pointer" :style="{ 'flex-grow': h.size || 1 }" @click="selectEntityRow(index)">
                        <RuntimeTemplate v-if="h.template" :option="item" :template="h.template"></RuntimeTemplate>
                        <div v-else>{{ item[h.key] }}</div>
                    </div>
                </div>
            </template>
        </RecycleScroller>
    </div>
</template>
