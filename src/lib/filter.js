module.exports.Filter = class Filter {

    constructor(parser, options, variables) {
        this.parser = parser;
        this.options = options;
        this.variables = variables;
    }

    parse(filter) {
        if (filter == '' || filter == undefined) return (data) => { return true; };
        var filters = filter.toString().split(';');

        var stringF = `return (`;
        for (let fil of filters) {
            const parsed = fil.toString().split('=');
            const filterName = parsed[0];
            const filterData = parsed[1];

            if (filterName in this.options) {
                stringF += `(${this.options[filterName].toString()})(_parsed, ${filterData}, _variables)&&`;
            }
        }
        stringF += "true);";
        return (data) => {
            const _parsed = this.parser(data);
            const _f = new Function("_parsed", "_variables", stringF);
            return _f(_parsed, this.variables);
        }
    }
}