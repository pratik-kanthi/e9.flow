const _isValidSearchProp = value => {
    if (typeof value == 'object' || typeof value == 'number') {
        return false;
    }
    if (typeof value == 'string' && value.length > 100) {
        return false;
    }

    return true;
};

export const createEntityString = entity => {
    let _fullTextString = '';
    for (const prop in entity) {
        if (Object.prototype.hasOwnProperty.call(entity, prop)) {
            if (Array.isArray(entity[prop])) {
                entity[prop].map(arrItem => {
                    if (typeof arrItem === 'object') {
                        for (const subProp in arrItem) {
                            if (_isValidSearchProp(subProp, arrItem[subProp])) _fullTextString += arrItem[subProp];
                        }
                    } else {
                        if (_isValidSearchProp(null, arrItem)) _fullTextString += arrItem;
                    }
                });
            } else if (typeof entity[prop] === 'object') {
                for (const subProp in entity[prop]) {
                    if (_isValidSearchProp(subProp, entity[prop][subProp])) _fullTextString += entity[prop][subProp];
                }
            } else {
                if (_isValidSearchProp(prop, entity[prop])) _fullTextString += entity[prop];
            }
        }
    }
    return _fullTextString.toLowerCase();
};
