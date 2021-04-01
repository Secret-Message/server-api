module.exports.Filter = class Filter {

    constructor(parser, options) {
        this.parser = parser;
        this.options = options;
    }

    parse(filter) {
        if (filter == '' || filter == undefined) return (data) => { return true; };
        var filters = filter.split(';');

        var stringF = `return (`;
        for (let fil of filters) {
            const parsed = fil.split('=');
            const filterName = parsed[0];
            const filterData = parsed[1];

            if (filterName in this.options) {
                stringF += `(${this.options[filterName].toString()})(_parsed, ${filterData})&&`;
            }
        }
        stringF += "true);";
        return (data) => {
            const _parsed = this.parse(data);
            const _f = new Function("_parsed", stringF);
            return _f(_parsed);
        }
    }
}