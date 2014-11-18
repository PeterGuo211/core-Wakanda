exports.sortBy = function(array, property) {
    return array.sort(function(a, b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    })
};

exports.contains = function(array, property, value) {
    var found = false;
    for (x in array) {
        if (array[x][property] == value) found = true;
    }
    return found;
};