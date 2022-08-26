import {ref} from 'vue';

export const useFlowSort = () => {
    const sortedColumn = ref();
    const sorted = ref(null);
    const sort = (header, items) => {
        const sortedItems = _sortColumn(items, header, false);
        if (sortedItems) {
            sorted.value = sortedItems;
        } else {
            sorted.value = items;
        }
    };
    const _sortColumn = (items, header, keepSameOrder = false) => {
        // determine increasing or decreasing sort
        let sortMultiplier = 1;
        let sortedItems;

        if (keepSameOrder && sortedColumn.value) {
            sortMultiplier = sortedColumn.value.type;
        } else {
            if (sortedColumn.value && sortedColumn.value.label === header.label && sortedColumn.value.type === 1) {
                sortMultiplier = -1;
            }
        }
        let compareFunction;
        if (header.compareFunction) {
            compareFunction = header.compareFunction;
        } else if (header.type && (header.type === 'String' || header.type === 'Date')) {
            compareFunction = (a, b) => (a > b ? 1 : a < b ? -1 : 0);
        } else if (header.type && header.type === 'Number') {
            compareFunction = (a, b) => a - b;
        }

        if (compareFunction) {
            sortedItems = [...items].sort((entity1, entity2) => sortMultiplier * compareFunction(entity1[header.key], entity2[header.key]));
            sortedColumn.value = {
                key: header.key,
                label: header.label,
                type: sortMultiplier
            };
        }
        return sortedItems;
    };

    return {
        sortedColumn,
        sort,
        sorted
    };
};
