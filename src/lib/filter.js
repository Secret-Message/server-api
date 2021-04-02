module.exports.Filter = class Filter {

    constructor(parser, layer0, layer1, variables) {
        this.parser = parser;
        this.layer0 = layer0;
        this.layer1 = layer1;
        this.variables = variables;
        this.tempVariables = { ...this.variables };
    }

    parse(filter) {
        if (filter == '' || filter == undefined) return (array) => { return array.reverse(); };
        var filters = filter.toString().split(';');

        var stringF = `return (`;
        var layer0Active = [];
        for (let fil of filters) {
            const parsed = fil.toString().split('=');
            const filterName = parsed[0];
            const filterData = parsed[1];

            if (filterName in this.layer1) {
                stringF += `(${this.layer1[filterName].toString()})(_parsed, ${filterData}, _variables, _stop)&&`;
            }
            if (filterName in this.layer0) {
                layer0Active.push([this.layer0[filterName], filterData]);
            }
        }
        stringF += "true);";

        this.tempVariables = { ...this.variables };

        return (array) => {
            for (let fil of layer0Active) {
                array = fil[0](array, fil[1]);
            }
            const _f = new Function("_parsed", "_variables", "_stop", stringF);
            const mapped = array.map((e) => this.parser(e));
            const result = [];
            var _loop = true;
            for (let i = mapped.length - 1; i > 0; i--) {
                if (_f(mapped[i], this.tempVariables, () => { _loop = false; })) {
                    result.push(array[i]);
                }
                if (!_loop) {
                    break;
                }
            }
            return result;
        }

        // return (data, stop, sortType) => {
        //     const _parsed = this.parser(data);
        //     const _f = new Function("_parsed", "_variables", "_stop", "_sort", stringF);
        //     const result = _f(_parsed, this.tempVariables, stop, sortType);
        //     return result;
        // }
    }
}