module.exports.Filter = class Filter {

    constructor(parser, layer0, layer1, variables) {
        this.parser = parser; // msg id => message obj
        this.layer0 = layer0; // array, data => array'
        this.layer1 = layer1; // obj, data => bool
        this.variables = variables; // variables for all filters
        this.tempVariables = { ...this.variables }; // temporary copy of this.variables object
    }

    parse(filter) {
        // if filter is nothing then return normal array (from newest to oldest)
        if (filter == '' || filter == undefined) return (array) => { return array.reverse(); };
        // split filters string into saprate parts (from=148702730;to=48219048 => [from=148702730, to=48219048])
        var filters = filter.toString().split(';');

        var stringF = `return (`;
        var layer0Active = [];
        for (let fil of filters) {
            const parsed = fil.toString().split('=');
            const filterName = parsed[0];
            const filterData = parsed[1];

            // parse layer1 functions into one function
            if (filterName in this.layer1) {
                stringF += `(${this.layer1[filterName].toString()})(_parsed, ${filterData}, _variables, _stop)&&`;
            }
            // add active filters from layer0 into new array
            if (filterName in this.layer0) {
                layer0Active.push([this.layer0[filterName], filterData]);
            }
        }
        stringF += "true);";

        this.tempVariables = { ...this.variables };

        return (array) => {
            // execute all layer0 active filters
            for (let fil of layer0Active) {
                array = fil[0](array, fil[1]);
            }
            // create function from previously created string
            const _f = new Function("_parsed", "_variables", "_stop", stringF);
            // let every element from array through parser
            const mapped = array.map((e) => this.parser(e));
            const result = [];
            var _loop = true;
            // for every element from array go through layer1 filter function
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