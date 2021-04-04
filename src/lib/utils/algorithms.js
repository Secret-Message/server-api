// ! DO NOT WORK (INFINITE LOOP / WRONG ANSWER)
function lower_bound(array, f) {
    var start = 0;
    var end = array.length - 1;
    while (start < end) {
        const center = Math.floor((start + end) / 2);
        if (f(array[center])) {
            end = center;
        } else {
            start = center + 1;
        }
    }
    return end
}

// ! DO NOT WORK (WRONG ANSWER)
function upper_bound(array, f) {
    var start = 0;
    var end = array.length - 1;
    while (start < end) {
        const center = Math.ceil((start + end) / 2);
        if (f(array[center])) {
            start = center;
        } else {
            end = center - 1;
        }
    }
    return end;
}

module.exports = { lower_bound, upper_bound };