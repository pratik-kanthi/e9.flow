import {onMounted, ref} from 'vue';
import keyboard from 'keyboardjs/index.js';
import {listKeys, windowKeys} from '../config/keyboardConfig.js';

export const useFlowKeys = () => {
    const currIndex = ref(1);
    const showConsole = ref(false);
    const hardSelect = ref(false);
    const showSearch = ref(false);

    //console
    const currConsoleIndex = ref(0);
    const currAction = ref(null);
    const consoleActionsLength = ref(0);
    const currEntity = ref(null);

    const {UP, DOWN, ENTER, ESC} = listKeys;
    const {CONSOLE, SEARCH} = windowKeys;

    const bindBaseKeys = () => {
        keyboard.setContext('base');
        keyboard.bind(UP, () => {
            if (currIndex.value === 0) return;
            currIndex.value--;
        });
        keyboard.bind(DOWN, () => {
            currIndex.value++;
        });
        keyboard.bind(ENTER, () => {
            hardSelect.value = true;
        });
        keyboard.bind(ESC, () => {
            hardSelect.value = false;
        });
        keyboard.bind(SEARCH, () => {
            showSearch.value = !showSearch.value;
        });
        keyboard.bind(CONSOLE, () => {
            showConsole.value = true;
        });
    };

    const bindConsoleKeys = () => {
        keyboard.setContext('console');
        keyboard.bind(UP, () => {
            if (currConsoleIndex.value === 0) return;
            currConsoleIndex.value--;
        });
        keyboard.bind(DOWN, () => {
            if (currConsoleIndex.value === consoleActionsLength.value - 1) return;
            currConsoleIndex.value++;
        });
        keyboard.bind(ENTER, () => {
            currAction.value.action(currEntity.value);
        });
    };

    onMounted(() => {
        bindBaseKeys();
    });

    return {
        currIndex,
        showConsole,
        hardSelect,
        showSearch,
        consoleActionsLength,
        currConsoleIndex,
        currAction,
        currEntity,
        bindConsoleKeys,
        bindBaseKeys
    };
};
