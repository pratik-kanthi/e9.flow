<script setup>
import {onMounted, ref, watch, inject, computed} from 'vue';
import {Dialog, DialogPanel} from '@headlessui/vue';
import {useFlowKeys} from '@/components/Flow/composables/useFlowKeys.js';
import {injectionKey} from '../../keys/injectionKey.js';

const {actions} = inject(injectionKey);
const {bindConsoleKeys, currConsoleIndex, consoleActionsLength, currAction, currEntity} = useFlowKeys();

const open = ref(true);
const emit = defineEmits(['close']);
const actionSearchTerm = ref(null);

const props = defineProps({
    entity: {
        type: Object,
        default() {
            return null;
        }
    }
});

onMounted(() => {
    consoleActionsLength.value = actions.value.length;
    currEntity.value = props.entity;
    bindConsoleKeys();
});

const closeConsole = () => {
    open.value = false;
    emit('close');
};

const filteredActions = computed(() => {
    if (!actionSearchTerm.value) return actions.value;
    return actions.value.filter(a => a.name.toLowerCase().includes(actionSearchTerm.value.toLowerCase()));
});

currAction.value = filteredActions.value[0];

watch(
    () => currConsoleIndex.value,
    value => {
        currAction.value = actions.value[value];
    }
);

watch(
    () => filteredActions.value,
    value => {
        consoleActionsLength.value = value.length;
    }
);
</script>

<template>
    <Dialog as='div' class='relative z-10' :open='open' @close='closeConsole'>
        <div class='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        <div class='fixed z-10 inset-0 overflow-y-auto'>
            <div class='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
                <DialogPanel
                    class='w-1/3 relative bg-white-soft rounded text-left overflow-hidden shadow-xl transform transition-all'>
                    <div class='main p-4'>
                        <input v-model='actionSearchTerm' type='text' placeholder='Search anything...'
                               class='w-full h-12 text-lg my-4 px-2 focus:outline-0 border border-primary rounded' />
                        <div>
                            <span class='text-gray-600 font-semibold'>Available actions</span>
                        </div>

                        <ul id='action-list' class='h-96 overflow-y-scroll'>
                            <li
                                v-for='(action, i) in filteredActions'
                                :key='i'
                                :class="currConsoleIndex === i ? 'text-white bg-primary' : 'text-primary'"
                                class='bg-white py-2 px-4 shadow my-1 rounded h-12 flex items-center'
                            >
                                <span class='material-icons text-gray-300'>play_circle_filled</span>
                                <span class='ml-4 text-md'>{{ action.name }}</span>
                            </li>
                        </ul>
                    </div>

                    <div id='console-footer' class='bg-white border-t px-4 py-2 text-gray-600 flex justify-between'>
                        <span class='flex justify-between items-center'>
                            <span class='material-icons text-sm'>north</span>
                            <span class='material-icons text-sm'>south</span>
                            <span>Navigate</span>
                        </span>

                        <span class='flex justify-between items-center'>
                            <span class='material-icons text-sm'>keyboard_return</span>
                            <span>Select</span>
                        </span>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</template>
