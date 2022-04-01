export function params(obj) {
    return Object.keys(obj).reduce(function(acc, key) {
        if(obj[key]!== null) {
            acc = `${acc}&${key}=${obj[key]}`;
        }
        return acc;
    }, '');
}

export default {
    params,
};

